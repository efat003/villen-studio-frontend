// src/components/home/CategoryGrid.js - FUTURISTIC VILLEN VERSION
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "QUANTUM MENS",
      subtitle: "NEURAL INTERFACE WEAR",
      image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=600",
      hoverImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
      link: "/men",
      count: "256 PRODUCTS",
      tech: ["AI-FITTING", "BIO-METRIC", "THERMAL SYNC"],
      color: "blue",
      energy: 92
    },
    {
      id: 2,
      name: "CYBER WOMENS",
      subtitle: "ADAPTIVE FABRIC SYSTEM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      hoverImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600",
      link: "/women",
      count: "312 PRODUCTS",
      tech: ["QUANTUM WEAVE", "NEURAL SYNC", "BIO-LUMINOUS"],
      color: "purple",
      energy: 88
    },
    {
      id: 3,
      name: "KINETIC FOOTWEAR",
      subtitle: "GRAVITY-DEFYING DESIGN",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      link: "/shoes",
      count: "128 PRODUCTS",
      tech: ["ENERGY RETURN", "ADAPTIVE FIT", "SMART TRACTION"],
      color: "emerald",
      energy: 85
    },
    {
      id: 4,
      name: "HYPER ACCESSORIES",
      subtitle: "HOLOGRAPHIC INTERFACE",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
      hoverImage: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600",
      link: "/accessories",
      count: "96 PRODUCTS",
      tech: ["QUANTUM LINK", "NEURAL CMD", "HOLO-DISPLAY"],
      color: "cyan",
      energy: 90
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: { primary: '#a855f7', secondary: '#c084fc', glow: '#e879f9' },
      blue: { primary: '#3b82f6', secondary: '#60a5fa', glow: '#93c5fd' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', glow: '#67e8f9' },
      emerald: { primary: '#10b981', secondary: '#34d399', glow: '#6ee7b7' }
    };
    return colors[color] || colors.purple;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            y: -10,
            transition: { type: "spring", stiffness: 300 }
          }}
          onHoverStart={() => setHoveredCategory(category.id)}
          onHoverEnd={() => setHoveredCategory(null)}
          className="relative group cursor-pointer"
        >
          <Link to={category.link}>
            {/* Main Card Container */}
            <div 
              className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-black/40 backdrop-blur-xl"
              style={{
                boxShadow: `0 0 80px ${getColorClasses(category.color).primary}20,
                           inset 0 1px 0 ${getColorClasses(category.color).primary}30`
              }}
            >
              {/* Background Images with Transition */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Base Image */}
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  animate={{ 
                    scale: hoveredCategory === category.id ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Hover Image Overlay */}
                <motion.img
                  src={category.hoverImage}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredCategory === category.id ? 1 : 0 
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Quantum Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
                
                {/* Animated Energy Grid */}
                <motion.div 
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[size:50px_50px]"
                  animate={{ 
                    x: hoveredCategory === category.id ? 50 : 0 
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Corner Terminals */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/40" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/40" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/40" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/40" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Section - Tech Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: hoveredCategory === category.id ? 1 : 0.7,
                    y: hoveredCategory === category.id ? 0 : -10
                  }}
                  className="flex justify-between items-start"
                >
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-green-400">ONLINE</span>
                  </div>
                  
                  {/* Energy Level */}
                  <div className="text-right">
                    <div className="text-xs font-mono text-gray-400">ENERGY</div>
                    <div className="text-sm font-mono text-white font-bold">{category.energy}%</div>
                  </div>
                </motion.div>

                {/* Middle Section - Category Info */}
                <div className="space-y-3">
                  <motion.h3
                    className="text-2xl font-black tracking-tight leading-tight"
                    animate={{ 
                      color: hoveredCategory === category.id ? getColorClasses(category.color).primary : '#ffffff'
                    }}
                    style={{
                      textShadow: hoveredCategory === category.id 
                        ? `0 0 20px ${getColorClasses(category.color).glow}`
                        : 'none'
                    }}
                  >
                    {category.name}
                  </motion.h3>
                  
                  <motion.p
                    className="text-sm font-light text-gray-300 tracking-wide"
                    animate={{ 
                      opacity: hoveredCategory === category.id ? 1 : 0.8 
                    }}
                  >
                    {category.subtitle}
                  </motion.p>

                  {/* Tech Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredCategory === category.id ? 1 : 0 
                    }}
                  >
                    {category.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-black/50 backdrop-blur-sm border border-white/20 rounded-md text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom Section - CTA */}
                <motion.div
                  className="flex justify-between items-center"
                  animate={{ 
                    y: hoveredCategory === category.id ? 0 : 20,
                    opacity: hoveredCategory === category.id ? 1 : 0.8
                  }}
                >
                  <div>
                    <div className="text-sm font-mono text-gray-400">PRODUCTS</div>
                    <div className="text-lg font-bold text-white">{category.count}</div>
                  </div>
                  
                  <motion.div
                    className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: getColorClasses(category.color).primary
                    }}
                    animate={{
                      borderColor: hoveredCategory === category.id 
                        ? getColorClasses(category.color).primary 
                        : 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <motion.svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ 
                        x: hoveredCategory === category.id ? [0, 5, 0] : 0 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: hoveredCategory === category.id ? Infinity : 0 
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredCategory === category.id ? 1 : 0 
                }}
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${getColorClasses(category.color).primary}20, transparent 70%)`,
                  boxShadow: `inset 0 0 100px ${getColorClasses(category.color).primary}10`
                }}
              />

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{ 
                  borderColor: hoveredCategory === category.id 
                    ? [getColorClasses(category.color).primary, getColorClasses(category.color).secondary, getColorClasses(category.color).primary]
                    : 'rgba(255,255,255,0.1)'
                }}
                transition={{ 
                  duration: 2, 
                  repeat: hoveredCategory === category.id ? Infinity : 0 
                }}
                style={{
                  border: '2px solid',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />
            </div>

            {/* Floating Particles on Hover */}
            {hoveredCategory === category.id && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full bg-${category.color}-400`}
                    initial={{
                      x: Math.random() * 300 - 150,
                      y: Math.random() * 300 - 150,
                      opacity: 0
                    }}
                    animate={{
                      x: Math.random() * 300 - 150,
                      y: Math.random() * 300 - 150,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    style={{
                      filter: `blur(${Math.random() * 2}px)`,
                      boxShadow: `0 0 10px ${getColorClasses(category.color).primary}`
                    }}
                  />
                ))}
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryGrid;