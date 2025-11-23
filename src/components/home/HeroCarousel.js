// src/components/home/HeroCarousel.js - FUTURISTIC VILLEN VERSION
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "QUANTUM NEXUS",
      subtitle: "NEURAL FABRIC TECHNOLOGY",
      description: "Bio-adaptive materials with AI-powered texture synthesis",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      hoverImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200",
      cta: "ACTIVATE SYSTEM",
      link: "/women",
      color: "purple",
      particles: 80,
      tech: ["NEURAL WEAVE", "QUANTUM SYNC", "BIO-LUMINOUS"]
    },
    {
      id: 2,
      title: "CYBERNETIC CORE",
      subtitle: "AUGMENTED PERFORMANCE GEAR",
      description: "Integrated biometric sensors with neural command interface",
      image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=1200",
      hoverImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200",
      cta: "ENGAGE PROTOCOL",
      link: "/men",
      color: "blue",
      particles: 65,
      tech: ["NANO-MESH", "BIO-TRACK", "THERMAL REG"]
    },
    {
      id: 3,
      title: "HYPER-LINK MATRIX",
      subtitle: "HOLOGRAPHIC INTERFACE SYSTEM",
      description: "Quantum-entangled accessories with multi-dimensional display",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200",
      hoverImage: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1200",
      cta: "CONNECT NETWORK",
      link: "/accessories",
      color: "cyan",
      particles: 55,
      tech: ["QUANTUM ENTANGLE", "HOLO-UI", "NEURAL CMD"]
    },
    {
      id: 4,
      title: "KINETIC EVOLUTION",
      subtitle: "GRAVITY-DEFYING MOBILITY",
      description: "Self-adjusting architecture with kinetic energy conversion",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200",
      hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200",
      cta: "INITIATE BOOT",
      link: "/shoes",
      color: "emerald",
      particles: 70,
      tech: ["G-FORCE DEFY", "ENERGY CONVERT", "ADAPTIVE ARCH"]
    }
  ];

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = slides[currentSlide].particles;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: getColorClasses(slides[currentSlide].color).primary,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        particle.x += particle.speedX + mousePosition.x * 0.02;
        particle.y += particle.speedY + mousePosition.y * 0.02;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [currentSlide, mousePosition]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length]);

  const getColorClasses = (color) => {
    const colors = {
      purple: { primary: '#a855f7', secondary: '#c084fc', glow: '#e879f9' },
      blue: { primary: '#3b82f6', secondary: '#60a5fa', glow: '#93c5fd' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', glow: '#67e8f9' },
      emerald: { primary: '#10b981', secondary: '#34d399', glow: '#6ee7b7' }
    };
    return colors[color] || colors.purple;
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      className="relative h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Holographic Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          {/* Background with Parallax */}
          <motion.div 
            className="absolute inset-0"
            style={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
              scale: 1.1
            }}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Quantum Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black" />
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${getColorClasses(slides[currentSlide].color).primary}22, transparent 50%),
                            radial-gradient(circle at 70% 30%, ${getColorClasses(slides[currentSlide].color).secondary}11, transparent 50%)`
              }}
            />
          </motion.div>

          {/* Cyber Interface Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner Terminals */}
            <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-cyan-400 opacity-60">
              <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-purple-400 opacity-60">
              <div className="absolute top-2 right-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            </div>
            <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-blue-400 opacity-60">
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-emerald-400 opacity-60">
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="text-white space-y-8"
                >
                  {/* System Status */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/20"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-mono tracking-widest text-green-400">
                      SYSTEM ONLINE
                    </span>
                    <div className="ml-auto text-xs font-mono text-gray-400">
                      VILLEN OS v2.1
                    </div>
                  </motion.div>

                  {/* Quantum Title */}
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.2 }}
                    className="text-7xl md:text-8xl font-black leading-none tracking-tighter"
                  >
                    <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      {slides[currentSlide].title.split(' ')[0]}
                    </span>
                    <br />
                    <span 
                      className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
                      style={{
                        textShadow: `0 0 40px ${getColorClasses(slides[currentSlide].color).glow}`
                      }}
                    >
                      {slides[currentSlide].title.split(' ').slice(1).join(' ')}
                    </span>
                  </motion.h1>

                  {/* Neural Subtitle */}
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-3xl md:text-4xl font-light tracking-widest uppercase text-gray-300"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>

                  {/* Tech Description */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="text-xl text-gray-400 leading-relaxed max-w-2xl font-mono"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-wrap gap-4"
                  >
                    {slides[currentSlide].tech.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.7 + index * 0.1 }}
                        className="px-5 py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/20"
                      >
                        <span className="text-lg font-mono text-cyan-300">{tech}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Cyber CTA */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="pt-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={slides[currentSlide].link}
                        className="group relative inline-flex items-center gap-6 bg-black/50 backdrop-blur-xl border-2 border-white/30 text-white px-14 py-6 rounded-2xl font-bold text-xl tracking-widest uppercase overflow-hidden"
                      >
                        <span className="relative z-10">{slides[currentSlide].cta}</span>
                        <motion.span
                          className="relative z-10"
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⚡
                        </motion.span>
                        
                        {/* Animated Border */}
                        <div 
                          className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(45deg, ${getColorClasses(slides[currentSlide].color).primary}, ${getColorClasses(slides[currentSlide].color).secondary}) border-box`,
                            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude'
                          }}
                        />
                        
                        {/* Energy Pulse */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right: Holographic Display */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  className="hidden lg:block"
                >
                  <div className="relative">
                    {/* Holographic Container */}
                    <div className="bg-black/30 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
                      {/* Holographic Grid Inside */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                      
                      <div className="relative z-10 space-y-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-2 font-mono">QUANTUM READOUT</div>
                          <div className="text-cyan-300 text-sm">VILLEN NEURAL NETWORK</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "FABRIC SYNC", value: "ACTIVE", color: "green" },
                            { label: "NEURAL LINK", value: "STABLE", color: "blue" },
                            { label: "ENERGY CORE", value: "98%", color: "purple" },
                            { label: "QUANTUM STATE", value: "ENTANGLED", color: "cyan" }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.2 + index * 0.1 }}
                              className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                            >
                              <div className={`text-sm font-mono text-${item.color}-400 mb-1`}>{item.label}</div>
                              <div className="text-lg font-bold text-white font-mono">{item.value}</div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Live Data Stream */}
                        <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/10">
                          <div className="text-xs font-mono text-green-400 mb-2">NEURAL DATA STREAM:</div>
                          <div className="space-y-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="text-xs font-mono text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 + i * 0.2 }}
                              >
                                {`> VILLEN_${slides[currentSlide].title.split(' ')[0]}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Orbs */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-purple-500 blur-xl"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-cyan-500 blur-xl"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-2xl rounded-2xl p-5 transition-all duration-500 z-20 border border-white/20 hover:border-cyan-400/50 group"
      >
        <svg className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-2xl rounded-2xl p-5 transition-all duration-500 z-20 border border-white/20 hover:border-purple-400/50 group"
      >
        <svg className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
          >
            <motion.div
              className={`w-16 h-1 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? `bg-gradient-to-r from-${slides[currentSlide].color}-400 to-${slides[currentSlide].color}-600 shadow-lg shadow-${slides[currentSlide].color}-500/50` 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scaleY: 2 }}
            />
            <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 font-mono text-xs transition-all duration-300 ${
              index === currentSlide 
                ? `text-${slides[currentSlide].color}-400 opacity-100` 
                : 'text-white/30 opacity-0 group-hover:opacity-100'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20 backdrop-blur-sm">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-lg shadow-cyan-400/50"
        />
      </div>
    </div>
  );
};

export default HeroCarousel;