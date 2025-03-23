import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function DashPoll() {
  const [title, setTitle] = useState('');
  const [candidates, setCandidates] = useState(['']);
  const [expiresAt, setExpiresAt] = useState('');
  const [activePoll, setActivePoll] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [userId, setUserId] = useState('');

  // Fetch active poll (for users)
  useEffect(() => {
    const fetchActivePoll = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/polls/active');
        const data = await response.json();
        setActivePoll(data);
      } catch (err) {
        toast.error('Error fetching active poll:', err);
      }
    };
    fetchActivePoll();
  }, []);

  // Handle adding a new candidate input
  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };
console.log(candidates)
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
        toast.error('Failed to create poll.');
      }
    } catch (err) {
      toast.error('Error creating poll:', err);
    }
  };

  // Handle user voting
  const handleVote = async () => {
    if (!selectedCandidate) return alert('Please select a candidate.');
    try {
      const response = await fetch('http://localhost:5000/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, candidateId: selectedCandidate, pollId: activePoll._id }),
      });
      if (response.ok) {
        toast.success('Vote cast successfully!');
      } else {
        alert('You have already voted in this poll.');
      }
    } catch (err) {
      toast.error('Error casting vote:', err);
    }
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

      {/* User Voting Panel */}
      {activePoll && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vote for {activePoll.title}</h2>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Candidates</label>
            <div className="mt-2 space-y-2">
              {activePoll.candidates.map((candidate) => (
                <div key={candidate._id} className="flex items-center">
                  <input
                    type="radio"
                    id={candidate._id}
                    name="candidate"
                    value={candidate._id}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
                  />
                  <label htmlFor={candidate._id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {candidate.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleVote}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Vote
          </button>
        </div>
      )}
    </div>
  );
}