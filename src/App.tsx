/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import AffiliateCenter from './pages/AffiliateCenter';
import Earnings from './pages/Earnings';
import AffiliateOrders from './pages/AffiliateOrders';
import Withdraw from './pages/Withdraw';
import Inbox from './pages/Inbox';
import AffiliateCommissionRules from './pages/AffiliateCommissionRules';
import Toolkit from './pages/Toolkit';
import Promote from './pages/Promote';
import ResultsOverview from './pages/ResultsOverview';
import Notifications from './pages/Notifications';
import EarningsHistory from './pages/EarningsHistory';
import MessageDetail from './pages/MessageDetail';
import NotificationList from './pages/NotificationList';
import BottomNav from './components/BottomNav';
import PullToRefresh from './components/PullToRefresh';
import { MessageProvider } from './context/MessageContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pb-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-500">Coming soon</p>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MessageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/affiliate-center" element={<AffiliateCenter />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/earnings-history" element={<EarningsHistory />} />
              <Route path="/affiliate-orders" element={<AffiliateOrders />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/message/:id" element={<MessageDetail />} />
              <Route path="/notifications/:type" element={<NotificationList />} />
              <Route path="/affiliate-commission-rules" element={<AffiliateCommissionRules />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/promote" element={<Promote />} />
              <Route path="/results-overview" element={<ResultsOverview />} />
              <Route path="/notifications" element={<Notifications />} />
              
              {/* Placeholders */}
              <Route path="/shop" element={<Placeholder title="Toko" />} />
              <Route path="/manage-products" element={<Placeholder title="Kelola Produk" />} />
            </Routes>
          </BrowserRouter>
        </MessageProvider>
      </DataProvider>
    </AuthProvider>
  );
}

