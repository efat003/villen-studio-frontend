// src/components/home/Newsletter.js - FUTURISTIC VILLEN VERSION
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const canvasRef = useRef(null);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = isHovered ? 80 : 40;

    // Clear existing particles if count changes
    if (particles.length > particleCount) {
      particles.length = particleCount;
    }

    // Add new particles if needed
    for (let i = particles.length; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * (isHovered ? 1.5 : 0.8),
        speedY: (Math.random() - 0.5) * (isHovered ? 1.5 : 0.8),
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
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

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [isHovered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className="relative py-24 bg-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Holographic Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Quantum Energy Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* System Header */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 mb-8"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-mono tracking-widest text-green-400">
            NEURAL NETWORK CONNECTION
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            JOIN THE QUANTUM NETWORK
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Access exclusive neural fashion insights, quantum deals, and early prototype releases
          before they enter the public matrix
        </motion.p>

        <AnimatePresence mode="wait">
          {isSubscribed ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="bg-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-400/30 max-w-md mx-auto"
              style={{
                boxShadow: '0 0 60px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-4xl mb-4"
              >
                🎯
              </motion.div>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                QUANTUM CONNECTION ESTABLISHED
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-cyan-300 font-mono text-sm"
              >
                Welcome to the Villen neural network. Quantum updates incoming.
              </motion.p>
              
              {/* Progress Bar */}
              <motion.div
                className="mt-6 h-1 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              >
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" />
              </motion.div>
            </motion.div>
          ) : (
            /* Subscription Form */
            <motion.form
              key="form"
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="relative">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="ENTER NEURAL ADDRESS (EMAIL)"
                  className="w-full px-8 py-6 bg-black/50 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 font-mono text-lg tracking-wide focus:outline-none focus:border-cyan-400 transition-all duration-500"
                  required
                  animate={{
                    borderColor: isFocused 
                      ? ['rgba(34, 211, 238, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(34, 211, 238, 0.5)']
                      : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isFocused 
                      ? '0 0 30px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)'
                      : '0 0 0px rgba(34, 211, 238, 0)'
                  }}
                  transition={{ duration: 2, repeat: isFocused ? Infinity : 0 }}
                  style={{
                    textShadow: isFocused ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none'
                  }}
                />
                
                {/* Input Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    opacity: isFocused ? 1 : 0
                  }}
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                    boxShadow: 'inset 0 0 50px rgba(34, 211, 238, 0.05)'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-6 rounded-2xl font-bold text-lg tracking-widest uppercase overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  background: 'linear-gradient(45deg, #06b6d4, #8b5cf6)'
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.5)',
                    '0 0 20px rgba(34, 211, 238, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">INITIATE QUANTUM SYNC</span>
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                />
                
                {/* Border Animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={{
                    borderColor: [
                      'rgba(34, 211, 238, 0.5)',
                      'rgba(168, 85, 247, 0.5)',
                      'rgba(34, 211, 238, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(45deg, #06b6d4, #8b5cf6) border-box',
                    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Text */}
        <motion.div
          variants={itemVariants}
          className="mt-12 space-y-4"
        >
          <motion.p
            className="text-gray-400 text-sm font-mono tracking-wide"
            animate={{
              textShadow: ['0 0 0px #fff', '0 0 10px rgba(34, 211, 238, 0.5)', '0 0 0px #fff']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔒 QUANTUM-ENCRYPTED COMMUNICATIONS • ZERO SPAM PROTOCOL • NEURAL OPT-OUT AVAILABLE
          </motion.p>
          
          <motion.div
            className="flex justify-center items-center gap-6 text-xs text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>SYSTEM SECURE</span>
            </div>
            <div>•</div>
            <div>VILLEN NETWORK v2.4</div>
            <div>•</div>
            <div>QUANTUM ENCRYPTION: ACTIVE</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Scan Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default Newsletter;