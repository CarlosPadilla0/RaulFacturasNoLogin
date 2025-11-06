import React, { useState } from 'react';
import MainMenuPage from './components/MainMenuPage';
import InvoiceTrackingPage from './components/PolicyTrackingPage';

type Page = 'main' | 'invoices';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');

  const navigateToInvoices = () => {
    setCurrentPage('invoices');
  };

  const navigateToMain = () => {
    setCurrentPage('main');
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800">
      {currentPage === 'main' && <MainMenuPage onNavigateToInvoices={navigateToInvoices} />}
      {currentPage === 'invoices' && <InvoiceTrackingPage onBack={navigateToMain} />}
    </div>
  );
};

export default App;