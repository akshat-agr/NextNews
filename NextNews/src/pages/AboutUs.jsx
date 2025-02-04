import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Akshat Agarwal",
    position: "AI Engineer",
    image: "https://www.google.com/imgres?q=single%20boy%20emoji&imgurl=https%3A%2F%2Fimgproxy.attic.sh%2Funsafe%2Frs%3Afit%3A540%3A540%3A1%3A1%2Ft%3A1%3AFF00FF%3Afalse%3Afalse%2FaHR0cHM6Ly9hdHRp%2FYy5zaC9pOTV5OTNq%2FYjAxeTJyODZpeGZ0%2FcDg3MDQyY3Nr.webp&imgrefurl=https%3A%2F%2Femojis.sh%2Femoji%2Fa-single-boy-L7EFGc9R04&docid=lUGVWzQXhV6wUM&tbnid=MZAldcLPUmGFSM&vet=12ahUKEwi-l4_n5KqLAxUp-TgGHSlEAG8QM3oECBgQAA..i&w=540&h=540&hcb=2&ved=2ahUKEwi-l4_n5KqLAxUp-TgGHSlEAG8QM3oECBgQAA", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Daksh Khandelwal",
    position: "UX/UI Designer",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    name: "Siddharth Jain",
    position: "Frontend Developer",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 4,
    name: "Arshlaan",
    position: "Backend Developer",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 5,
    name: "Kartik",
    position: "Product Manager",
    image: "https://via.placeholder.com/80",
  },
];

const AboutUs = () => {
  return (
    <div id="about" className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-[#3B0764] rounded-lg p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Revolutionizing News Delivery
          </h1>
          <p className="text-white/80 text-lg">
            Combining AI and journalism for a personalized news experience
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#4A044E] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80">
              To democratize news access through AI-powered personalization
              while maintaining the highest standards of journalistic integrity.
            </p>
          </div>
          <div className="bg-[#4A044E] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white/80">
              Creating a future where everyone has access to reliable,
              personalized news delivery through innovative AI technology.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-[#3B0764] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#4A044E] p-4 rounded-lg text-white text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-white"
                />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-white/60">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
