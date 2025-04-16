import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function DashBroadcast() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [segments, setSegments] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/membership/get');
        const data = await res.json();
        const filtered = data.filter(user => user.member === true);
        setMembers(filtered);
        setFilteredMembers(filtered);
      } catch (err) {
        console.error('Error fetching members:', err);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const count = message.length;
    setCharacterCount(count);
    setSegments(Math.ceil(count / 160));
  }, [message]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMembers(members);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = members.filter(member => 
        member.fullname?.toLowerCase().includes(term) || 
        member.contact?.includes(term)
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, members]);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMembers.map(member => member._id));
    }
  };

  const sendInstantMessage = async () => {
    if (!message.trim()) return alert('Please enter a message');
    if (selectedIds.length === 0) return alert('Please select at least one recipient');

    const selectedMembers = members.filter(user => selectedIds.includes(user._id));
    const validRecipients = selectedMembers
      .filter(user => user.contact)
      .map(user => user.contact);

    if (validRecipients.length === 0) {
      return toast.error('No valid phone numbers found for selected members!');
    }

    setLoading(true);
    try {
      const res = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
        method: 'POST',
        headers: {
          'api-key': import.meta.env.VITE_ARKESEL_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'FOGA_PEDU',
          message,
          recipients: validRecipients
        }),
      });

      const result = await res.json();

      if (result.status !== 'success') {
        console.error(result);
        throw new Error('Broadcast failed');
      }

      toast.success(`📤 Message sent successfully to ${validRecipients.length} recipients!`);
      setMessage('');
      setSelectedIds([]);
    } catch (err) {
      console.error('Error sending broadcast:', err);
      toast.error('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scheduleMessage = async () => {
    if (!message.trim()) return alert('Please enter a message');
    if (!scheduleTime) return alert('Please select a schedule time');
    if (selectedIds.length === 0) return alert('Please select at least one recipient');

    const selectedMembers = members.filter(user => selectedIds.includes(user._id));
    
    try {
      setLoading(true);
      const res = await fetch('/api/broadcast/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: selectedMembers.map(member => ({
            memberId: member._id,
            contact: member.contact,
            fullname: member.fullname,
            message,
            scheduledTime: scheduleTime,
          })),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(`⏳ Successfully scheduled ${selectedMembers.length} messages!`);
        setMessage('');
        setScheduleTime('');
        setSelectedIds([]);
      } else {
        throw new Error(result.message || 'Failed to schedule messages');
      }
    } catch (err) {
      console.error('Error scheduling messages:', err);
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">Broadcast Messages</h1>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message Content
          </label>
          <textarea
            className="w-full p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            rows="6"
            placeholder="Type your message here (160 characters per SMS segment)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="320"
          />
          <div className="text-sm mt-2 text-gray-500 dark:text-gray-400">
            {characterCount}/160 characters • {segments} SMS segment{segments !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Schedule Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="flex items-end gap-4">
            <button
              onClick={scheduleMessage}
              disabled={loading || !scheduleTime || selectedIds.length === 0}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 flex-1 transition-colors"
            >
              {loading ? 'Processing...' : 'Schedule Message'}
            </button>
            <button
              onClick={sendInstantMessage}
              disabled={loading || selectedIds.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 flex-1 transition-colors"
            >
              {loading ? 'Sending...' : 'Send Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Select Recipients</h2>
          <div className="w-full sm:w-auto flex gap-4">
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="flex-1 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              {selectedIds.length === filteredMembers.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg">
          {filteredMembers.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              {members.length === 0 ? 'No members found' : 'No matching members found'}
            </div>
          ) : (
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
              {filteredMembers.map((user) => (
                <li key={user._id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user._id)}
                      onChange={() => toggleSelect(user._id)}
                      className="h-5 w-5 text-blue-500 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                    />
                    <div className="min-w-0">
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user.fullname}
                        {user.birthDay && user.birthMonth && (
                          <span className="ml-3 text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-300 rounded-full">
                            🎂 {user.birthDay}/{user.birthMonth}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.contact}</p>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing: {filteredMembers.length} of {members.length} members • Selected: {selectedIds.length}
        </div>
      </div>
    </div>
  );
}