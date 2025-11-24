import React, { useState } from 'react';

export default function Giving() {
  const [activeTab, setActiveTab] = useState('church');
  

  const churchAccounts = [
    {
      name: "Main Church Account",
      bank: "National Investment Bank (NIB)",
      accountNumber: "1311096930701",
      accountName: "Fellowship of Grace Ass. of God",
      branch: "Central Region"
    },
    
  ];

  const mobileMoneyAccounts = [
    {
      network: "MTN Mobile Money",
      number: "0240 395 732",
      name: "Assemblies of God Ghana(Fellowship of Grace)",
      type: "Merchant Account"
    },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Give Generously</h1>
          <p className="text-gray-600 text-lg">
            "Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver." 
            <span className="block text-sm text-gray-500 mt-1">- 2 Corinthians 9:7</span>
          </p>
        </div>

        

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('church')}
              className={`flex-1 py-4 font-semibold text-center transition-all duration-200 ${
                activeTab === 'church'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Bank Transfer
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex-1 py-4 font-semibold text-center transition-all duration-200 ${
                activeTab === 'mobile'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Mobile Money
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'church' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Church Bank Accounts</h3>
                {churchAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-5 hover:border-blue-200 transition-all duration-200 bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">{account.name}</h4>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {account.bank}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="font-mono text-lg font-semibold">{account.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Name</p>
                        <p className="font-semibold">{account.accountName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Branch</p>
                        <p>{account.branch}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Transfer Instructions:</h4>
                  <ul className="text-blue-700 space-y-1 text-sm list-disc list-inside">
                    <li>Use your bank's mobile app or internet banking</li>
                    <li>Enter the account details exactly as shown above</li>
                    <li>Use your name as the transaction reference</li>
                    <li>Keep the transaction receipt for your records</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'mobile' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobile Money Accounts</h3>
                {mobileMoneyAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-5 hover:border-green-200 transition-all duration-200 bg-white"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          account.network.includes('MTN') ? 'bg-yellow-100' :
                          account.network.includes('Vodafone') ? 'bg-red-100' : 'bg-purple-100'
                        }`}>
                          <span className="text-lg font-semibold text-gray-700">
                            {account.network.split(' ')[0].charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{account.network}</h4>
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                            {account.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-mono text-lg font-semibold">{account.number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Recipient Name</p>
                        <p className="font-semibold">{account.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Instructions */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">How to Give via Mobile Money:</h4>
                  <ol className="list-decimal list-inside text-green-700 space-y-1 text-sm">
                    <li>Open your mobile money app</li>
                    <li>Select "Send Money" or "Transfer"</li>
                    <li>Enter the phone number above</li>
                    <li>Enter the amount you wish to give</li>
                    <li>Use "Giving" as reference</li>
                    <li>Complete the transaction</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          <p>Thank you for your generous giving. Your support helps us spread God's love and continue our mission work.</p>
          <p className="mt-2">For any issues, please contact: agghfoga.pedu@gmail.com | +233 24 039 5732</p>
        </div>
      </div>
    </div>
  );
}