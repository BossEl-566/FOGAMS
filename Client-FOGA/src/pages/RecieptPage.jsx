import React, { useRef, useState, useEffect } from "react";
import { Button } from "flowbite-react";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import logo from "../assets/assembliesOfGodLogo.png"; // Adjust the path as necessary
import { useSelector } from "react-redux";

const ReceiptPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const titheId = location.state?.titheId;
  const receiptRef = useRef(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!titheId) return;
      try {
        const response = await fetch(`/api/tithe/getTithe/${titheId}`);
        if (!response.ok) throw new Error("Failed to fetch transaction details");
        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [titheId]);

  const handleDownload = () => {
    if (!receiptRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const element = receiptRef.current;

    pdf.html(element, {
      callback: function (pdf) {
        pdf.save("receipt.pdf");
      },
      x: 10,
      y: 10,
      width: 190, // A4 width in mm
      windowWidth: element.scrollWidth,
    });
  };

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!transaction) return <p className="text-center text-red-500">Transaction not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 relative">
      {/* Download Button (Top-Right Corner) */}
      <div className="absolute top-6 right-6">
        <Button onClick={handleDownload} gradientDuoTone="purpleToBlue" size="sm" outline>
          Download Receipt
        </Button>
      </div>

      {/* Receipt Content */}
      <div
        ref={receiptRef}
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700 mt-10"
      >
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Church Logo" className="h-20 w-auto" />
          <h2 className="text-2xl font-bold dark:text-gray-200 text-gray-800 mt-4">
            Fellowship of Grace Assemblies of God
          </h2>
          <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mt-2">Payment Receipt</h3>
        </div>

        {/* Receipt Details */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-300 text-gray-700">
            <p><span className="font-semibold">Member:</span> {currentUser?.username || "N/A"}</p>
            <p><span className="font-semibold">Amount:</span> GHS {transaction?.amount || "N/A"}</p>
            <p><span className="font-semibold">Mode:</span> {transaction?.mode || "N/A"}</p>
            <p><span className="font-semibold">For:</span> {transaction?.paymentForMonth || "N/A"}</p>
            <p><span className="font-semibold">Period:</span> {transaction?.period || "N/A"}</p>
            <p><span className="font-semibold">Paid For:</span> {transaction?.weekOrMonth || "N/A"}</p>
            <p><span className="font-semibold">Transaction ID:</span> {transaction?.transactionID || "N/A"}</p>
            <p><span className="font-semibold">Status:</span> 
              <span className={`ml-1 px-2 py-1 rounded-md ${transaction?.isApproved ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
                {transaction?.isApproved ? "Approved" : "Pending"}
              </span>
            </p>
            <p><span className="font-semibold">Date:</span> {transaction?.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;