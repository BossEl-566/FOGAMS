import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titheId, setTitheId] = useState(null);

  // Fetch data from the API
  const getTransactions = async () => {
    try {
      setLoading(true); // Fix: Correct function call
      const res = await fetch("/api/tithe/getTithe", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setLoading(false);
        return; // Fix: Stop execution if the request failed
      }

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading is false even if an error occurs
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        All Tithe Records
      </h1>

      {/* Transaction list */}
      <div className="max-w-4xl mx-auto">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              {/* Transaction details */}
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  Amount: ${transaction.amount}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mode: {transaction.mode}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Period: {transaction.period}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Payment for: {transaction.paymentForMonth}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Week/Month: {transaction.weekOrMonth}
                </p>
              </div>

              {/* View Receipt link */}
              <Link
                  to={`/receipt/${transaction._id}`}  // Corrected template literal
                  state={{ titheId: transaction._id }}
                  className="text-sm text-blue-500"
                  onClick={() => setTitheId(transaction._id)}  // Kept only one onClick
                >
                  View Receipt
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
