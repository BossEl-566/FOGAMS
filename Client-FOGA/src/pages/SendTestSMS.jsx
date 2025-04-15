import React from 'react';

export default function SendTestSMS() {
  const sendSMS = async () => {
    console.log(new Date().getMonth);
    try {
      const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
        method: "POST",
        headers: {
          "api-key": "S1JQWnlSQkR2YlN4WW5iaEdQUU0", // Replace with your real Arkesel API key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "FOGA_PEDU", // Replace with your approved sender ID
          message: "Happy Birthday from FOGA Church!",
          recipients: ["0594538949"], // Replace with a valid phone number like "233245123456"
        }),
      });

      const result = await response.json();
      console.log("SMS Response:", result);
      alert("Message sent! Check console for response.");
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={sendSMS}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Send Test SMS
      </button>
    </div>
  );
}
