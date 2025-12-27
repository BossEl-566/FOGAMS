// components/NewMemberModal.jsx
import { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaHome, FaBriefcase, FaHeart } from 'react-icons/fa';

export default function NewMemberModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  member, 
  hearAboutUsOptions,
  maritalStatusOptions 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    residence: '',
    maritalStatus: 'Single',
    occupation: '',
    interestedInMembership: false,
    howDidYouHearAboutUs: '',
    otherSource: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        phone: member.phone || '',
        email: member.email || '',
        residence: member.residence || '',
        maritalStatus: member.maritalStatus || 'Single',
        occupation: member.occupation || '',
        interestedInMembership: member.interestedInMembership || false,
        howDidYouHearAboutUs: member.howDidYouHearAboutUs || '',
        otherSource: member.otherSource || ''
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        residence: '',
        maritalStatus: 'Single',
        occupation: '',
        interestedInMembership: false,
        howDidYouHearAboutUs: '',
        otherSource: ''
      });
    }
    setErrors({});
  }, [member, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.residence.trim()) newErrors.residence = 'Residence is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.howDidYouHearAboutUs) newErrors.howDidYouHearAboutUs = 'This field is required';
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (formData.phone && !/^[0-9]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (formData.howDidYouHearAboutUs === 'Other' && !formData.otherSource.trim()) {
      newErrors.otherSource = 'Please specify';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {member ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number *
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="0241234567"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Residence */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Residence *
              </label>
              <div className="relative">
                <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="residence"
                  value={formData.residence}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                    errors.residence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="City, Region"
                />
              </div>
              {errors.residence && (
                <p className="text-sm text-red-600">{errors.residence}</p>
              )}
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Marital Status *
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                {maritalStatusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Occupation *
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                    errors.occupation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="Software Developer"
                />
              </div>
              {errors.occupation && (
                <p className="text-sm text-red-600">{errors.occupation}</p>
              )}
            </div>
          </div>

          {/* How Did You Hear About Us */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              How did you hear about us? *
            </label>
            <select
              name="howDidYouHearAboutUs"
              value={formData.howDidYouHearAboutUs}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                errors.howDidYouHearAboutUs ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
            >
              <option value="">Select an option</option>
              {hearAboutUsOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.howDidYouHearAboutUs && (
              <p className="text-sm text-red-600">{errors.howDidYouHearAboutUs}</p>
            )}
          </div>

          {/* Other Source (only show if "Other" is selected) */}
          {formData.howDidYouHearAboutUs === 'Other' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Please specify *
              </label>
              <input
                type="text"
                name="otherSource"
                value={formData.otherSource}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-700 border ${
                  errors.otherSource ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="Please specify how you heard about us"
              />
              {errors.otherSource && (
                <p className="text-sm text-red-600">{errors.otherSource}</p>
              )}
            </div>
          )}

          {/* Interested in Membership */}
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="interestedInMembership"
                  checked={formData.interestedInMembership}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  formData.interestedInMembership ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.interestedInMembership ? 'transform translate-x-5' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              <div className="ml-3 flex items-center gap-2">
                <FaHeart className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Interested in Membership
                </span>
              </div>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}