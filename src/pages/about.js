// src/pages/About.js - FIXED CEO IMAGE SIZING
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import only your CEO image
import ceoImage from '../asset/images/ceo-image.jpg';

const About = () => {
  // Online images for other sections
  const designTeamImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80";
  const qualityTeamImage = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80";
  const companyBuilding = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80";
  const missionImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
  const visionImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";

  const teamMembers = [
    {
      name: "Efat Sarkar",
      position: "Founder & CEO",
      role: "Business Strategy & Management",
      image: ceoImage, // Using your actual CEO image
      description: "Leading Villen Studio with vision and dedication, managing all business operations and strategic growth.",
      expertise: ["Business Management", "Strategic Planning", "Brand Development"]
    },
    {
      name: "Design Team",
      position: "Creative Department",
      role: "Fashion Design & Innovation",
      image: designTeamImage, // Using online image
      description: "Our talented designers creating trend-setting collections for the modern Bangladeshi consumer.",
      expertise: ["Fashion Design", "Trend Analysis", "Product Development"]
    },
    {
      name: "Quality Control",
      position: "Production Team",
      role: "Manufacturing Excellence",
      image: qualityTeamImage, // Using online image
      description: "Ensuring every garment meets Villen Studio's premium quality standards and customer expectations.",
      expertise: ["Quality Assurance", "Production Management", "Fabric Sourcing"]
    }
  ];

  const milestones = [
    { year: "2018", event: "Villen Studio Founded", description: "Started as a small boutique in Dhaka" },
    { year: "2019", event: "First Collection Launch", description: "Introduced premium men's wear line" },
    { year: "2020", event: "Women's Collection Added", description: "Expanded to complete fashion house" },
    { year: "2021", event: "National Recognition", description: "Became trusted brand across Bangladesh" },
    { year: "2022", event: "Digital Expansion", description: "Launched e-commerce platform" },
    { year: "2023", event: "Retail Network", description: "Expanded to multiple cities in Bangladesh" }
  ];

  const values = [
    {
      icon: "💎",
      title: "Premium Quality",
      description: "We use only the finest fabrics and materials, ensuring every piece meets international quality standards."
    },
    {
      icon: "🎯",
      title: "Bangladeshi Craftsmanship",
      description: "Proudly supporting local artisans and preserving traditional Bangladeshi textile heritage."
    },
    {
      icon: "🌱",
      title: "Sustainable Fashion",
      description: "Committed to ethical manufacturing processes and environmentally conscious practices."
    },
    {
      icon: "👑",
      title: "Customer First",
      description: "Dedicated to providing exceptional service and building lasting relationships with our customers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-slate-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Villen Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A Premier Fashion Destination from Bangladesh, Redefining Style with Quality and Elegance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Our <span className="text-purple-600">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong>Villen Studio</strong>, a distinguished part of <strong>Villen Apparels</strong>, 
                  emerged as a beacon of quality fashion in Bangladesh's vibrant textile industry. 
                  Founded with a vision to blend contemporary style with traditional craftsmanship, 
                  we've grown from a local boutique to a trusted national brand.
                </p>
                <p>
                  Under the dynamic leadership of our CEO <strong>Efat Sarkar</strong>, Villen Studio 
                  has revolutionized the fashion landscape in Bangladesh. His relentless dedication 
                  and hands-on approach in managing all business operations have been instrumental 
                  in our journey towards excellence.
                </p>
                <p>
                  We take pride in our Bangladeshi heritage while embracing global fashion trends, 
                  creating collections that resonate with the modern, style-conscious individual 
                  who values quality, comfort, and sophistication.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Company Image Section */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src={companyBuilding} 
                  alt="Villen Studio Company Building" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Villen Apparels</h3>
                  <p className="text-purple-200">
                    Our state-of-the-art facility in Dhaka, Bangladesh
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years in Business</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cities Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-purple-600">Purpose</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Driving fashion innovation while staying true to our Bangladeshi roots
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src={missionImage} 
                alt="Our Mission - Fashion Innovation" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-200 max-w-md">
                  To provide premium, affordable fashion that celebrates Bangladeshi craftsmanship 
                  while meeting international quality standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src={visionImage} 
                alt="Our Vision - Global Recognition" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-200 max-w-md">
                  To become Bangladesh's most trusted fashion brand, recognized globally for 
                  quality, innovation, and ethical practices.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do at Villen Studio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-purple-600">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the dedicated team behind Villen Studio's success story
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      member.name === "Efat Sarkar" ? "object-top" : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-purple-600 font-semibold mb-1">{member.position}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.role}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CEO Special Mention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white text-center relative overflow-hidden"
          >
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-20">
              <img 
                src={ceoImage} 
                alt="Efat Sarkar - CEO" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30 object-top"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Special Recognition</h3>
            <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed relative z-10">
              Under the exceptional leadership of <strong>Efat Sarkar</strong>, Villen Studio has 
              achieved remarkable growth through his hands-on management style and unwavering 
              commitment to excellence. His dedication to every aspect of the business, from 
              strategic planning to daily operations, has been the cornerstone of our success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-purple-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Milestones in Villen Studio's growth story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-200 dark:bg-purple-800 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Villen Studio</span> Family
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect blend of Bangladeshi heritage and contemporary fashion. 
              Discover why thousands trust Villen Studio for their style needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center gap-3"
              >
                <span>Explore Collections</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link
                to="/contact"
                className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white transform hover:-translate-y-1 flex items-center gap-3"
              >
                <span>Get In Touch</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-purple-200/70 mt-8"
            >
              Proudly Made in Bangladesh • Premium Quality Guarantee • Nationwide Delivery
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;