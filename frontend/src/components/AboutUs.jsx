import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Akshat Agrawal",
    position: "AI/ML Engineer",
    image: "/assets/PFPs/Akshat.png",
  },
  {
    id: 2,
    name: "Daksh Khandelwal",
    position: "UI/UX Designer",
    image: "/assets/PFPs/Daksh.jpg",
  },
  {
    id: 3,
    name: "Siddharth Jain",
    position: "Frontend Developer",
    image: "/assets/PFPs/Sid.jpg",
  },
  {
    id: 4,
    name: "Arshlaan",
    position: "Backend Developer",
    image: "/assets/PFPs/Arshlaan.jpg",
  },
  {
    id: 5,
    name: "Karthik Yadav",
    position: "Product Manager",
    image: "/assets/PFPs/Karthik.jpg",
  },
];

const AboutUs = () => {
  return (
    <div
      id="about"
      className="min-h-screen bg-gradient-to-br text-white"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-10 mb-10 text-center shadow-lg">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-3">
            Revolutionizing News Delivery
          </h1>
          <p className="text-white/80 text-lg">
            Combining AI and journalism for a personalized news experience
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">Our Mission</h2>
            <p className="text-white/80">
              To democratize news access through AI-powered personalization
              while maintaining the highest standards of journalistic integrity.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">Our Vision</h2>
            <p className="text-white/80">
              Creating a future where everyone has access to reliable,
              personalized news delivery through innovative AI technology.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white/10 p-6 rounded-lg text-white text-center shadow-md transition-transform transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-white shadow-md"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-white/70">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
