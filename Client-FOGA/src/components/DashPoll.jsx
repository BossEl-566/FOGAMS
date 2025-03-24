import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2'; // Import Chart.js components

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function DashPoll() {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [candidates, setCandidates] = useState(['']);
  const [expiresAt, setExpiresAt] = useState('');
  const [polls, setPolls] = useState([]); // Store all polls for voting
  const [selectedCandidates, setSelectedCandidates] = useState({}); // Track selected candidate for each poll
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedPollId, setSelectedPollId] = useState(''); // Poll ID for the modal
  const [selectedCandidateName, setSelectedCandidateName] = useState(''); // Candidate name for the modal
  const [visualData, setVisualData] = useState([]); // Data for visualization

  // Fetch all polls for voting
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('/api/poll/get'); // Endpoint for user-facing polls
        if (!response.ok) throw new Error('Failed to fetch polls');
        const data = await response.json();
        setPolls(data); // Set all polls
      } catch (err) {
        toast.error(`Error fetching polls: ${err.message}`);
      }
    };
    fetchPolls();
  }, []);

  // Fetch visual data for admins
  useEffect(() => {
    if (!currentUser.isAdmin) return; // Only fetch visual data for admins
    const fetchVisualData = async () => {
      try {
        const response = await fetch('/api/poll/getpolls'); // Endpoint for visualization data
        if (!response.ok) throw new Error('Failed to fetch visual data');
        const data = await response.json();
        setVisualData(data); // Set visual data
      } catch (err) {
        toast.error(`Error fetching visual data: ${err.message}`);
      }
    };
    fetchVisualData();
  }, [currentUser.isAdmin]);

  // Handle adding a new candidate input
  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };

  // Handle candidate input change
  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  // Handle form submission for creating a new poll
  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/poll/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, candidates, expiresAt }),
      });
      if (response.ok) {
        toast.success('Poll created successfully!');
        setTitle('');
        setCandidates(['']);
        setExpiresAt('');
      } else {
        throw new Error('Failed to create poll');
      }
    } catch (err) {
      toast.error(`Error creating poll: ${err.message}`);
    }
  };

  // Open the confirmation modal
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

  // Handle user voting after confirmation
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
        setIsModalOpen(false); // Close the modal
      } else {
        throw new Error('You have already voted in this poll.');
      }
    } catch (err) {
      setIsModalOpen(false);
      toast.error(`Error casting vote: ${err.message}`);
    }
  };

  // Handle selecting a candidate for a specific poll
  const handleSelectCandidate = (pollId, candidateId) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [pollId]: candidateId,
    }));
  };

  // Generate dynamic colors for the charts
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
    }
    return colors;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 w-full">
      {/* Admin Panel */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create New Poll</h2>
        <form onSubmit={handleCreatePoll}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Poll Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          {candidates.map((candidate, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`candidate-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Candidate {index + 1}
              </label>
              <input
                type="text"
                id={`candidate-${index}`}
                value={candidate}
                onChange={(e) => handleCandidateChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCandidate}
            className="w-full mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white rounded-md hover:bg-blue-200 dark:hover:bg-blue-600"
          >
            Add Candidate
          </button>
          <div className="mb-4">
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiration Date
            </label>
            <input
              type="datetime-local"
              id="expiresAt"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Poll
          </button>
        </form>
      </div>

      {/* Display All Polls for Voting */}
      <div className="space-y-6">
        {polls.map((poll) => {
          const totalVotes = poll.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

          return (
            <div key={poll._id} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{poll.title}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Candidates</label>
                <div className="mt-2 space-y-2">
                  {poll.candidates.map((candidate) => (
                    <div key={candidate._id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={candidate._id}
                          name={`candidate-${poll._id}`}
                          value={candidate._id}
                          onChange={() => handleSelectCandidate(poll._id, candidate._id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
                        />
                        <label htmlFor={candidate._id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {candidate.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => openConfirmationModal(poll._id, selectedCandidates[poll._id])}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Vote
              </button>
            </div>
          );
        })}
      </div>

      {/* Display Visualizations for Admins */}
      {currentUser.isAdmin && (
        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Poll Results Visualization</h2>
          {visualData.map((poll) => {
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

            return (
              <div key={poll._id} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{poll.title}</h3>
                {/* Pie Chart */}
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Vote Distribution (Pie Chart)</h4>
                  <Pie data={chartData} />
                </div>
                {/* Bar Chart */}
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Vote Distribution (Bar Chart)</h4>
                  <Bar data={chartData} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Your Vote</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You are about to vote for <strong>{selectedCandidateName}</strong>. Are you sure?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}