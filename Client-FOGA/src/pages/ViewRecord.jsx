import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import toast from 'react-hot-toast';

export default function ViewRecord() {
  const location = useLocation();
  const recordId = location.state?.recordId;
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Calculate totals
  const totalOffering =
    (record?.sundayOfferingFirstService || 0) +
    (record?.sundayOfferingSecondService || 0) +
    (record?.sundayOfferingThirdService || 0);

  const totalTithe = record?.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0;

  const overallTotal =
    (record?.thanksgiving || 0) +
    (record?.welfare || 0) +
    (record?.communityImpact || 0) +
    (record?.sundayOfferingFirstService || 0) +
    (record?.sundayOfferingSecondService || 0) +
    (record?.sundayOfferingThirdService || 0) +
    (record?.childrenServiceOffering || 0) +
    (record?.sundaySchool || 0) +
    (record?.midWeekOffering || 0) +
    (record?.fridayPrayerOffering || 0) +
    totalTithe +
    (record?.ifAnySpecialOfferingSpecify?.reduce((sum, event) => sum + (event.amount || 0), 0) || 0);

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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 print:p-4 print:shadow-none print:bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Church Record Details
          </h1>
          <Button gradientDuoTone="purpleToBlue" onClick={handlePrint}>
            Print Record
          </Button>
        </div>

        {/* Record Details */}
        <div className="space-y-6 print:space-y-4">
          {/* General Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4 print:text-black print:text-2xl">
              General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-black dark:text-gray-400 print:text-black print:text-base">
                  Created At
                </p>
                <p className="text-lg font-bold text-black dark:text-white print:text-black print:text-xl">
                  {new Date(record.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-black dark:text-gray-400 print:text-black print:text-base">
                  Last Updated
                </p>
                <p className="text-lg font-bold text-black dark:text-white print:text-black print:text-xl">
                  {new Date(record.updatedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Tithe and Offerings */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4 print:text-black print:text-2xl">
              Tithe and Offerings
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Sunday Offering (1st Service)', value: record.sundayOfferingFirstService },
                { label: 'Sunday Offering (2nd Service)', value: record.sundayOfferingSecondService },
                { label: 'Sunday Offering (3rd Service)', value: record.sundayOfferingThirdService },
                { label: 'Children Service Offering', value: record.childrenServiceOffering },
                { label: 'Sunday School', value: record.sundaySchool },
                { label: 'Mid-Week Offering', value: record.midWeekOffering },
                { label: 'Friday Prayer Offering', value: record.fridayPrayerOffering },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white print:text-black print:text-lg">
                    {item.label}
                  </p>
                  <p className="text-black dark:text-gray-400 print:text-black print:text-lg">
                    GHS {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Appeals */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4 print:text-black print:text-2xl">
              Special Appeals
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Thanksgiving', value: record.thanksgiving },
                { label: 'Welfare', value: record.welfare },
                { label: 'Community Impact', value: record.communityImpact },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-black dark:text-white print:text-black print:text-lg">
                    {item.label}
                  </p>
                  <p className="text-black dark:text-gray-400 print:text-black print:text-lg">
                    GHS {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Name of Those Who Paid */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4 print:text-black print:text-2xl">
              Name of Those Who Paid
            </h2>
            <div className="space-y-4">
              {record.nameOfThoseWhoPaid.map((person, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-black dark:text-white print:text-black print:text-lg">
                    {person.name}
                  </p>
                  <p className="text-black dark:text-gray-400 print:text-black print:text-lg">
                    GHS {person.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offerings */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4 print:text-black print:text-2xl">
              Special Offerings
            </h2>
            <div className="space-y-4">
              {record.ifAnySpecialOfferingSpecify.map((event, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-black dark:text-white print:text-black print:text-lg">
                    {event.event}
                  </p>
                  <p className="text-black dark:text-gray-400 print:text-black print:text-lg">
                    GHS {event.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 print:bg-transparent print:dark:bg-transparent">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 print:text-black print:text-2xl">
              Totals
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Total Offering (1st, 2nd, 3rd Services)', value: totalOffering },
                { label: 'Total Tithe', value: totalTithe },
                { label: 'Overall Total', value: overallTotal },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white print:text-black print:text-lg">
                    {item.label}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 print:text-black print:text-lg">
                    GHS {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}