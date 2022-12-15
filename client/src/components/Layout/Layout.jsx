import { Toaster } from 'react-hot-toast';
import { Nav } from '..';

const Layout = ({ children }) => (
  <div className="relative flex flex-col h-screen w-screen overflow-x-hidden bg-white dark:bg-darkBg">
    <Toaster />
    <Nav />
    <main className="h-full w-full">
      {children}
    </main>
  </div>
);

export default Layout;
