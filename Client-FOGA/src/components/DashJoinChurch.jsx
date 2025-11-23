import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function MembershipForm() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    birthDay: "",
    birthMonth: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for contact, birthDay, and birthMonth
    if ((name === "contact" || name === "birthDay" || name === "birthMonth") && !/^[0-9]*$/.test(value)) return;
    
    setFormData({ ...formData, [name]: value });
  };

  // Format phone number: remove leading 0 and add +233
  const formatPhoneNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    
    // Remove leading 0 if present
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    
    return `233${cleaned}`;
  };

  // Validate Ghana mobile number format
  const isValidGhanaNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    
    // Remove leading 0 if present for validation
    const numberToValidate = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;
    
    // Ghana numbers should be 9 digits after country code (233)
    if (numberToValidate.length !== 9) return false;
    
    // Ghana numbers typically start with 20, 24, 26, 27, 28, 29, 30, 50, 54, 55, 56, 57, 59
    const validPrefixes = ['20', '24', '26', '27', '28', '29', '30', '50', '54', '55', '56', '57', '59'];
    const prefix = numberToValidate.substring(0, 2);
    
    return validPrefixes.includes(prefix);
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, contact, email, birthDay, birthMonth } = formData;

    // Basic validation
    if (!fullname || !contact || !email || !birthDay || !birthMonth) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Ghana mobile number validation
    if (!isValidGhanaNumber(contact)) {
      setError("Please enter a valid Ghana mobile number (e.g., 0244493887)");
      return;
    }

    // Birth day validation (1-31)
    const day = parseInt(birthDay);
    if (day < 1 || day > 31) {
      setError("Please enter a valid birth day (1-31)");
      return;
    }

    // Birth month validation (1-12)
    const month = parseInt(birthMonth);
    if (month < 1 || month > 12) {
      setError("Please enter a valid birth month (1-12)");
      return;
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      const formattedContact = formatPhoneNumber(contact);
      
      const response = await fetch('/api/membership/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          fullname,
          contact: formattedContact,
          email,
          birthDay: day,
          birthMonth: month,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit membership");

      toast.success("Membership submitted successfully!");
      setFormData({
        fullname: "",
        contact: "",
        email: "",
        birthDay: "",
        birthMonth: "",
      });
    } catch (error) {
      console.error("Error submitting membership:", error);
      toast.error(error.message || "Request has already been submitted");
      window.location.href = '/re-authenticate';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Membership Application</h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">Please provide your details</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number - Simplified */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                    <span className="text-xs text-gray-500 ml-1">(Ghana mobile)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      <FaPhone className="text-gray-400 text-sm mr-2" />
                      <span className="text-gray-500 text-sm">+233</span>
                    </div>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full pl-20 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="*********"
                      maxLength="10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Enter your number without the country code (e.g., 0244493887)</p>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Birthday - Improved for mobile */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Birth Date</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          name="birthDay"
                          placeholder="DD"
                          value={formData.birthDay}
                          onChange={handleChange}
                          maxLength="2"
                          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-center"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center">Day</p>
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          name="birthMonth"
                          placeholder="MM"
                          value={formData.birthMonth}
                          onChange={handleChange}
                          maxLength="2"
                          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-center"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center">Month</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}