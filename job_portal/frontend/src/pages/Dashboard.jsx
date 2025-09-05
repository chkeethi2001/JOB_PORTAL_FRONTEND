// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import API, {
//   fetchJobsAPI,
//   updateApplicationStatusAPI,
// } from "../api/axiosAPI";
import { toast } from "react-toastify";
import API ,{fetchJobsAPI,updateApplicationStatusAPI}from "../api/axiosAPI";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({}); // 🆕 Track status update loading per app

  const { user, token } = useSelector((state) => state.auth);

  // 🔹 Capitalize status strings
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // 🔹 Style status
  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600 font-semibold";
      case "rejected":
        return "text-red-600 font-semibold";
      default:
        return "text-yellow-600 font-semibold";
    }
  };

  // 🔹 Fetch jobs/applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (user?.role === "seeker") {
          const res = await API.get("/applications/my", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobs(res.data.applications || []);
        } else {
          const res = await fetchJobsAPI();
          const jobsList = res.data.data || [];
          setJobs(jobsList);

          const applicantsData = {};
          await Promise.all(
            jobsList.map(async (job) => {
              try {
                const resApp = await API.get(`/applications/job/${job._id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                applicantsData[job._id] = resApp.data.applications || [];
              } catch {
                applicantsData[job._id] = [];
              }
            })
          );
          setApplications(applicantsData);
        }
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.role, token]);

  // 🔹 Update applicant status
  const handleUpdateStatus = async (appId, status, jobId) => {
    try {
      setUpdating((prev) => ({ ...prev, [appId]: true }));

      const res = await updateApplicationStatusAPI(appId, status);
      const updatedApp = res.data.application;

      setApplications((prev) => ({
        ...prev,
        [jobId]: prev[jobId].map((app) =>
          app._id === appId ? updatedApp : app
        ),
      }));

      toast.success(`Application ${capitalize(status)}`);
    } catch (error) {
      console.error("❌ Error updating application status:", error);
      toast.error("Error updating status");
    } finally {
      setUpdating((prev) => ({ ...prev, [appId]: false }));
    }
  };

  // 🔹 Render loading or error state
  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* 🔹 Job Seeker View */}
      {user?.role === "seeker" ? (
        jobs.length === 0 ? (
          <p className="text-gray-600">You haven’t applied for any jobs yet.</p>
        ) : (
          jobs.map((app) => (
            <div
              key={app._id}
              className="border rounded p-4 shadow mb-3 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{app.job?.title}</h3>
                <p className="text-gray-600">{app.job?.company}</p>
                <p className="text-sm text-gray-500">{app.job?.location}</p>
                <p>
                  Status:{" "}
                  <span className={getStatusClass(app.status)}>
                    {capitalize(app.status)}
                  </span>
                </p>
              </div>

              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  View Resume
                </a>
              )}
            </div>
          ))
        )
      ) : (
        // 🔹 Recruiter/Admin View
        <>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="border rounded p-4 shadow mb-5">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>

                <h4 className="mt-3 font-semibold">Applicants:</h4>
                {applications[job._id]?.length > 0 ? (
                  applications[job._id].map((app) => (
                    <div
                      key={app._id}
                      className="border p-3 rounded mb-2 flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>{app.applicant?.name}</strong>
                        </p>
                        <p>{app.applicant?.email}</p>
                        <p>
                          Status:{" "}
                          <span className={getStatusClass(app.status)}>
                            {capitalize(app.status)}
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            Resume
                          </a>
                        )}

                        <button
                          onClick={() =>
                            handleUpdateStatus(app._id, "accepted", job._id)
                          }
                          disabled={updating[app._id]}
                          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                        >
                          {updating[app._id] ? "Accepting..." : "Accept"}
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateStatus(app._id, "rejected", job._id)
                          }
                          disabled={updating[app._id]}
                          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                        >
                          {updating[app._id] ? "Rejecting..." : "Reject"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No applicants yet.</p>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
