import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMoneyBillWave, FaCalendarAlt, FaCashRegister } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function DashAccountRecord() {
 const { currentUser } = useSelector((state) => state.user);
 const [transactions, setTransactions] = useState([]);
 const [titheId, setTitheId] = useState(null);
  const [formData, setFormData] = useState({
    userID: currentUser._id,
    amount: "",
    period: "weekly",
    paymentForMonth: "January",
    weekOrMonth: "",
    mode: "mobile money",
  });
  console.log(formData);

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
        setFormData({  // Reset form after successful payment
          userID: currentUser._id,
          amount: "",
          period: "weekly",
          paymentForMonth: "January",
          weekOrMonth: "",
          mode: "mobile money",
        });
        console.log(data);
        toast.success("Payment successful");
      }
    } catch (error) {
      console.error(error);
      
      
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
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    {/* Main Content */}
    <div className="flex-1 p-6">
      <Link to="/reciept">
    <Button gradientDuoTone="purpleToBlue" outline className="ml-96">
  View All Transaction 
</Button>
</Link>
      <h1 className="text-2xl font-semibold mb-6">Tithe Dashboard</h1>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg flex items-center shadow-md">
        <FaMoneyBillWave className="text-green-400 text-2xl mr-2" />
        <div>
          <h2 className="text-xl font-semibold">Last Tithe Record</h2>
          <p className="text-3xl font-bold mt-2">GHS 350</p>
          <p className="text-sm text-gray-900 dark:text-white">March - Offering</p>
        </div>
      </div>

      {/* Total Contributions */}
      <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-4">
  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
    Mobile Money
  </h2>

  <h4 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-300">
    Select a Mobile Money Network to Pay your Tithe
  </h4>

  {/* Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
    {/* MTN Mobile Money Card */}
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img
        src="src/assets/pngfind.com-money-symbol-png-163563.png"
        alt="MTN Mobile Money"
        className="w-20 h-20 mb-2"
      />
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        MTN Mobile Money
      </p>
    </div>

    {/* Telecel Cash Card */}
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img
        src="src/assets/download.png"
        alt="Telecel Cash"
        className="w-20 h-20 mb-2"
      />
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Telecel Cash
      </p>
    </div>

    {/* AirtelTigo Mobile Money Card */}
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img
        src="src/assets/airteltigo.png"
        alt="AirtelTigo Mobile Money"
        className="w-20 h-20 mb-2"
      />
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        AirtelTigo Mobile Money
      </p>
    </div>
  </div>
</div>




      
      {/* Payment Form */}
      <form onSubmit={handlePayment} className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold mb-2">Make a Payment</h2>

  <label className="block mb-1">Enter an Amount</label>
  <input 
    type="number" 
    placeholder="Enter amount" 
    value={formData.amount} 
    onChange={(e) => setFormData({...formData, amount: e.target.value})} 
    className="mb-2 w-full p-2 rounded bg-white dark:bg-gray-800" 
    required 
  />

  <label className="block mb-1">Select Period</label>
  <select 
    value={formData.period} 
    onChange={(e) =>
      setFormData({ ...formData, period: e.target.value })
    } 
    className="mb-2 w-full p-2 rounded bg-white dark:bg-gray-800" 
    required
  >
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </select>

  <label className="block mb-1">Select Month</label>
  <select 
    value={formData.paymentForMonth} 
    onChange={(e) => setFormData({...formData, paymentForMonth: e.target.value})} 
    className="mb-2 w-full p-2 rounded bg-white dark:bg-gray-800"
    required
  >
    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
      <option key={month} value={month}>{month}</option>
    ))}
  </select>

  <label className="block mb-1">Describe Week or Month (e.g., "Week 2 of March 2025" or "March 2025")</label>
  <textarea 
    maxLength="30" 
    value={formData.weekOrMonth} 
    onChange={(e) => setFormData({...formData, weekOrMonth: e.target.value})} 
    className="w-full p-2 rounded bg-white dark:bg-gray-800 mb-1"
    required
  />
  <p className="text-sm text-gray-500">{formData.weekOrMonth.length} / 30 characters</p>

  <label className="block mb-1">Select Payment Mode</label>
  <select 
    value={formData.mode} 
    onChange={(e) => setFormData({...formData, mode: e.target.value})}
    className="mb-2 w-full p-2 rounded bg-white dark:bg-gray-800"
    required
  >
    <option value="physical cash">Physical Cash</option>
    <option value="mobile money">Mobile Money</option>
  </select>

  <button type="submit" className="w-full mt-2 p-2 bg-blue-600 rounded flex items-center justify-center">
    <FaCashRegister className="mr-2" /> Pay
  </button>
</form>

    </div>
    
    {/* Right Sidebar - Transaction History */}
    <div className="w-1/3 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white hidden md:block">
  {/* Transaction History */}
  <div>
    <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
    <div className="h-[40vh] overflow-y-auto">
      {transactions.map((tx) => (
        <div key={tx.id} className="p-3 border-b border-gray-700">
          <p className="text-sm">{tx.timestamp}</p>
          <p className="text-lg font-semibold">GHS {tx.amount}</p>
          <p className="text-sm text-gray-900 dark:text-white">
            {tx.period} - {tx.paymentForMonth}
          </p>
          <p className="text-sm text-gray-900 dark:text-white">{tx.mode}</p>
          <div className="mt-2 w-20 h-6 flex items-center justify-center bg-green-500 text-white text-xs font-semibold rounded-full">
            Completed
          </div>
          <p className="text-sm text-blue-500 mt-2 cursor-pointer">
  <Link
    to={`/receipt/${tx._id}`}  // Corrected template literal
    state={{ titheId: tx._id }}
    className="text-sm text-blue-500"
    onClick={() => setTitheId(tx._id)}  // Kept only one onClick
  >
    View Receipt
  </Link>
</p>
        </div>
      ))}

      <p className="text-sm text-blue-500 mt-2">View All Transactions</p>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-blue-600 my-4"></div>

  {/* Pending Transactions */}
  <div>
    <h2 className="text-lg font-semibold mb-4">Pending Transactions</h2>
    <div className="h-[35vh] overflow-y-auto">
      <div className="p-3 border-b border-gray-700">
        <p className="text-sm">March 15, 2025 - 10:30 AM</p>
        <p className="text-lg font-semibold text-yellow-500">GHS 150.00</p>
        <p className="text-sm text-gray-900 dark:text-white">March - Offering</p>
        <p className="text-sm text-gray-900 dark:text-white">Mobile Money</p>
        <div className="mt-2 w-20 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full">
          Pending
        </div>
      </div>
      <div className="p-3 border-b border-gray-700">
        <p className="text-sm">March 14, 2025 - 5:45 PM</p>
        <p className="text-lg font-semibold text-yellow-500">GHS 200.00</p>
        <p className="text-sm text-gray-900 dark:text-white">March - Tithe</p>
        <p className="text-sm text-gray-900 dark:text-white">Bank Transfer</p>
        <div className="mt-2 w-20 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full">
          Pending
        </div>
      </div>
    </div>
    
  </div>
  
</div>

</div>
  )
}
