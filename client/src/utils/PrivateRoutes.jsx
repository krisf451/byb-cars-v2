import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    currentUser ? <Outlet /> : <Navigate to="/auth" />
  );
};

export default PrivateRoutes;
