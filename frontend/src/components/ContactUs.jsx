import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const ContactUs = () => {
  return (
    <div id="contact" className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/10">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Message</label>
                <textarea
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-all shadow-md">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                Contact Information
              </h2>
              <div className="space-y-4 text-white/80">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span>siddharthj1405@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-blue-500" />
                  <span>+91 7014974787</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span>VIT Vellore</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/10 text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Connect With Us</h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-lg"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-lg"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-lg"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
