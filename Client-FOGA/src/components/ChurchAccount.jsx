import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ChurchAccount() {
  const [records, setRecords] = useState([]);
  const [firstRecord, setFirstRecord] = useState({});
  const [secondRecord, setSecondRecord] = useState({});

  const fetchRecords = async () => {
    try {
      const res = await fetch('api/church-account/get-church-record', {
        method: 'GET',
      });
      const data = await res.json();
      setRecords(data);
      setFirstRecord(data[0]);
      setSecondRecord(data[1]);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch records. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Calculate total amount for a record
  const calculateTotal = (record) => {
    return (
      (record?.thanksgiving || 0) +
      (record?.welfare || 0) +
      (record?.communityImpact || 0) +
      (record?.sundayOfferingFirstService || 0) +
      (record?.sundayOfferingSecondService || 0) +
      (record?.sundayOfferingThirdService || 0) +
      (record?.sundayOfferingFirstServiceProject || 0) +
      (record?.sundayOfferingSecondServiceProject || 0) +
      (record?.sundayOfferingThirdServiceProject || 0) +
      (record?.childrenServiceOffering || 0) +
      (record?.sundaySchool || 0) +
      (record?.midWeekOffering || 0) +
      (record?.fridayPrayerOffering || 0) +
      (record?.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0) +
      (record?.ifAnySpecialOfferingSpecify?.reduce((sum, event) => sum + (event.amount || 0), 0) || 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 w-full">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Church Account Dashboard
          </h1>
          
          {firstRecord && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last modified:{" "}
              {new Date(firstRecord.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <Link to="/all-tithes">
          <Button
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            className="mt-2 mr-2"
          >
            View all tithes
          </Button>
        </Link>
        {/* Add New Record Button */}
        <Link to="/new-church-record">
          <Button gradientDuoTone="purpleToBlue" outline>
            Add New Record
          </Button>
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
            {firstRecord && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Week</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(firstRecord?.nameOfThoseWhoPaid?.length || 0)} People
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    GHS {calculateTotal(firstRecord).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Special Appeals */}
          {firstRecord && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Special Appeals
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Thanksgiving</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.thanksgiving || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Welfare</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.welfare || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Community Impact</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.communityImpact || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Offerings */}
          {firstRecord && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Offerings
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering (1st Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingFirstService || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering (2nd Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingSecondService || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering (3rd Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingThirdService || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering Project (1st Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingFirstServiceProject || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering Project (2nd Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingSecondServiceProject || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday Offering Project (3rd Service)</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundayOfferingThirdServiceProject || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Children Service Offering</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.childrenServiceOffering || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Sunday School</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.sundaySchool || 0}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white">Mid-Week Offering</p>
                  <p className="text-gray-600 dark:text-gray-400">GHS {firstRecord.midWeekOffering || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="col-span-1">
          {/* Previous Week Records */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 w-full h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Previous Week Records
            </h2>
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record._id}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(record.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Amount: GHS {calculateTotal(record).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/view/${record._id}`}
                      state={{ recordId: record._id }}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${record._id}`}
                      state={{ recordId: record._id }}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                    >
                      Edit
                    </Link>
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
            {firstRecord && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Record</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    GHS {(
                      firstRecord.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            {secondRecord && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Previous Record</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    GHS {(
                      secondRecord.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Tithe Records Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          All Tithe Records
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={record._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {new Date(record.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    GHS {calculateTotal(record).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/view/${record._id}`}
                      state={{ recordId: record._id }}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${record._id}`}
                      state={{ recordId: record._id }}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200 ml-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}