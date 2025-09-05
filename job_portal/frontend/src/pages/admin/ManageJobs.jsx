// src/pages/ManageJobs.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../api/axiosAPI";
import JobCard from "../../components/JobCard";


export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs
  const loadJobs = async () => {
    try {
      const { data } = await API.get("/jobs"); // Uses axiosAPI.js
      setJobs(data.data || []); // data.data because API returns { success, message, data }
    } catch (err) {
      console.error("Error loading jobs:", err);
      toast.error("Failed to load jobs");
    }
  };

  // Delete a job
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await API.delete(`/jobs/${jobId}`);
      toast.success("Job deleted");
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Jobs list */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Jobs List</h2>
          <div className="space-y-4">
            {jobs.length === 0 && (
              <p className="text-gray-500">No jobs available</p>
            )}
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        {/* Right side - Applications */}
        <div>
          {selectedJob ? (
            <ManageApplications jobId={selectedJob} />
          ) : (
            <p className="text-gray-500">Select a job to view applications</p>
          )}
        </div>
      </div>
    </div>
  );
}