import React from 'react';
import { Link } from 'react-router-dom';

export default function ChurchAccount() {
  // Dummy data for demonstration
  const lastWeekRecords = [
    { name: 'John Doe', amount: 50, method: 'Mobile Money' },
    { name: 'Jane Smith', amount: 100, method: 'Physical Cash' },
  ];

  const monthlyTithe = [
    { name: 'John Doe', amount: 200 },
    { name: 'Jane Smith', amount: 150 },
  ];

  const yearlyTithe = [
    { name: 'John Doe', amount: 2400 },
    { name: 'Jane Smith', amount: 1800 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Church Account Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last modified: October 10, 2023
          </p>
        </div>
        {/* Add New Record Button */}
        <Link to="/new-church-record">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New Record
        </button>
        </Link>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2">
          {/* Tithe Records */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Tithe Records
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lastWeekRecords.length} People
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  GHS{lastWeekRecords.reduce((sum, record) => sum + record.amount, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Special Appeals */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Special Appeals
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Thanksgiving</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 500</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Welfare</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 300</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Community Impact</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 700</p>
              </div>
            </div>
          </div>

          {/* Offerings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Offerings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Sunday Offering (1st Service)</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 1200</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Sunday Offering (2nd Service)</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 900</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Sunday Offering (3rd Service)</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 1100</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Children Service Offering</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 400</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Sunday School</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 300</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 dark:text-white">Mid-Week Offering</p>
                <p className="text-gray-600 dark:text-gray-400">GHS 500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1">
          {/* Previous Week Records */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Previous Week Records
            </h2>
            <div className="space-y-4">
              {lastWeekRecords.map((record, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 dark:text-white">{record.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {record.method}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`/view/${record.name}`} // Replace with actual view link
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </a>
                    <a
                      href={`/edit/${record.name}`} // Replace with actual edit link
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly and Yearly Tithe */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Tithe Overview
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  GHS{monthlyTithe.reduce((sum, record) => sum + record.amount, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Year</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  GHS{yearlyTithe.reduce((sum, record) => sum + record.amount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}