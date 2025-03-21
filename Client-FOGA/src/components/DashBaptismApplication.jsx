import React, { useState, useEffect } from "react";
import { Button, TextInput, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function DashBaptismApplication() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantId, setApplicantId] = useState(null);

  
    const fetchData = async () => {
  
      try {
        const applicantsRes = await fetch("/api/baptism/applicants", {
          method: "GET",
        });
        const applicantsData = await applicantsRes.json();
        setApplicants(applicantsData.filter(applicant => !applicant.isBaptized)); 
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
      }
    };
    
    useEffect(() => {
        fetchData();  
    }, []);
    

  const handleApply = async () => {
    if (!username || !age) return toast.error("Please enter all fields");

    try {
      const res = await fetch("/api/baptism/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, userID: currentUser._id, age }),
      });
      if (!res.ok) throw new Error();
      const newApplicant = await res.json();
      setApplicants([...applicants, newApplicant]);
      setUserName("");
      setAge("");
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Failed to submit application. Please try again.");
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Baptism Application</h1>

        {!applicants.isBaptized && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Apply for Baptism</h2>
            <div className="space-y-4">
              <TextInput type="text" placeholder="Name" value={username} onChange={(e) => setUserName(e.target.value)} />
              <TextInput type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
              <Button gradientDuoTone="purpleToBlue" onClick={handleApply}>Apply</Button>
            </div>
          </div>
        )}

        {currentUser.isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
            <h3 className="text-lg font-semibold mb-2">Applicants</h3>
            <ul className="space-y-2">
              {applicants.length ? applicants.map((applicant) => (
                <li key={applicant._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div>
                    <p>{applicant.username}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.age} years old</p>
                  </div>
                  <Button gradientDuoTone="purpleToBlue" onClick={() => { setIsModalOpen(true); setApplicantId(applicant._id); }}>Baptize</Button>
                </li>
              )) : <p className="text-gray-600 dark:text-gray-400">No applicants yet.</p>}
            </ul>
          </div>
        )}
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Confirm Baptism</Modal.Header>
        <Modal.Body>
          <p className="text-gray-900 dark:text-white">Are you sure you want to baptize this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button gradientDuoTone="purpleToBlue" onClick={handleBaptize}>Confirm Baptism</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
