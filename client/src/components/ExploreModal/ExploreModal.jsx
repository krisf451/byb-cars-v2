import { motion } from 'framer-motion';
import { ExploreSearchBackdrop, ExploreSearchSelect } from '..';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ExploreModal = ({ handleClose, setCurrentPage }) => (
  <ExploreSearchBackdrop onClick={handleClose}>
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      className="relative flex items-center md:items-start justify-center md:mt-10 h-screen w-screen pointer-events-none"
    >
      <ExploreSearchSelect close={handleClose} setCurrentPage={setCurrentPage} />
    </motion.div>
  </ExploreSearchBackdrop>
);

export default ExploreModal;
