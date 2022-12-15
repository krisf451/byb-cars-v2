import { Routes, Route } from 'react-router-dom';

import { HomePage, PageNotFound, Auth, CarSales, Explore, CarDetails, PaymentSuccess, Profile, MyFavorites } from './pages';
import PrivateRoutes from './utils/PrivateRoutes';
import { Layout } from './components';

const App = () => (
  <Layout>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/sales" element={<CarSales />} />
        <Route path="/payment" element={<PaymentSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Layout>
);

export default App;
