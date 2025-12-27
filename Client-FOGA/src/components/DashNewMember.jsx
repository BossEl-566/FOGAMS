// app/dashboard/new-members/page.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  FaPlus, 
  FaDownload, 
  FaTrash, 
  FaEdit,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBriefcase,
  FaHeart,
  FaUsers
} from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import * as XLSX from 'xlsx';
import NewMemberModal from './NewMemberModal';
import DeleteModal from './DeleteModal';

const HEAR_ABOUT_US_OPTIONS = [
  'Social Media',
  'Signpost',
  'Friend/Family',
  'Church Member',
  'Website',
  'Event',
  'Advertisement',
  'Other'
];

const MARITAL_STATUS_OPTIONS = ['Single', 'Married', 'Divorced', 'Widowed'];

export default function NewMembersPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, memberId: null });
  const [editingMember, setEditingMember] = useState(null);

  // Generate last 12 months for filter
  const months = useMemo(() => {
    const monthsArray = [];
    const now = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const monthName = date.toLocaleString('default', { month: 'long' });
      
      monthsArray.push({
        value: `${year}-${month}`,
        label: `${monthName} ${year}`,
        count: 0
      });
    }
    
    return monthsArray;
  }, []);

  // Fetch members function
  const fetchMembers = async () => {
    try {
      setLoading(true);
      let url = '/api/new-members/all';
      const params = new URLSearchParams();
      
      if (selectedMonth) {
        const [year, month] = selectedMonth.split('-');
        params.append('year', year);
        params.append('month', month);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Fetching from URL:', url); // Debug log
      
      const response = await fetch(url, {
        credentials: 'include' // If using cookies/sessions
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`Failed to fetch members: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched members:', data); // Debug log
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast.error('Failed to load members');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch members on component mount and when selectedMonth changes
  useEffect(() => {
    fetchMembers();
  }, [selectedMonth]);

  // Add new member
  const handleAddMember = async (memberData) => {
    try {
      const response = await fetch('/api/new-members/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // If using cookies/sessions
        body: JSON.stringify(memberData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add member');
      }

      const data = await response.json();
      toast.success(data.message);
      fetchMembers(); // Refresh the list
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error(error.message);
    }
  };

  // Update member
  const handleUpdateMember = async (id, memberData) => {
    try {
      const response = await fetch(`/api/new-members/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(memberData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update member');
      }

      const data = await response.json();
      toast.success(data.message);
      fetchMembers(); // Refresh the list
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
      toast.error(error.message);
    }
  };

  // Delete member
  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`/api/new-members/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete member');
      }

      const data = await response.json();
      toast.success(data.message);
      fetchMembers(); // Refresh the list
      setDeleteModal({ isOpen: false, memberId: null });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error(error.message);
    }
  };

  // Handle form submission (add or update)
  const handleSubmit = (memberData) => {
    if (editingMember) {
      handleUpdateMember(editingMember._id, memberData);
    } else {
      handleAddMember(memberData);
    }
  };

  // Export members to Excel
  const handleExportMembers = async () => {
    try {
      let url = '/api/new-members/export/all';
      const params = new URLSearchParams();
      
      if (selectedMonth) {
        const [year, month] = selectedMonth.split('-');
        params.append('year', year);
        params.append('month', month);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to export members');
      
      const data = await response.json();
      
      // Convert to Excel using xlsx library
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'New Members');
      
      const fileName = `new-members-${selectedMonth || 'all'}-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      
      toast.success('Export successful');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export members');
    }
  };

  // Alternative download Excel (frontend only)
  const handleDownloadExcel = () => {
    if (members.length === 0) {
      toast.error('No data to export');
      return;
    }

    const data = members.map(member => ({
      'Name': member.name,
      'Phone': member.phone,
      'Email': member.email,
      'Residence': member.residence,
      'Marital Status': member.maritalStatus,
      'Occupation': member.occupation,
      'Interested in Membership': member.interestedInMembership ? 'Yes' : 'No',
      'How did you hear about us': member.howDidYouHearAboutUs,
      'Other Source': member.otherSource || '',
      'Date Added': new Date(member.createdAt).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'New Members');
    
    const fileName = `new-members-${selectedMonth || 'all'}-${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
    toast.success('Excel file downloaded successfully');
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  // Group members by month for display
  const groupedMembers = useMemo(() => {
    const groups = {};
    
    members.forEach(member => {
      if (!member.createdAt) return;
      
      const date = new Date(member.createdAt);
      const monthKey = date.toLocaleString('default', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      
      groups[monthKey].push(member);
    });
    
    return groups;
  }, [members]);

  // Update month counts when members change
  useEffect(() => {
    if (members.length > 0) {
      const counts = {};
      members.forEach(member => {
        if (member.createdAt) {
          const date = new Date(member.createdAt);
          const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          counts[monthKey] = (counts[monthKey] || 0) + 1;
        }
      });
      
      // Update months array with counts
      months.forEach(month => {
        month.count = counts[month.value] || 0;
      });
    }
  }, [members, months]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              New Members
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track new member registrations
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setEditingMember(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
            >
              <FaPlus />
              Add New Member
            </button>
            
            <button
              onClick={handleDownloadExcel}
              disabled={members.length === 0}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
            >
              <FaDownload />
              Download Excel
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Month
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">All Months</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label} ({month.count})
                    </option>
                  ))}
                </select>
                <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total: <span className="font-semibold">{members.length}</span> members
            </div>
          </div>
        </div>

        {/* Members List - Grouped by Month */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No members found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {selectedMonth ? 'Try selecting a different month or' : 'Get started by'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              <FaPlus />
              Add Your First Member
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedMembers).map(([month, monthMembers]) => (
              <div key={month} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-600" />
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {month}
                      </h2>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                      {monthMembers.length} member{monthMembers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Contact</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Residence</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Source</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {monthMembers.map((member) => (
                        <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">{member.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.occupation}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <FaPhone className="text-gray-400 text-sm" />
                                <span className="text-gray-700 dark:text-gray-300">{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-400 text-sm" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{member.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <FaHome className="text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{member.residence}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                member.interestedInMembership 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {member.interestedInMembership ? 'Interested' : 'Not Interested'}
                              </span>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {member.maritalStatus}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {member.howDidYouHearAboutUs}
                            </span>
                            {member.otherSource && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {member.otherSource}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => setDeleteModal({ isOpen: true, memberId: member._id })}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <NewMemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleSubmit}
        member={editingMember}
        hearAboutUsOptions={HEAR_ABOUT_US_OPTIONS}
        maritalStatusOptions={MARITAL_STATUS_OPTIONS}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, memberId: null })}
        onConfirm={() => handleDeleteMember(deleteModal.memberId)}
        title="Delete Member"
        message="Are you sure you want to delete this member? This action cannot be undone."
      />
    </div>
  );
}