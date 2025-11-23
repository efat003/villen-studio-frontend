// src/components/home/BannerSlider.js - ULTRA FUTURISTIC VILLEN VERSION
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [energyLevel, setEnergyLevel] = useState(100);
  const canvasRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "QUANTUM WEAVE",
      subtitle: "NEURAL INTERFACE FABRIC",
      description: "Bio-luminescent fibers with AI-powered adaptive texture technology",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "ACTIVATE PROTOCOL",
      link: "/women",
      badge: "SYSTEM ONLINE",
      tech: ["NEURAL SYNC", "QUANTUM THREAD", "BIO-LUMINESCENT"],
      color: "purple",
      energy: 95
    },
    {
      id: 2,
      title: "CYBERNETIC MESH",
      subtitle: "AUGMENTED PERFORMANCE SYSTEM",
      description: "Self-healing nano-fibers with integrated biometric sensors",
      image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "ENGAGE SYSTEM",
      link: "/men",
      badge: "PERFORMANCE MODE",
      tech: ["NANO-REPAIR", "BIO-METRIC", "THERMAL REG"],
      color: "blue",
      energy: 87
    },
    {
      id: 3,
      title: "HYPER-LINK GEAR",
      subtitle: "HOLOGRAPHIC INTERFACE NETWORK",
      description: "Quantum-entangled accessories with neural command integration",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "CONNECT MATRIX",
      link: "/accessories",
      badge: "NETWORK ACTIVE",
      tech: ["QUANTUM LINK", "HOLO-UI", "NEURAL CMD"],
      color: "cyan",
      energy: 92
    },
    {
      id: 4,
      title: "KINETIC CORE",
      subtitle: "ADAPTIVE MOBILITY SYSTEM",
      description: "Gravity-defying footwear with kinetic energy conversion",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "INITIATE BOOT",
      link: "/shoes",
      badge: "KINETIC ACTIVE",
      tech: ["GRAVITY DEFY", "ENERGY CONVERT", "ADAPTIVE FIT"],
      color: "emerald",
      energy: 88
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
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Mouse tracking for advanced parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Energy pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel(prev => (prev > 10 ? prev - 1 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto slide every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: { primary: '#a855f7', secondary: '#c084fc', glow: '#e879f9' },
      blue: { primary: '#3b82f6', secondary: '#60a5fa', glow: '#93c5fd' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', glow: '#67e8f9' },
      emerald: { primary: '#10b981', secondary: '#34d399', glow: '#6ee7b7' }
    };
    return colors[color] || colors.purple;
  };

  // Holographic Grid Component
  const HolographicGrid = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
        }}
      />
    </div>
  );

  // Energy Orb Component
  const EnergyOrb = ({ level, color }) => (
    <div className="relative w-4 h-20 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
      <motion.div
        className={`w-full rounded-full`}
        style={{
          background: `linear-gradient(to top, ${color}, ${color}dd)`,
          height: `${level}%`
        }}
        initial={{ height: 0 }}
        animate={{ height: `${level}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
    </div>
  );

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
      <HolographicGrid />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          {/* Background with Advanced Parallax */}
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
              className="absolute inset-0 opacity-70"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${getColorClasses(slides[currentSlide].color).primary}22, transparent 50%),
                            radial-gradient(circle at 70% 30%, ${getColorClasses(slides[currentSlide].color).secondary}11, transparent 50%)`
              }}
            />
            
            {/* Data Stream Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[size:100px_100px] animate-pulse" />
          </motion.div>

          {/* Cyber Interface Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner Terminals */}
            <div className="absolute top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-cyan-400 opacity-60">
              <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 animate-pulse" />
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 border-r-2 border-t-2 border-purple-400 opacity-60">
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-4 w-32 h-32 border-l-2 border-b-2 border-blue-400 opacity-60">
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 animate-pulse" />
            </div>
            <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-emerald-400 opacity-60">
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Cyber Content */}
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
                    className="flex items-center gap-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-mono tracking-widest text-green-400">
                      {slides[currentSlide].badge}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-xs text-gray-400">PWR</span>
                      <EnergyOrb level={slides[currentSlide].energy} color={getColorClasses(slides[currentSlide].color).primary} />
                    </div>
                  </motion.div>

                  {/* Quantum Title */}
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.2 }}
                    className="text-6xl md:text-8xl font-black leading-none tracking-tighter"
                  >
                    <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      {slides[currentSlide].title.split(' ')[0]}
                    </span>
                    <br />
                    <span 
                      className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
                      style={{
                        textShadow: `0 0 30px ${getColorClasses(slides[currentSlide].color).glow}`
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
                    className="text-2xl md:text-3xl font-light tracking-widest uppercase text-gray-300"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>

                  {/* Tech Description */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="text-lg text-gray-400 leading-relaxed max-w-lg font-mono"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-wrap gap-3"
                  >
                    {slides[currentSlide].tech.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.7 + index * 0.1 }}
                        className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/20"
                      >
                        <span className="text-sm font-mono text-cyan-300">{tech}</span>
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
                        className="group relative inline-flex items-center gap-4 bg-black/50 backdrop-blur-xl border-2 border-white/30 text-white px-12 py-6 rounded-xl font-bold text-lg tracking-widest uppercase overflow-hidden"
                      >
                        <span className="relative z-10">{slides[currentSlide].cta}</span>
                        <motion.span
                          className="relative z-10"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ⚡
                        </motion.span>
                        
                        {/* Animated Border */}
                        <div 
                          className="absolute inset-0 border-2 border-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      
                      <div className="relative z-10 space-y-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-2 font-mono">SYSTEM STATUS</div>
                          <div className="text-cyan-300 text-sm">VILLEN QUANTUM NETWORK</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "NEURAL SYNC", value: "ACTIVE", color: "green" },
                            { label: "QUANTUM LINK", value: "STABLE", color: "blue" },
                            { label: "BIO-METRICS", value: "ONLINE", color: "purple" },
                            { label: "ENERGY CORE", value: `${energyLevel}%`, color: "cyan" }
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
                          <div className="text-xs font-mono text-green-400 mb-2">DATA STREAM:</div>
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
                      className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-purple-500 blur-xl"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-cyan-500 blur-xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Binary Rain Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none overflow-hidden">
            <div className="flex justify-between px-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="text-xs font-mono text-green-400/60"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 20, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quantum Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-2xl rounded-2xl p-5 transition-all duration-500 z-20 border border-white/20 hover:border-cyan-400/50 group"
      >
        <svg className="w-7 h-7 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/50"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-2xl rounded-2xl p-5 transition-all duration-500 z-20 border border-white/20 hover:border-purple-400/50 group"
      >
        <svg className="w-7 h-7 text-white group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-2xl border border-purple-400/0 group-hover:border-purple-400/50"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
      </button>

      {/* Quantum Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <motion.div
              className={`w-16 h-1 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? `bg-gradient-to-r from-${slide.color}-400 to-${slide.color}-600 shadow-lg shadow-${slide.color}-500/50` 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scaleY: 2 }}
            />
            <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 font-mono text-xs transition-all duration-300 ${
              index === currentSlide 
                ? `text-${slide.color}-400 opacity-100` 
                : 'text-white/30 opacity-0 group-hover:opacity-100'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </button>
        ))}
      </div>

      {/* Energy Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20 backdrop-blur-sm">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-lg shadow-cyan-400/50"
        />
      </div>

      {/* System Clock */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20">
          <div className="text-white font-mono text-sm">
            <div>SLIDE: {String(currentSlide + 1).padStart(2, '0')}/{slides.length}</div>
            <div className="text-cyan-300 text-xs">VILLEN OS v2.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;