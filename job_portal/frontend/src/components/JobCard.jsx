import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  MapPin,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function JobCard({ job, status, onApply, onDelete }) {
  const [bookmarked, setBookmarked] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "accepted":
        return "bg-green-600 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition duration-300 flex flex-col justify-between">
      {/* Top: Company + Bookmark */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
          <p className="text-xl font-semibold text-blue-600">{job.title}</p>

          <div className="flex gap-3 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> {job.type}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" /> {job.salary}
              </span>
            )}
          </div>
        </div>

        {/* Bookmark toggle */}
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="text-gray-500 hover:text-yellow-500 transition"
        >
          {bookmarked ? (
            <BookmarkCheck className="w-6 h-6" />
          ) : (
            <Bookmark className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Job Description Preview */}
      <p className="text-gray-700 text-sm mt-4 leading-relaxed">
        {job.description?.slice(0, 150)}...
      </p>

      {/* Bottom: Apply or Status */}
      <div className="mt-5 flex items-center gap-3">
        {status ? (
          <button
            className={`flex-1 py-2 rounded-xl font-medium cursor-default ${getStatusColor(
              status
            )}`}
            disabled
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ) : (
          <Link
            to={`/apply/${job._id}`}
            className="flex-1 bg-blue-900 text-white py-2 rounded-xl text-center hover:bg-blue-800 transition font-medium"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
}
