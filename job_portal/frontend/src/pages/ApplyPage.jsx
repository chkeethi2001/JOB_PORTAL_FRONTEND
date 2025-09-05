import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ApplyPage() {
  const { jobId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    percentage: "",
    address: "",
    coverLetter: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // Append jobId explicitly
      data.append("jobId", jobId);

      // Append fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          if (key === "resume") {
            data.append("resume", value); // ensure key matches backend multer field
          } else {
            data.append(key, value);
          }
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/applications/apply",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Application submitted successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        qualification: "",
        percentage: "",
        address: "",
        coverLetter: "",
        resume: null,
      });
    } catch (error) {
      console.error("❌ Error submitting application:", error.response?.data || error.message);
      alert("❌ Error submitting application. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Apply for this Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your qualification"
              required
            />
          </div>

          {/* Percentage */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Percentage %
            </label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 85"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write a brief cover letter..."
              required
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-xl p-2 cursor-pointer bg-gray-50 
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
              file:bg-blue-900 file:text-white hover:file:bg-blue-700"
              required
            />
            {formData.resume && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: <span className="font-medium">{formData.resume.name}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-800 to-blue-600 text-white 
            hover:from-blue-900 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
