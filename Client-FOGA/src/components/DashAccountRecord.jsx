import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMoneyBillWave, FaCalendarAlt, FaCashRegister } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FaReceipt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function DashAccountRecord() {
  const { currentUser } = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [isApproved, setIsApproved] = useState([]);
  const [isPending, setIsPending] = useState([]);
  const [titheId, setTitheId] = useState(null);
  const [firstTransaction, setFirstTransaction] = useState(null);
  const [needsApproval, setNeedsApproval] = useState([]);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    userID: currentUser._id,
    amount: "",
    period: "weekly",
    paymentForMonth: "January",
    weekOrMonth: "",
    mode: "mobile money",
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tithe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        toast.error(data.message);
      } else {
        setFormData({
          username: currentUser.username,
          userID: currentUser._id,
          amount: "",
          period: "weekly",
          paymentForMonth: "January",
          weekOrMonth: "",
          mode: "mobile money",
        });
        toast.success("Payment successful");
        getTransactions(); // Call getTransactions to refresh the list
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  const getTransactions = async () => {
    try {
      const res = await fetch("/api/tithe/getTithe", {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setTransactions(data);

        // Filter transactions
        const approved = data.filter((tx) => tx.isApproved === true);
        const pending = data.filter((tx) => tx.isApproved === false);
        const approvalNeeded = data.filter((tx) => tx.requestEdit === true);

        setIsApproved(approved);
        setIsPending(pending);
        setNeedsApproval(approvalNeeded);

        // Set first transaction correctly
        if (approved.length > 0) {
          setFirstTransaction(approved[0]);
        }
        if (approvalNeeded.length > 0) {
          setShowEditRequestModal(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    console.log("First Transaction:", firstTransaction);
  }, [firstTransaction]);

  const handleEditRequest = async (id) => {
    try {
      // First: Approve the edit
      const res = await fetch(`/api/tithe/approveTithe/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Second: Update the requestEdit state
      const res1 = await fetch(`/api/tithe/requestEdit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.log(data.message);
        toast.error(data.message);
      } else {
        setShowEditRequestModal(false);
        toast.success("Edit request accepted");
        getTransactions(); // Refresh transactions
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept edit request");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tithe Dashboard</h1>
          <Link to="/all-transaction">
            <Button gradientDuoTone="purpleToBlue" className="shadow-lg hover:shadow-xl transition-shadow">
              View All Records
            </Button>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Last Tithe Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300">
                    <FaMoneyBillWave className="text-2xl" />
                  </div>
                  <h2 className="text-xl font-bold ml-3">Last Tithe Record</h2>
                </div>
                
                {firstTransaction ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        GHS {firstTransaction.amount}
                      </p>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        Verified
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Mode</p>
                        <p className="font-medium">{firstTransaction.mode}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Period</p>
                        <p className="font-medium">{firstTransaction.period} - {firstTransaction.paymentForMonth}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="mr-2" />
                          <span>
                            {new Date(firstTransaction.createdAt).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Updated: {new Date(firstTransaction.updatedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No Tithe Record available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Mobile Money Payment</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Select a Mobile Money Network to Pay your Tithe</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "MTN Mobile Money", image: "/src/assets/pngfind.com-money-symbol-png-163563.png" },
                    { name: "Telecel Cash", image: "/src/assets/telecel-cash.jpg" },
                    { name: "AirtelTigo Mobile Money", image: "/src/assets/airteltigo.png" }
                  ].map((method, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-600 hover:-translate-y-1"
                    >
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-16 h-16 mb-3 object-contain"
                      />
                      <p className="text-sm font-medium text-center">{method.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (GHS)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
                      <select
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                      <select
                        value={formData.paymentForMonth}
                        onChange={(e) => setFormData({ ...formData, paymentForMonth: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {[
                          "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                        ].map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (e.g., "Week 2 of March 2025")
                    </label>
                    <textarea
                      maxLength="30"
                      value={formData.weekOrMonth}
                      onChange={(e) => setFormData({ ...formData, weekOrMonth: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.weekOrMonth.length} / 30 characters</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="physical cash">Physical Cash</option>
                      <option value="mobile money">Mobile Money</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                  >
                    <FaCashRegister className="mr-2" /> Make Payment
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Transaction History */}
          <div className="space-y-6">
            {/* Completed Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[calc(50vh-1rem)]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Transaction History</h2>
                  <FiCheckCircle className="text-green-500 text-xl" />
                </div>
                
                <div className="h-[calc(100%-3rem)] overflow-y-auto pr-2">
                  {isApproved.length > 0 ? (
                    isApproved.map((tx) => (
                      <div key={tx._id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">GHS {tx.amount}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {tx.period} - {tx.paymentForMonth}
                            </p>
                          </div>
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                          <Link
                            to={`/receipt/${tx._id}`}
                            state={{ titheId: tx._id }}
                            className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                          >
                            <FaReceipt className="mr-1" /> Receipt
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No completed transactions
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pending Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[calc(50vh-1rem)]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Pending Transactions</h2>
                  <FiClock className="text-yellow-500 text-xl" />
                </div>
                
                <div className="h-[calc(100%-3rem)] overflow-y-auto pr-2">
                  {isPending.length > 0 ? (
                    isPending.map((tx) => (
                      <div key={tx._id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">GHS {tx.amount}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {tx.period} - {tx.paymentForMonth}
                            </p>
                          </div>
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                            Pending
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                          <Link
                            to={`/receipt/${tx._id}`}
                            state={{ titheId: tx._id }}
                            className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                          >
                            <FaReceipt className="mr-1" /> Receipt
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No pending transactions
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Request Modal */}
      {showEditRequestModal && needsApproval.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <FiEdit className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Tithe Edit Request
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your tithe of <span className="font-semibold">GHS {needsApproval[0].amount}</span> requires an edit
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowEditRequestModal(false);
                    handleEditRequest(needsApproval[0]._id);
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    handleRejectRequest(needsApproval[0]._id);
                    setShowEditRequestModal(false);
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}