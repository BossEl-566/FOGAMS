import React, { useEffect, useState } from 'react';

export default function DashBirthday() {
  const [celebrants, setCelebrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCelebrants = async () => {
      try {
        const res = await fetch('/api/membership/birthdays-today');
        const data = await res.json();
        setCelebrants(data);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrants();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">🎉 Today's Birthday Celebrants 🎉</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : celebrants.length === 0 ? (
        <p className="text-center text-gray-500">No birthdays today.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {celebrants.map((member) => (
            <div key={member._id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-800">{member.fullname}</h3>
              <p className="text-gray-600">📱 {member.contact}</p>
              <p className="text-gray-600">📧 {member.email}</p>
              <p className="text-sm text-green-600 mt-2">🎂 Happy Birthday!</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
