import React, { useEffect, useState } from 'react';
import { Button, TextInput, Modal } from 'flowbite-react';
import toast from 'react-hot-toast';

export default function AllTithe() {
  const [titheRecords, setTitheRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editableRecord, setEditableRecord] = useState(null);

  // Fetch tithe records from the API
  useEffect(() => {
    const fetchTitheRecords = async () => {
      try {
        const res = await fetch('/api/church-account/get-alltithe'); // Replace with your API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch tithe records');
        }
        const data = await res.json();
        setTitheRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch tithe records. Please try again.');
      }
    };

    fetchTitheRecords();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = titheRecords.filter((record) =>
      record.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filtered);
}, [searchTerm, titheRecords]);


  // Open edit modal
  const openEditModal = (record) => {
    setEditableRecord(record);
    setEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditableRecord(null);
  };

  console.log(editableRecord);
  

  // Handle save changes
  const handleSaveChanges = async () => {
    console.log(editableRecord._id);
    try {
      const res = await fetch(`/api/church-account/tithe/${editableRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableRecord),
      });

      if (!res.ok) {
        throw new Error('Failed to update tithe record');
      }

      const updatedRecord = await res.json();
      setTitheRecords((prev) =>
        prev.map((record) =>
          record._id === updatedRecord._id ? updatedRecord : record
        )
      );
      setFilteredRecords((prev) =>
        prev.map((record) =>
          record._id === updatedRecord._id ? updatedRecord : record
        )
      );
      toast.success('Tithe record updated successfully!');
      closeEditModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update tithe record. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <TextInput
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tithe Records List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            All Tithe Records
          </h2>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record._id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
              >
                <div>
                  <p className="text-gray-900 dark:text-white">{record.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(record.createdAt).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 dark:text-white">GHS {record.amount}</p>
                  <Button
                    gradientDuoTone="purpleToBlue"
                    onClick={() => openEditModal(record)}
                  outline small>
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={editModalOpen} onClose={closeEditModal}>
        <Modal.Header>Edit Tithe Record</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput
              type="text"
              placeholder="Username"
              value={editableRecord?.username || ''}
              onChange={(e) =>
                setEditableRecord((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <TextInput
              type="number"
              placeholder="Amount"
              value={editableRecord?.amount || 0}
              onChange={(e) =>
                setEditableRecord((prev) => ({ ...prev, amount: e.target.value }))
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button gradientDuoTone="purpleToBlue" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}