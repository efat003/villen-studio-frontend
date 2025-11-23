// src/admin/components/StatsCard.js
import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color, description }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800', 
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`rounded-xl p-6 border-2 ${colorClasses[color]} shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className="text-xs opacity-70 mt-1">{description}</p>
        </div>
        <div className="text-3xl opacity-80">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;