import React from 'react'
import { useState } from 'react'

export default function PrayerGuide() {
  const [activeTab, setActiveTab] = useState('guide');
  const [expandedPoint, setExpandedPoint] = useState(null);

  const prayerTopics = [
    {
      id: 1,
      title: "Spiritual Growth",
      points: [
        "Pray for a deeper relationship with God",
        "Ask for wisdom in understanding Scripture",
        "Request a fresh filling of the Holy Spirit"
      ],
      scripture: "James 4:8 - 'Draw near to God and He will draw near to you.'"
    },
    {
      id: 2,
      title: "Family & Relationships",
      points: [
        "Pray for unity and love in your family",
        "Ask for healing in broken relationships",
        "Request guidance in parenting decisions"
      ],
      scripture: "Colossians 3:14 - 'And over all these virtues put on love, which binds them all together in perfect unity.'"
    },
    {
      id: 3,
      title: "Health & Healing",
      points: [
        "Pray for physical healing where needed",
        "Ask for emotional and mental wholeness",
        "Request strength for caregivers"
      ],
      scripture: "Jeremiah 30:17 - 'But I will restore you to health and heal your wounds,' declares the LORD."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedPoint(expandedPoint === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Daily <span className="text-indigo-600">Prayer</span> Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Strengthen your prayer life with guided topics and scriptures
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-white p-1">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${activeTab === 'guide' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-indigo-50'}`}
            >
              Prayer Guide
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${activeTab === 'points' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-indigo-50'}`}
            >
              Prayer Points
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'guide' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use This Guide</h2>
                <p className="text-gray-600 mb-4">
                  Follow this simple structure to enhance your prayer time. Remember, prayer is a conversation with God, not just a checklist.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                    <h3 className="font-semibold text-indigo-800 mb-2">1. Praise & Thanksgiving</h3>
                    <p className="text-gray-700">Begin by thanking God for His blessings and praising Him for who He is.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="font-semibold text-blue-800 mb-2">2. Confession</h3>
                    <p className="text-gray-700">Acknowledge your sins and receive God's forgiveness (1 John 1:9).</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h3 className="font-semibold text-purple-800 mb-2">3. Intercession</h3>
                    <p className="text-gray-700">Pray for others - family, friends, leaders, and those in need.</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-semibold text-green-800 mb-2">4. Personal Requests</h3>
                    <p className="text-gray-700">Bring your own needs before God with thanksgiving (Philippians 4:6).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Prayer Focus for Today</h2>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Morning Prayer</h3>
                    <p className="text-gray-500">Dedicate your day to the Lord</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life." - Psalm 143:8
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105">
                  Start Prayer Timer
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {prayerTopics.map((topic) => (
              <div 
                key={topic.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${expandedPoint === topic.id ? 'ring-2 ring-indigo-500' : ''}`}
                onClick={() => toggleExpand(topic.id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{topic.title}</h2>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <svg 
                        className={`h-6 w-6 transform transition-transform duration-300 ${expandedPoint === topic.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {expandedPoint === topic.id && (
                    <div className="mt-4 space-y-4 animate-fadeIn">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-indigo-800 mb-2">Scripture</h3>
                        <p className="text-gray-700 italic">{topic.scripture}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Prayer Points:</h3>
                        <ul className="space-y-2">
                          {topic.points.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                        Save to My Prayers
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Add Custom Prayer Point</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                      placeholder="Enter prayer topic"
                    />
                  </div>
                  <div>
                    <label htmlFor="points" className="block text-sm font-medium text-gray-700">Prayer Points</label>
                    <textarea
                      id="points"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                      placeholder="Enter your prayer points (one per line)"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Save Prayer Point
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>May the Lord bless you as you seek Him in prayer.</p>
        </div>
      </div>
    </div>
  )
}