import { motion } from "framer-motion";

const MouseIcon = () => {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
    >
      <motion.div
        className="w-8 h-14 border-2 border-teal/50 rounded-full flex justify-center"
        animate={{
          boxShadow: [
            "0 0 0 rgba(11, 206, 188, 0)",
            "0 0 10px rgba(11, 206, 188, 0.5)",
            "0 0 0 rgba(11, 206, 188, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          className="w-1.5 h-3 bg-teal rounded-full mt-3"
          animate={{
            y: [0, 16, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MouseIcon;
