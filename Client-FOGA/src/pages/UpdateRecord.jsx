import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextInput, Modal } from 'flowbite-react';
import toast from 'react-hot-toast';

export default function UpdateRecord() {
  const location = useLocation();
  const navigate = useNavigate();
  const recordId = location.state?.recordId;
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', amount: 0 });
  const [currentField, setCurrentField] = useState('');

  // Fetch record details from the backend
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`/api/church-account/get-church-record/${recordId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch record');
        }
        const data = await res.json();
        setRecord(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
        toast.error('Failed to fetch record. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (recordId) {
      fetchRecord();
    }
  }, [recordId]);

  console.log(record);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested input changes (e.g., nameOfThoseWhoPaid, ifAnySpecialOfferingSpecify)
  const handleNestedInputChange = (field, index, key, value) => {
    setRecord((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = { ...updatedArray[index], [key]: value };
      return { ...prev, [field]: updatedArray };
    });
  };

  // Open add modal
  const openAddModal = (field) => {
    setCurrentField(field);
    setNewEntry({ name: '', amount: 0 });
    setAddModalOpen(true);
  };

  // Close add modal
  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewEntry({ name: '', amount: 0 });
    setCurrentField('');
  };

  // Handle save new entry
  const handleSaveNewEntry = () => {
    if (!newEntry.name || !newEntry.amount) {
      toast.error('Please fill in all fields.');
      return;
    }

    setRecord((prev) => ({
      ...prev,
      [currentField]: [...prev[currentField], newEntry],
    }));

    toast.success('New entry added successfully!');
    closeAddModal();
  };

  // Handle remove entry
  const handleRemoveEntry = (field, index) => {
    setRecord((prev) => {
      const updatedArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: updatedArray };
    });
    toast.success('Entry removed successfully!');
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`/api/church-account/update-church-record/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!res.ok) {
        throw new Error('Failed to update record');
      }

      const updatedRecord = await res.json();
      setRecord(updatedRecord);
      toast.success('Record updated successfully!');
      navigate(`/view/${recordId}`, { state: { recordId } }); // Redirect back to ViewRecord
    } catch (error) {
      console.error(error);
      toast.error('Failed to update record. Please try again.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">Error: {error}</div>;
  }

  if (!record) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">No record found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Update Church Record
        </h1>

        {/* General Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Created At
              </label>
              <TextInput
                type="text"
                value={new Date(record.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Updated
              </label>
              <TextInput
                type="text"
                value={new Date(record.updatedAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Tithe and Offerings */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Tithe and Offerings
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Sunday Offering (1st Service)', field: 'sundayOfferingFirstService' },
              { label: 'Sunday Offering (2nd Service)', field: 'sundayOfferingSecondService' },
              { label: 'Sunday Offering (3rd Service)', field: 'sundayOfferingThirdService' },
              { label: 'Children Service Offering', field: 'childrenServiceOffering' },
              { label: 'Sunday School', field: 'sundaySchool' },
              { label: 'Mid-Week Offering', field: 'midWeekOffering' },
              { label: 'Friday Prayer Offering', field: 'fridayPrayerOffering' },
            ].map((item, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </label>
                <TextInput
                  type="number"
                  value={record[item.field] || 0}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Special Appeals */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Special Appeals
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Thanksgiving', field: 'thanksgiving' },
              { label: 'Welfare', field: 'welfare' },
              { label: 'Community Impact', field: 'communityImpact' },
            ].map((item, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </label>
                <TextInput
                  type="number"
                  value={record[item.field] || 0}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Name of Those Who Paid */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Name of Those Who Paid
          </h2>
          <div className="space-y-4">
            {record.nameOfThoseWhoPaid.map((person, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Person {index + 1}
                </label>
                <div className="flex items-center gap-2">
                  <TextInput
                    type="text"
                    placeholder="Name"
                    value={person.name}
                    onChange={(e) =>
                      handleNestedInputChange('nameOfThoseWhoPaid', index, 'name', e.target.value)
                    }
                    className="mb-2"
                  />
                  <TextInput
                    type="number"
                    placeholder="Amount"
                    value={person.amount}
                    onChange={(e) =>
                      handleNestedInputChange('nameOfThoseWhoPaid', index, 'amount', e.target.value)
                    }
                  />
                  <Button
                    color="failure"
                    onClick={() => handleRemoveEntry('nameOfThoseWhoPaid', index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => openAddModal('nameOfThoseWhoPaid')}
            >
              Add Person
            </Button>
          </div>
        </div>

        {/* Special Offerings */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Special Offerings
          </h2>
          <div className="space-y-4">
            {record.ifAnySpecialOfferingSpecify.map((event, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event {index + 1}
                </label>
                <div className="flex items-center gap-2">
                  <TextInput
                    type="text"
                    placeholder="Event"
                    value={event.event}
                    onChange={(e) =>
                      handleNestedInputChange('ifAnySpecialOfferingSpecify', index, 'event', e.target.value)
                    }
                    className="mb-2"
                  />
                  <TextInput
                    type="number"
                    placeholder="Amount"
                    value={event.amount}
                    onChange={(e) =>
                      handleNestedInputChange('ifAnySpecialOfferingSpecify', index, 'amount', e.target.value)
                    }
                  />
                  <Button
                    color="failure"
                    onClick={() => handleRemoveEntry('ifAnySpecialOfferingSpecify', index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => openAddModal('ifAnySpecialOfferingSpecify')}
            >
              Add Event
            </Button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-6">
          <Button gradientDuoTone="purpleToBlue" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Add Entry Modal */}
      <Modal show={addModalOpen} onClose={closeAddModal}>
        <Modal.Header>Add New Entry</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput
              type="text"
              placeholder="Name"
              value={newEntry.name}
              onChange={(e) => setNewEntry((prev) => ({ ...prev, name: e.target.value }))}
            />
            <TextInput
              type="number"
              placeholder="Amount"
              value={newEntry.amount}
              onChange={(e) => setNewEntry((prev) => ({ ...prev, amount: e.target.value }))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeAddModal}>Cancel</Button>
          <Button gradientDuoTone="purpleToBlue" onClick={handleSaveNewEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}