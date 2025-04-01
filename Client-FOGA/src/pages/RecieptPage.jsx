import React, { useRef, useState, useEffect } from "react";
import { Button } from "flowbite-react";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import logo from "../assets/assembliesOfGodLogo.png";
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
      width: 190,
      windowWidth: element.scrollWidth,
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!transaction) return <p className="text-center text-red-500 py-10">Transaction not found</p>;

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-50 dark:bg-gray-900 relative print:p-0">
      {/* Download Button */}
      <div className="absolute top-6 right-6 print:hidden">
        <Button onClick={handleDownload} gradientDuoTone="purpleToBlue" size="sm" outline>
          Download Receipt
        </Button>
      </div>

      {/* Receipt Content */}
      <div
        ref={receiptRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mt-10 print:shadow-none print:border-0 print:mt-0 print:max-w-full"
      >
        {/* Header with Logo and Watermark */}
        <div className="relative bg-blue-800 text-white p-6 print:bg-blue-800">
  <div className="absolute inset-0 opacity-10 print:hidden">
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-6xl font-bold tracking-widest opacity-50">PAID</span>
    </div>
  </div>

  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
    <div className="flex items-center mb-4 md:mb-0">
      <img src={logo} alt="Church Logo" className="h-16 w-auto mr-4" />
      <div>
        <h1 className="text-2xl font-bold">Fellowship of Grace</h1>
        <h2 className="text-xl">Assemblies of God - Pedu</h2>
      </div>
    </div>
    <div className="text-right">
      <h3 className="text-3xl font-bold">OFFICIAL RECEIPT</h3>
      <p className="text-sm mt-1">{new Date(transaction?.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>
    </div>
  </div>
</div>


        {/* Receipt Body */}
        <div className="p-6">
          {/* Member and Transaction Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Member Information</h4>
              <div className="mt-2 space-y-1">
                <p className="text-lg font-medium">{currentUser?.username || "N/A"}</p>
                <p className="text-gray-600 dark:text-gray-300">{currentUser?.email || "N/A"}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Transaction Details</h4>
              <div className="mt-2 space-y-1">
                <p><span className="font-medium">Transaction ID:</span> {transaction?.transactionID || "N/A"}</p>
                <p><span className="font-medium">Payment Method:</span> {transaction?.mode || "N/A"}</p>
                <p>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${transaction?.isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {transaction?.isApproved ? "Approved" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Payment For</p>
                <p className="font-medium">{transaction?.paymentForMonth || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Period</p>
                <p className="font-medium">{transaction?.period || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{transaction?.weekOrMonth || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="flex justify-end mt-8">
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-3xl font-bold text-blue-900">GHS {transaction?.amount?.toFixed(2) || "0.00"}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-500">Thank you for your contribution</p>
              <p className="font-medium">Fellowship of Grace Assemblies</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-32 border-t border-b border-gray-300 flex items-center justify-center">
                <p className="text-xs text-gray-500">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;