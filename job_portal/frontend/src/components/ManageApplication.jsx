import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../api/axiosAPI";
import { fetchApplications, updateApplicationStatus, clearApplications } from "../redux/slices/applicationSlice";

export default function ManageApplications({ jobId }) {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchApplications(jobId))
        .unwrap()
        .catch((err) => toast.error(err));
    }
    return () => {
      dispatch(clearApplications());
    };
  }, [dispatch, jobId]);

  const handleUpdateStatus = (applicationId, status) => {
    dispatch(updateApplicationStatus({ applicationId, status }))
      .unwrap()
      .then(() => toast.success(`Application ${status}`))
      .catch(() => toast.error("Failed to update status"));
  };

  // Resume download stays inside component (axios call)
  const downloadResume = async (applicationId) => {
    try {
      const res = await API.get(`/applications/${applicationId}/resume`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading resume:", err);
      toast.error("Failed to download resume");
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{app.user?.name}</p>
                <p className="text-sm text-gray-500">{app.user?.email}</p>
                <p className="text-sm mt-1">
                  Status: <b>{app.status}</b>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadResume(app._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => handleUpdateStatus(app._id, "accepted")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(app._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
