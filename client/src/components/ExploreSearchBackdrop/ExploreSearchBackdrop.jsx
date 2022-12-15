import { motion } from 'framer-motion';

const ExploreSearchBackdrop = ({ children, onClick }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
    className="absolute z-10 inset-0 h-auto w-screen bg-black/80 flex justify-center"
  >
    {children}
  </motion.div>
);

export default ExploreSearchBackdrop;
