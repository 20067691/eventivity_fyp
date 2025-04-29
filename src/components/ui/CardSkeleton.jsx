// /ui/CardSkeleton.jsx
// This component is a skeleton loader for a card-like UI element.
// It uses the Framer Motion library to create a gradient background animation.

import { motion } from "framer-motion";
import React from "react";

export default function Skeleton() {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-full h-[150px] rounded-lg bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 bg-dot-black/[0.2]"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
}