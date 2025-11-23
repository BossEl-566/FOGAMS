import React, { useState, useEffect } from "react";
import { Button, TextInput, Modal, Card, Badge } from "flowbite-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FiUser, FiCalendar, FiCheckCircle, FiPlus, FiUsers, FiHeart } from "react-icons/fi";

export default function DashBaptismApplication() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const applicantsRes = await fetch("/api/baptism/applicants", {
        method: "GET",
      });
      const applicantsData = await applicantsRes.json();
      setApplicants(applicantsData.filter(applicant => !applicant.isBaptized)); 
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.");
      window.location.href = '/re-authenticate';
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();  
  }, []);
  
  const handleApply = async () => {
    if (!username.trim() || !age.trim()) {
      return toast.error("Please enter all fields");
    }
    if (isNaN(age) || parseInt(age) < 1 || parseInt(age) > 120) {
      return toast.error("Please enter a valid age");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/baptism/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          userID: currentUser._id, 
          age: parseInt(age) 
        }),
      });
      if (!res.ok) throw new Error();
      const newApplicant = await res.json();
      setApplicants([...applicants, newApplicant]);
      setUserName("");
      setAge("");
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Failed to submit application. Please try again.");
      window.location.href = '/re-authenticate';
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBaptize = async () => {
    if (!applicantId) return;
    try {
      const res = await fetch(`/api/baptism/baptize/${applicantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setApplicants(applicants.filter((applicant) => applicant._id !== applicantId));
      toast.success("User has been baptized!");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to baptize applicant. Please try again.");
    }
  };

  const openBaptismModal = (id) => {
    setApplicantId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FiHeart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Baptism Application
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Journey of faith and renewal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Application Form for Non-Baptized Users */}
        {!applicants.some(app => app.userID === currentUser._id) && (
          <Card className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <FiPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Apply for Baptism
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <TextInput 
                  type="text" 
                  placeholder="Enter your full name"
                  value={username} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age
                </label>
                <TextInput 
                  type="number" 
                  placeholder="Enter your age"
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  className="w-full"
                />
              </div>
              
              <Button 
                gradientDuoTone="purpleToBlue" 
                onClick={handleApply}
                disabled={isSubmitting || !username.trim() || !age.trim()}
                className="w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FiCheckCircle className="w-4 h-4" />
                    <span>Submit Application</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Application Info */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <FiHeart className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Baptism Application
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                    Your application will be reviewed by church administration. 
                    You'll be contacted for the next steps.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Already Applied Message */}
        {applicants.some(app => app.userID === currentUser._id) && (
          <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-3">
              <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Application Submitted
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your baptism application has been received. The church administration will contact you soon.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Admin Panel */}
        {currentUser.isAdmin && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FiUsers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Baptism Applications
                </h2>
              </div>
              <Badge color="blue" className="px-3 py-1">
                {applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'}
              </Badge>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : applicants.length === 0 ? (
              <div className="text-center py-8">
                <FiUsers className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                  No applications yet
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Baptism applications will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {applicants.map((applicant) => (
                  <div 
                    key={applicant._id} 
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {applicant.username}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCalendar className="w-3 h-3" />
                          <span>{applicant.age} years old</span>
                        </div>
                        {applicant.createdAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Applied on {new Date(applicant.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button 
                        gradientDuoTone="greenToBlue" 
                        size="sm"
                        onClick={() => openBaptismModal(applicant._id)}
                        className="ml-3 flex-shrink-0"
                      >
                        <FiCheckCircle className="w-4 h-4 mr-1" />
                        Baptize
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Baptism Confirmation Modal */}
      <Modal 
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FiHeart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Confirm Baptism</span>
          </div>
        </Modal.Header>
        <Modal.Body className="py-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Confirm Baptism
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Are you sure this person has been baptized? This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              color="gray" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              gradientDuoTone="greenToBlue" 
              onClick={handleBaptize}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>Confirm Baptism</span>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}