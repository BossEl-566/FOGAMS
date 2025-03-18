import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChurchAccountForm = () => {
    const { currentUser } = useSelector((state) => state.user);
  // State for form inputs
  const [formData, setFormData] = useState({
    userId: currentUser._id,
    nameOfThoseWhoPaid: [],
    thanksgiving: '',
    welfare: '',
    communityImpact: '',
    sundayOfferingFirstService: '',
    sundayOfferingSecondService: '',
    sundayOfferingThirdService: '',
    childrenServiceOffering: '',
    sundaySchool: '',
    midWeekOffering: '',
    fridayPrayerOffering: '',
    ifAnySpecialOfferingSpecify: [],
  });
  console.log(formData)
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [eventNames, setEventNames] = useState("");
  const [eventAmounts, setEventAmounts] = useState("");

  // State for special offerings
  const [specialOfferings, setSpecialOfferings] = useState([]);
  const [specialOfferingInput, setSpecialOfferingInput] = useState({
    event: '',
    amount: '',
  });

  // State for unsubscribe users
//   const [unsubscribeUsers, setUnsubscribeUsers] = useState([]);
//   const [unsubscribeUserInput, setUnsubscribeUserInput] = useState({
//     name: '',
//     amount: '',
//   });
const addUnsubscribeUser = () => {
    if (name && amount) {
      setFormData((prev) => ({
        ...prev,
        nameOfThoseWhoPaid: [...prev.nameOfThoseWhoPaid, { name: name, amount: amount }], // Store as an object
      }));
      toast.success('User added successfully');
      setName(""); 
      setAmount("");
     
    }
  };
  // State for members needing approval (dummy data for demonstration)
  const [membersNeedingApproval, setMembersNeedingApproval] = useState([
    { id: 1, name: 'John Doe', amount: 100, needsApproval: true },
    { id: 2, name: 'Jane Smith', amount: 200, needsApproval: true },
  ]);

  // State for all members (dummy data for demonstration)
  const [allMembers, setAllMembers] = useState([
    { id: 1, name: 'John Doe', amount: 100 },
    { id: 2, name: 'Jane Smith', amount: 200 },
    { id: 3, name: 'Alice Johnson', amount: 150 },
    { id: 4, name: 'Bob Brown', amount: 300 },
  ]);

  // State for search
  const [searchQuery, setSearchQuery] = useState('');


  // Handle special offering input changes
  const handleSpecialOfferingChange = (e) => {
    const { name, value } = e.target;
    setSpecialOfferingInput({ ...specialOfferingInput, [name]: value });
  };

  // Add special offering
  const addSpecialOffering = () => {
    if (eventNames && eventAmounts) {
      setFormData((prev) => ({
        ...prev,
        ifAnySpecialOfferingSpecify: [
          ...prev.ifAnySpecialOfferingSpecify,
          { event: eventNames, amount: eventAmounts }, // Store as an object
        ],
      }));
      toast.success('Special offering added successfully');
      setEventNames(""); 
      setEventAmounts("");
    }
  };
  

  // Handle unsubscribe user input changes
  const handleUnsubscribeUserChange = (e) => {
    const { name, value } = e.target;
    setUnsubscribeUserInput({ ...unsubscribeUserInput, [name]: value });
  };

  // Add unsubscribe user
//   const addUnsubscribeUser = () => {
//     if (unsubscribeUserInput.name && unsubscribeUserInput.amount) {
//       setUnsubscribeUsers([...unsubscribeUsers, unsubscribeUserInput]);
//       setUnsubscribeUserInput({ name: '', amount: '' });
//     }
//   };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => { // ✅ Mark function as async
    e.preventDefault();
    try {
        const res = await fetch("/api/church-account/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "Failed to create account");
            return;
        }

        toast.success("Church account created successfully");
        setFormData({
            userId: currentUser._id,
            nameOfThoseWhoPaid: [],
            thanksgiving: '',
            welfare: '',
            communityImpact: '',
            sundayOfferingFirstService: '',
            sundayOfferingSecondService: '',
            sundayOfferingThirdService: '',
            childrenServiceOffering: '',
            sundaySchool: '',
            midWeekOffering: '',
            fridayPrayerOffering: '',
            ifAnySpecialOfferingSpecify: [],
        });

    } catch (error) {
        console.error("Error creating church account:", error);
        toast.error("An error occurred. Please try again."); 
    }
};


  // Handle approve button click
  const handleApprove = (id) => {
    console.log(`Approved member with ID: ${id}`);
    // Add logic to approve the member
  };

  // Handle edit button click
  const handleEdit = (id) => {
    console.log(`Edit member with ID: ${id}`);
    // Add logic to edit the member
  };

  // Filter all members based on search query
  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Church Account Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Special Appeals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thanksgiving</label>
              <input
                type="number"
                name="thanksgiving"
                value={formData.thanksgiving}
                onChange={(e) => setFormData({...formData, thanksgiving: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Welfare</label>
              <input
                type="number"
                name="welfare"
                value={formData.welfare}
                onChange={(e) => setFormData({...formData, welfare: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Community Impact</label>
              <input
                type="number"
                name="communityImpact"
                value={formData.communityImpact}
                onChange={(e) => setFormData({...formData, communityImpact: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Sunday Offerings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering (1st Service)</label>
              <input
                type="number"
                name="sundayOfferingFirstService"
                value={formData.sundayOfferingFirstService}
                onChange={(e) => setFormData({...formData, sundayOfferingFirstService: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering (2nd Service)</label>
              <input
                type="number"
                name="sundayOfferingSecondService"
                value={formData.sundayOfferingSecondService}
                onChange={(e) => setFormData({...formData, sundayOfferingSecondService: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering (3rd Service)</label>
              <input
                type="number"
                name="sundayOfferingThirdService"
                value={formData.sundayOfferingThirdService}
                onChange={(e) => setFormData({...formData, sundayOfferingThirdService: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Other Offerings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Children Service Offering</label>
              <input
                type="number"
                name="childrenServiceOffering"
                value={formData.childrenServiceOffering}
                onChange={(e) => setFormData({...formData, childrenServiceOffering: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday School</label>
              <input
                type="number"
                name="sundaySchool"
                value={formData.sundaySchool}
                onChange={(e) => setFormData({...formData, sundaySchool: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mid-Week Offering</label>
              <input
                type="number"
                name="midWeekOffering"
                value={formData.midWeekOffering}
                onChange={(e) => setFormData({...formData, midWeekOffering: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Friday Prayer Offering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Friday Prayer Offering</label>
              <input
                type="number"
                name="fridayPrayerOffering"
                value={formData.fridayPrayerOffering}
                onChange={(e) => setFormData({...formData, fridayPrayerOffering: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Special Offerings */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Special Offerings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event</label>
                <input
                  type="text"
                  name="event"
                  value={eventNames}
                  onChange={(e) => setEventNames(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={eventAmounts}
                  onChange={(e) => setEventAmounts(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addSpecialOffering}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
            >
              Add Special Offering
            </button>
          </div>

          {/* Unsubscribe Users */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Unsubscribe Users</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addUnsubscribeUser}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
            >
              Add Unsubscribe User
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Search Members</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{member.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount: GHS{member.amount}</p>
              </div>
              <button
                onClick={() => handleEdit(member.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
              >
                Update Tithe
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Members Needing Approval Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Members Needing Approval</h2>
        <div className="space-y-4">
          {membersNeedingApproval.map((member) => (
            <div key={member.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{member.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount: GHS{member.amount}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(member.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleEdit(member.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChurchAccountForm;