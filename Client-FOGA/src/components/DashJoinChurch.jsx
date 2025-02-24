import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function MembershipForm() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
  });
  console.log(formData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "contact" && !/^[0-9]*$/.test(e.target.value)) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.contact || !formData.email) {
        setError("All fields are required");
        return;
    }
    setError("");
    try {
        const response = await fetch('/api/membership/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: currentUser._id,
                fullname: formData.fullname,  // Make sure this matches the backend
                contact: formData.contact,
                email: formData.email,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to submit membership");
        }
        toast.success("Membership submitted successfully!");
        setFormData({ fullname: "", contact: "", email: "" });
    } catch (error) {
        console.error("Error submitting membership:", error);
        toast.error("Request has already been submitted");
    }
};


  return (
    <div className='max-w-lg mx-auto p-3 w-full mb-20'>
           <div className="min-h-screen flex items-center justify-center p-6 transition-all bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition duration-500 hover:scale-105 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Request to be Membership</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white" required />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white" required />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">Submit</button>
        </form>
      </div>
    </div>
    </div>

  );
}
