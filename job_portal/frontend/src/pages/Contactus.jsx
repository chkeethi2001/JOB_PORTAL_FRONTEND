import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("✅ Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header Section */}
      <div className="py-14 px-6 text-center bg-white text-black">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          We'd love to hear from you — send us a message and we'll get back to you soon!
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Reach Out</h2>
          <p className="text-gray-700">
            Whether you have a question about features, trials, pricing, or anything else — our team is ready to answer all your questions.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition">
              <Phone className="text-blue-600 w-6 h-6" />
              <span className="text-gray-800 font-medium">+91 9900990099</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition">
              <Mail className="text-blue-600 w-6 h-6" />
              <span className="text-gray-800 font-medium">jobportal@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition">
              <MapPin className="text-blue-600 w-6 h-6" />
              <span className="text-gray-800 font-medium">Hyderabad, India</span>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-blue-300 transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 hover:shadow-lg transform transition hover:scale-[1.02]"
            >
              ✉ Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
