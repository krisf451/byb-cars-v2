import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ExploreCars, ExploreModal } from '../../components';

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="relative h-auto px-[10%] py-6 scroll-smooth">
      <ExploreCars toggleModal={toggleModal} currentPage={currentPage} setCurrentPage={setCurrentPage} isModalOpen={isModalOpen} />
      <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null}>
        {isModalOpen && <ExploreModal isModalOpen={isModalOpen} handleClose={toggleModal} setCurrentPage={setCurrentPage} />}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
