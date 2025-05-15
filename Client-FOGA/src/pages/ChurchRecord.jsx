import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
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
        sundayOfferingFirstServiceProject: '',
        sundayOfferingSecondServiceProject: '',
        sundayOfferingThirdServiceProject: '',
        childrenServiceOffering: '',
        sundaySchool: '',
        midWeekOffering: '',
        fridayPrayerOffering: '',
        ifAnySpecialOfferingSpecify: [],
    });

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [eventNames, setEventNames] = useState("");
    const [eventAmounts, setEventAmounts] = useState("");
    const [allMembers, setAllMembers] = useState("");
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [membersNeedingApproval, setMembersNeedingApproval] = useState([]);
    const [pendingTitheId, setPendingTitheId] = useState("");
    const [prevRecord, setPrevRecord] = useState({});
    const [updateFormData, setUpdateFormData] = useState({
        amount: "",
        period: "",
        weekOrMonth: "",
        paymentForMonth: "",
        mode: "",
    });
    const [updateTitheModal, setUpdateTitheModal] = useState(false);
    const [updateTitheId, setUpdateTitheId] = useState("");
    const [updateTitheUsername, setUpdateTitheUsername] = useState("");
    const [createTitheFormData, setCreateTitheFormData] = useState({
        userID: "",
        username: "",
        amount: "",
        period: "",
        weekOrMonth: "",
        paymentForMonth: "",
        mode: "",
    });

    useEffect(() => {
      if(updateTitheId && updateTitheUsername) {
        setCreateTitheFormData({
          userID: updateTitheId,
          username: updateTitheUsername,
          amount: "",
          period: "",
          weekOrMonth: "",
          paymentForMonth: "",
          mode: "",
        });
      }
    }, [updateTitheId, updateTitheUsername]);

    const addUnsubscribeUser = () => {
        if (name && amount) {
            setFormData((prev) => ({
                ...prev,
                nameOfThoseWhoPaid: [...prev.nameOfThoseWhoPaid, { name: name, amount: amount }],
            }));
            toast.success('User added successfully');
            setName("");
            setAmount("");
        }
    };

    const getPendingTithes = async () => {
        try {
            const res = await fetch("/api/church-account/tithe", {
                method: "GET",
            });
            
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            setMembersNeedingApproval(data);
        } catch (error) {
            console.error("Error getting pending tithes:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getPendingTithes();
    }, []);

    const getMembers = async () => {
        try {
            const res = await fetch("/api/church-account/get-members", {
                method: "GET",
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
                return;
            }

            if (Array.isArray(data)) {
                setAllMembers(data);
            } else {
                console.error("Expected an array but got:", data);
                setAllMembers([]);
            }
        } catch (error) {
            console.error("Error getting members:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getMembers();
    }, []);

    const handleApproveUser = async () => {
        try {
            const res = await fetch(`/api/church-account/approve-tithe/${pendingTitheId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
                
            if (!res.ok) {
                toast.error(data.message || "Failed to approve user");
                return;
            }
            setFormData({ ...formData, nameOfThoseWhoPaid: [...formData.nameOfThoseWhoPaid, { name: data.username, amount: data.amount }] });
            toast.success("User approved successfully");
            setMembersNeedingApproval(membersNeedingApproval.filter((member) => member._id !== pendingTitheId));
            setShowApproveModal(false);
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleDeleteRecord = async () => {
        try {
            const res = await fetch(`/api/church-account/delete-tithe/${pendingTitheId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to delete record");
                return;
            }

            toast.success("Record deleted successfully");
            setMembersNeedingApproval(membersNeedingApproval.filter((member) => member._id !== pendingTitheId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting record:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const getRecordForUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/church-account/get-tithe/${pendingTitheId}`, {
                method: "GET",
            });
        
            const data = await res.json();
        
            if (!res.ok) {
                toast.error(data.message || "Failed to get record for update");
                return;
            }
        
            setPrevRecord(data);
        } catch (error) {
            console.error("Error getting record for update:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    
    useEffect(() => {
        if (pendingTitheId) {
            getRecordForUpdate();
        }
    }, [pendingTitheId]);

    useEffect(() => {
        if (prevRecord) {
            setUpdateFormData({
                amount: prevRecord.amount || "",
                period: prevRecord.period || "",
                weekOrMonth: prevRecord.weekOrMonth || "",
                paymentForMonth: prevRecord.paymentForMonth || "",
                mode: prevRecord.mode || "",
            });
        }
    }, [prevRecord]);

    const handleUpdateRecord = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/church-account/update-tithe/${pendingTitheId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateFormData),
            });
        
            const data = await res.json();
        
            if (!res.ok) {
                toast.error(data.message || "Failed to update record");
                return;
            }
            setFormData({ ...formData, nameOfThoseWhoPaid: [...formData.nameOfThoseWhoPaid, { name: data.username, amount: data.amount }] });
            toast.success("Record updated successfully");
            setMembersNeedingApproval(membersNeedingApproval.filter((member) => member._id !== pendingTitheId));
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating record:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const addSpecialOffering = () => {
        if (eventNames && eventAmounts) {
            setFormData((prev) => ({
                ...prev,
                ifAnySpecialOfferingSpecify: [
                    ...prev.ifAnySpecialOfferingSpecify,
                    { event: eventNames, amount: eventAmounts },
                ],
            }));
            toast.success('Special offering added successfully');
            setEventNames(""); 
            setEventAmounts("");
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = async (e) => { 
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
                sundayOfferingFirstServiceProject: '',
                sundayOfferingSecondServiceProject: '',
                sundayOfferingThirdServiceProject: '',
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

    const handleCreateTithe = async (e) => {
        e.preventDefault();
        if (!createTitheFormData.amount || !createTitheFormData.period || !createTitheFormData.weekOrMonth || !createTitheFormData.paymentForMonth || !createTitheFormData.mode) {
            toast.error("Please fill out all fields");
            return;
        }
        try {
            const res = await fetch(`/api/church-account/create-tithe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createTitheFormData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to create tithe");
                return;
            }
            setFormData({ ...formData, nameOfThoseWhoPaid: [...formData.nameOfThoseWhoPaid, { name: data.username, amount: data.amount }] });
            toast.success("Tithe created successfully");
            setCreateTitheFormData({
                userId: "",
                username: "",
                amount: "",
                period: "",
                weekOrMonth: "",
                paymentForMonth: "",
                mode: "",
            });
            setUpdateTitheModal(false);
        } catch (error) {
            console.error("Error creating tithe:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const filteredMembers = Array.isArray(allMembers) 
        ? allMembers.filter((member) =>
            member.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

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

                    {/* Sunday Offering Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering Project (1st Service)</label>
                            <input
                                type="number"
                                name="sundayOfferingFirstServiceProject"
                                value={formData.sundayOfferingFirstServiceProject}
                                onChange={(e) => setFormData({...formData, sundayOfferingFirstServiceProject: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering Project (2nd Service)</label>
                            <input
                                type="number"
                                name="sundayOfferingSecondServiceProject"
                                value={formData.sundayOfferingSecondServiceProject}
                                onChange={(e) => setFormData({...formData, sundayOfferingSecondServiceProject: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sunday Offering Project (3rd Service)</label>
                            <input
                                type="number"
                                name="sundayOfferingThirdServiceProject"
                                value={formData.sundayOfferingThirdServiceProject}
                                onChange={(e) => setFormData({...formData, sundayOfferingThirdServiceProject: e.target.value})}
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
                        <Button
                            type="submit" gradientDuoTone='purpleToBlue'
                            className="w-full md:w-auto"
                        outline>
                            Submit
                        </Button>
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
                <div className="space-y-4 h-[40vh] overflow-y-auto">
                    {filteredMembers.map((member) => (
                        <div key={member.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white">{member.username}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Email: {member.email}</p>
                            </div>
                            <button
                                onClick={() => {setUpdateTitheModal(true), setUpdateTitheId(member._id), setUpdateTitheUsername(member.username);}}
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
                                <p className="text-lg font-semibold text-gray-800 dark:text-white">{member.username}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Amount: GHS{member.amount}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {setShowApproveModal(true); setPendingTitheId(member._id)}}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => {setShowEditModal(true), setPendingTitheId(member._id)}}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                                >
                                    Edit
                                </button>
                                <button onClick={() => {setShowDeleteModal(true), setPendingTitheId(member._id)}}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300">
                                        Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <Modal show={showApproveModal} onClose={() => setShowApproveModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to approve this record?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={handleApproveUser}>Yes, Accept</Button>
                            <Button color="gray" onClick={() => setShowApproveModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete this record?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteRecord}>Yes, Accept</Button>
                            <Button color="gray" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} popup size="lg">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500">Payment Details</h3>
                        <form onSubmit={handleUpdateRecord}>
                            {/* Amount */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    value={updateFormData.amount}
                                    onChange={(e) => setUpdateFormData({ ...updateFormData, amount: e.target.value })}
                                    type="number"
                                    name="amount"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Period */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Week or Month</label>
                                <input
                                    value={updateFormData.weekOrMonth}
                                    onChange={(e) => setUpdateFormData({ ...updateFormData, weekOrMonth: e.target.value })}
                                    type="text"
                                    name="period"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Week or Month */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Period</label>
                                <select
                                    value={updateFormData.weekOrMonth}
                                    onChange={(e) => setUpdateFormData({ ...updateFormData, period: e.target.value })}
                                    name="period"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            {/* Payment for Month */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Payment for Month</label>
                                <select
                                    value={updateFormData.paymentForMonth}
                                    onChange={(e) => setUpdateFormData({ ...updateFormData, paymentForMonth: e.target.value })}
                                    className="mb-2 w-full p-2 rounded bg-white dark:bg-gray-800"
                                    required
                                >
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mode */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Mode</label>
                                <select
                                    value={updateFormData.mode}
                                    onChange={(e) => setUpdateFormData({ ...updateFormData, mode: e.target.value })}
                                    name="mode"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="cash">Physical Cash</option>
                                    <option value="mobile money">Mobile Money</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-4 mt-6">
                                <Button type="submit" color="blue">Submit</Button>
                                <Button color="gray" onClick={() => setShowEditModal(false)}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={updateTitheModal} onClose={() => setUpdateTitheModal(false)} popup size="lg">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {/* Name at the top */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{updateTitheUsername}</h2>

                        {/* Payment Details Form */}
                        <h3 className="mb-5 text-lg text-gray-500">Payment Details</h3>
                        <form onSubmit={handleCreateTithe}>
                            {/* Amount */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={createTitheFormData.amount}
                                    onChange={(e) => setCreateTitheFormData({ ...createTitheFormData, amount: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Period */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Month or Week</label>
                                <input
                                    type="text"
                                    name="weekOrMonth"
                                    value={createTitheFormData.weekOrMonth}
                                    onChange={(e) => setCreateTitheFormData({ ...createTitheFormData, weekOrMonth: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Week or Month */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Period</label>
                                <select
                                    name="period"
                                    value={createTitheFormData.period}
                                    onChange={(e) => setCreateTitheFormData({ ...createTitheFormData, period: e.target.value })} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            {/* Payment for Month */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Payment for Month</label>
                                <select
                                    name="paymentForMonth"
                                    value={createTitheFormData.paymentForMonth}
                                    onChange={(e) => setCreateTitheFormData({ ...createTitheFormData, paymentForMonth: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {[
                                        "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December",
                                    ].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Mode */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Mode</label>
                                <select
                                    name="mode"
                                    value={createTitheFormData.mode}
                                    onChange={(e) => setCreateTitheFormData({ ...createTitheFormData, mode: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="physical cash">Physical Cash</option>
                                    <option value="mobile money">Mobile Money</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-4 mt-6">
                                <Button type="submit" color="blue">
                                    Submit
                                </Button>
                                <Button color="gray" onClick={() => setUpdateTitheModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChurchAccountForm;