import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FiPlus, FiTrash2, FiBarChart2, FiPieChart, FiCalendar, FiUsers, FiX, FiCheck, FiEdit } from 'react-icons/fi';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashPoll() {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [candidates, setCandidates] = useState(['']);
  const [expiresAt, setExpiresAt] = useState('');
  const [polls, setPolls] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPollId, setSelectedPollId] = useState('');
  const [selectedCandidateName, setSelectedCandidateName] = useState('');
  const [visualData, setVisualData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('polls');

  // Fetch all polls for voting
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('/api/poll/get');
        if (!response.ok) throw new Error('Failed to fetch polls');
        const data = await response.json();
        setPolls(data);
      } catch (err) {
        toast.error(`Error fetching polls: ${err.message}`);
      }
    };
    fetchPolls();
  }, []);

  // Fetch visual data for admins
  useEffect(() => {
    if (!currentUser.isAdmin) return;
    const fetchVisualData = async () => {
      try {
        const response = await fetch('/api/poll/getpolls');
        if (!response.ok) throw new Error('Failed to fetch visual data');
        const data = await response.json();
        setVisualData(data);
      } catch (err) {
        toast.error(`Error fetching visual data: ${err.message}`);
      }
    };
    fetchVisualData();
  }, [currentUser.isAdmin]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const handleRemoveCandidate = (index) => {
    if (candidates.length > 1) {
      const newCandidates = candidates.filter((_, i) => i !== index);
      setCandidates(newCandidates);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/poll/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          candidates: candidates.filter(c => c.trim() !== ''), 
          expiresAt 
        }),
      });
      if (response.ok) {
        toast.success('Poll created successfully!');
        setTitle('');
        setCandidates(['']);
        setExpiresAt('');
        const fetchResponse = await fetch('/api/poll/get');
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setPolls(data);
        }
        setActiveTab('polls');
      } else {
        throw new Error('Failed to create poll');
      }
    } catch (err) {
      toast.error(`Error creating poll: ${err.message}`);
    }
  };

  const openConfirmationModal = (pollId, candidateId) => {
    const poll = polls.find((p) => p._id === pollId);
    const candidate = poll?.candidates.find((c) => c._id === candidateId);
    if (candidate) {
      setSelectedPollId(pollId);
      setSelectedCandidateName(candidate.name);
      setIsModalOpen(true);
    } else {
      toast.error('Please select a valid candidate.');
    }
  };

  const openDeleteModal = (poll) => {
    setPollToDelete(poll);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePoll = async () => {
    if(!currentUser.isAdmin) return toast.error('You are not authorized to perform this action.');
    if (!pollToDelete) return;
    
    try {
      const response = await fetch(`/api/poll/delete/${pollToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Poll deleted successfully!');
        setPolls(polls.filter(p => p._id !== pollToDelete._id));
        setVisualData(visualData.filter(p => p._id !== pollToDelete._id));
      } else {
        throw new Error('Failed to delete poll');
      }
    } catch (err) {
      toast.error(`Error deleting poll: ${err.message}`);
    } finally {
      setIsDeleteModalOpen(false);
      setPollToDelete(null);
    }
  };

  const handleVote = async () => {
    const candidateId = selectedCandidates[selectedPollId];
    if (!candidateId) return toast.error('Please select a candidate.');

    try {
      const response = await fetch(`/api/poll/vote/${selectedPollId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          candidateId: candidateId,
          pollId: selectedPollId,
        }),
      });
      if (response.ok) {
        toast.success('Vote cast successfully!');
        setIsModalOpen(false);
        const fetchResponse = await fetch('/api/poll/get');
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setPolls(data);
        }
      } else {
        throw new Error('You have already voted in this poll.');
      }
    } catch (err) {
      setIsModalOpen(false);
      toast.error(`Error casting vote: ${err.message}`);
    }
  };

  const handleSelectCandidate = (pollId, candidateId) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [pollId]: candidateId,
    }));
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
    }
    return colors;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPollExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FiBarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Polls & Voting
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Participate in community decisions
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('polls')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === 'polls'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Active Polls
            </button>
            {currentUser.isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                    activeTab === 'create'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Create Poll
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                    activeTab === 'results'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Results
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Create Poll Tab */}
        {activeTab === 'create' && currentUser.isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FiPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Create New Poll
              </h2>
            </div>
            
            <form onSubmit={handleCreatePoll} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Poll Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter poll question..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Candidates
                </label>
                <div className="space-y-3">
                  {candidates.map((candidate, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={candidate}
                          onChange={(e) => handleCandidateChange(index, e.target.value)}
                          className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder={`Candidate ${index + 1}`}
                          required
                        />
                      </div>
                      {candidates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCandidate(index)}
                          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddCandidate}
                  className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <FiPlus className="w-4 h-4 mr-1" />
                  Add Candidate
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Expiration Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FiCheck className="w-4 h-4" />
                <span>Create Poll</span>
              </button>
            </form>
          </div>
        )}

        {/* Active Polls Tab */}
        {activeTab === 'polls' && (
          <div className="space-y-6">
            {polls.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
                <FiBarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                  No active polls
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Check back later for new polls
                </p>
              </div>
            ) : (
              polls.map((poll) => {
                const totalVotes = poll.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
                const isExpired = isPollExpired(poll.expiresAt);

                return (
                  <div key={poll._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Poll Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {poll.title}
                          </h2>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FiUsers className="w-4 h-4" />
                              <span>{totalVotes} votes</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiCalendar className="w-4 h-4" />
                              <span>Expires: {formatDate(poll.expiresAt)}</span>
                            </div>
                          </div>
                        </div>
                        {currentUser.isAdmin && (
                          <button
                            onClick={() => openDeleteModal(poll)}
                            className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {isExpired && (
                        <div className="mt-3 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm">
                          This poll has ended
                        </div>
                      )}
                    </div>

                    {/* Candidates */}
                    <div className="p-6 space-y-4">
                      {poll.candidates.map((candidate) => {
                        const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
                        const isSelected = selectedCandidates[poll._id] === candidate._id;

                        return (
                          <div key={candidate._id} className="flex items-center space-x-4">
                            <input
                              type="radio"
                              id={candidate._id}
                              name={`candidate-${poll._id}`}
                              value={candidate._id}
                              onChange={() => handleSelectCandidate(poll._id, candidate._id)}
                              checked={isSelected}
                              disabled={isExpired}
                              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
                            />
                            <label 
                              htmlFor={candidate._id} 
                              className="flex-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{candidate.name}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs">
                                  {candidate.votes} votes ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>

                    {/* Vote Button */}
                    {!isExpired && (
                      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => openConfirmationModal(poll._id, selectedCandidates[poll._id])}
                          disabled={!selectedCandidates[poll._id]}
                          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <FiCheck className="w-4 h-4" />
                          <span>Submit Vote</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && currentUser.isAdmin && (
          <div className="space-y-6">
            {visualData.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
                <FiPieChart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                  No poll results
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Create polls to see results here
                </p>
              </div>
            ) : (
              visualData.map((poll) => {
                const totalVotes = poll.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
                const colors = generateColors(poll.candidates.length);

                const chartData = {
                  labels: poll.candidates.map((candidate) => candidate.name),
                  datasets: [
                    {
                      data: poll.candidates.map((candidate) => candidate.votes),
                      backgroundColor: colors,
                      hoverBackgroundColor: colors.map((color) => `${color}CC`),
                    },
                  ],
                };

                const chartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        color: '#6B7280'
                      }
                    }
                  }
                };

                return (
                  <div key={poll._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {poll.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FiUsers className="w-4 h-4" />
                              <span>{totalVotes} total votes</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openDeleteModal(poll)}
                          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Pie Chart */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center space-x-2">
                          <FiPieChart className="w-4 h-4" />
                          <span>Vote Distribution</span>
                        </h4>
                        <div className="h-64">
                          <Pie data={chartData} options={chartOptions} />
                        </div>
                      </div>

                      {/* Bar Chart */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center space-x-2">
                          <FiBarChart2 className="w-4 h-4" />
                          <span>Vote Comparison</span>
                        </h4>
                        <div className="h-64">
                          <Bar data={chartData} options={chartOptions} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Vote Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Confirm Your Vote
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You are about to vote for <strong className="text-blue-600 dark:text-blue-400">{selectedCandidateName}</strong>
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <FiCheck className="w-4 h-4" />
                <span>Confirm Vote</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Delete Poll?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                This will permanently delete <strong>"{pollToDelete?.title}"</strong> and all its data. This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePoll}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}