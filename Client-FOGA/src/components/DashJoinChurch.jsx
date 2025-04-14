import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import countries from "country-telephone-data"; // or your preferred country data source

export default function MembershipForm() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullname: "",
    countryCode: "+233", // Default to US
    contact: "",
    email: "",
    birthDay: "",
    birthMonth: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "contact" || name === "birthDay" || name === "birthMonth") && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const selectCountry = (code) => {
    setFormData({ ...formData, countryCode: code });
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, countryCode, contact, email, birthDay, birthMonth } = formData;

    if (!fullname || !contact || !email || !birthDay || !birthMonth) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/membership/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          fullname,
          contact: `${countryCode}${contact}`,
          email,
          birthDay: parseInt(birthDay),
          birthMonth: parseInt(birthMonth),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit membership");

      toast.success("Membership submitted successfully!");
      setFormData({
        fullname: "",
        countryCode: "+1",
        contact: "",
        email: "",
        birthDay: "",
        birthMonth: "",
      });
    } catch (error) {
      console.error("Error submitting membership:", error);
      toast.error(error.message || "Request has already been submitted");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Membership Application</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Please provide your details</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <div className="flex">
                    {/* Country Code Dropdown */}
                    <div className="relative mr-2 w-28">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full flex items-center justify-between pl-3 pr-2 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
                      >
                        <span>{formData.countryCode}</span>
                        <FaChevronDown className="text-gray-400 text-xs" />
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                          {countries.allCountries.map((country) => (
                            <div
                              key={country.iso2}
                              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => selectCountry(country.dialCode)}
                            >
                              {country.name} ({country.dialCode})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="relative flex-1">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Birth Day</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="birthDay"
                        placeholder="DD"
                        value={formData.birthDay}
                        onChange={handleChange}
                        maxLength="2"
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Birth Month</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="birthMonth"
                        placeholder="MM"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        maxLength="2"
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
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