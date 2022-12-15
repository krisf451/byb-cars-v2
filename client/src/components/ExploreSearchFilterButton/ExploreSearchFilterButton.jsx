
import { FiSearch } from 'react-icons/fi';

const ExploreSearchFilterButton = ({ toggleModal }) => (
  <div className="relative z-10 flex rounded-md">
    <div className="flex items-center space-x-2 bg-[#f1fafb] text-[#4993fa] hover:bg-[#e4fcff] hover:text-[#407dd3] rounded-full px-4 py-1 transition-colors duration-300">
      <button type="button" onClick={toggleModal} className="rounded-full">Search</button>
      <FiSearch />
    </div>
  </div>
);

export default ExploreSearchFilterButton;
