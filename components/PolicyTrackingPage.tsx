import React, { useState } from 'react';
import type { Invoice, InvoiceStatus, DeliveryStatus } from '../types';
import { MOCK_INVOICES } from '../constants';
import { BackArrowIcon, SearchIcon, PrintIcon, MailIcon } from './icons/Icons';
import ClientDataModal from './ClientDataModal';

interface InvoiceTrackingPageProps {
  onBack: () => void;
}

const InvoiceTrackingPage: React.FC<InvoiceTrackingPageProps> = ({ onBack }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [searchType, setSearchType] = useState<'ticket' | 'saleNumber'>('ticket');
  const [searchValue, setSearchValue] = useState('');
  const [storeFilter, setStoreFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchedInvoices, setSearchedInvoices] = useState<Invoice[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewingClient, setViewingClient] = useState<Invoice | null>(null);

  const uniqueStores = [...new Set(MOCK_INVOICES.map(invoice => invoice.store))].sort((a, b) => String(a).localeCompare(String(b)));

  const handleSearch = () => {
    if (!searchValue && !storeFilter && !startDate && !endDate) {
      setSearchedInvoices([]);
      setHasSearched(true);
      return;
    }

    const results = invoices.filter(invoice => {
      const valueMatch = searchValue
        ? searchType === 'ticket'
          ? invoice.ticket.toLowerCase().includes(searchValue.toLowerCase())
          : invoice.saleNumber.toLowerCase().includes(searchValue.toLowerCase())
        : true;
      const storeMatch = storeFilter ? String(invoice.store) === storeFilter : true;
      
      let dateMatch = true;
      if (startDate || endDate) {
          const invoiceDate = new Date(invoice.saleDate + "T00:00:00");
          if (startDate) {
              const start = new Date(startDate + "T00:00:00");
              if (invoiceDate < start) dateMatch = false;
          }
          if (dateMatch && endDate) {
              const end = new Date(endDate + "T00:00:00");
              if (invoiceDate > end) dateMatch = false;
          }
      }

      return valueMatch && storeMatch && dateMatch;
    });

    setSearchedInvoices(results);
    setHasSearched(true);
  };
  
  const handleSaveChanges = (updatedInvoice: Invoice) => {
    const updatedInvoices = invoices.map(p => p.id === updatedInvoice.id ? updatedInvoice : p);
    setInvoices(updatedInvoices);

    const updatedSearchedInvoices = searchedInvoices.map(p => p.id === updatedInvoice.id ? updatedInvoice : p);
    setSearchedInvoices(updatedSearchedInvoices);
    
    if (viewingClient && viewingClient.id === updatedInvoice.id) {
        setViewingClient(updatedInvoice);
    }
  };

  const getClientShortName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Seguimiento de Facturas Motos</h1>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <BackArrowIcon className="w-5 h-5" />
                    <span>Volver</span>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                <div>
                  <label className="font-semibold text-gray-600 mb-1 block">Tipo de consulta:</label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'ticket' | 'saleNumber')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-10 bg-white"
                  >
                    <option value="ticket">Ticket</option>
                    <option value="saleNumber">Número de Venta</option>
                  </select>
                </div>
                <FilterInput 
                  label={searchType === 'ticket' ? 'Ticket:' : 'Número de Venta:'}
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder={searchType === 'ticket' ? 'Buscar por ticket...' : 'Buscar por No. Venta...'}
                />
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-600 mb-1">Tienda:</label>
                    <select
                        value={storeFilter}
                        onChange={(e) => setStoreFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-10 bg-white"
                    >
                        <option value="">Todas</option>
                        {uniqueStores.map(store => (
                            <option key={store} value={store}>{store === 800 ? "Tienda 800 (E-commerce)" : store}</option>
                        ))}
                    </select>
                </div>
                <div>
                  <label className="font-semibold text-gray-600 mb-1 block">Fecha Desde:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-10 bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 mb-1 block">Fecha Hasta:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-10 bg-white"
                  />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors h-10"
                >
                    Buscar
                </button>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="max-w-screen-xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Mobile Card Layout */}
            <div className="block md:hidden">
                {!hasSearched ? (
                    <div className="text-center py-16 text-gray-500 px-4">
                        <SearchIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-lg">Por favor, ingrese un criterio y presione "Buscar" para ver las facturas.</p>
                    </div>
                ) : searchedInvoices.length > 0 ? (
                    <div className="space-y-4 p-4">
                        {searchedInvoices.map((invoice) => (
                            <div key={invoice.id} className="bg-gray-50 rounded-lg p-4 border">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500">Ticket</p>
                                            <p className="font-semibold">{invoice.ticket}</p>
                                        </div>
                                        <StatusBadge status={invoice.status} />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">No. Venta</p>
                                            <p className="font-semibold">{invoice.saleNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Fecha Venta</p>
                                            <p className="font-semibold">{invoice.saleDate}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-gray-500">Cliente</p>
                                        <button onClick={() => setViewingClient(invoice)} className="text-blue-600 hover:underline font-semibold capitalize">
                                            {getClientShortName(invoice.clientName)}
                                        </button>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Entrega</p>
                                            <DeliveryStatusBadge status={invoice.deliveryStatus} />
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                              onClick={() => alert('se va a imprimir la factura y carta factura.')}
                                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                              title="Imprimir"
                                            >
                                                <PrintIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                              onClick={() => alert('se enviara factura y carta factura.')}
                                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                              title="Enviar"
                                            >
                                                <MailIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500 px-4">
                        <p className="text-lg font-semibold">No se encontraron facturas</p>
                        <p>Intente con otros criterios de búsqueda.</p>
                    </div>
                )}
            </div>
            
            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                    <th scope="col" className="px-6 py-3">Folio Fiscal</th>
                    <th scope="col" className="px-6 py-3">Estatus Factura</th>
                    <th scope="col" className="px-6 py-3">Ticket</th>
                    <th scope="col" className="px-6 py-3">No. Venta</th>
                    <th scope="col" className="px-6 py-3">Datos del Cliente</th>
                    <th scope="col" className="px-6 py-3">Detalles</th>
                    <th scope="col" className="px-6 py-3">Fecha Venta</th>
                    <th scope="col" className="px-6 py-3">Estatus Entrega</th>
                    <th scope="col" className="px-6 py-3">Fecha Entrega</th>
                    <th scope="col" className="px-6 py-3">Imprimir</th>
                    <th scope="col" className="px-6 py-3">Enviar a Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {!hasSearched ? (
                        <tr>
                            <td colSpan={11} className="text-center py-16 text-gray-500">
                                <SearchIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-lg">Por favor, ingrese un criterio y presione "Buscar" para ver las pólizas.</p>
                            </td>
                        </tr>
                    ) : searchedInvoices.length > 0 ? (
                        searchedInvoices.map((invoice) => (
                            <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{invoice.folioFiscal || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={invoice.status} />
                                </td>
                                <td className="px-6 py-4">{invoice.ticket}</td>
                                <td className="px-6 py-4">{invoice.saleNumber}</td>
                                <td className="px-6 py-4">
                                  <button onClick={() => setViewingClient(invoice)} className="text-blue-600 hover:underline font-semibold capitalize">
                                    {getClientShortName(invoice.clientName)}
                                  </button>
                                </td>
                                <td className="px-6 py-4 text-xs italic text-gray-500">{invoice.comments}</td>
                                <td className="px-6 py-4">{invoice.saleDate}</td>
                                <td className="px-6 py-4">
                                    <DeliveryStatusBadge status={invoice.deliveryStatus} />
                                </td>
                                <td className="px-6 py-4">{invoice.deliveryDate}</td>
                                <td className="px-6 py-4">
                                    <button
                                      onClick={() => alert('se va a imprimir la factura y carta factura.')}
                                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                      title="Imprimir factura y carta factura"
                                    >
                                        <PrintIcon className="w-5 h-5" />
                                        <span>Imprimir</span>
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                      onClick={() => alert('se enviara factura y carta factura.')}
                                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                      title="Enviar factura y carta factura por correo"
                                    >
                                        <MailIcon className="w-5 h-5" />
                                        <span>Enviar</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="text-center py-16 text-gray-500">
                                <p className="text-lg font-semibold">No se encontraron pólizas</p>
                                <p>Intente con otros criterios de búsqueda.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>
      </main>

      {viewingClient && (
        <ClientDataModal
          invoice={viewingClient}
          onClose={() => setViewingClient(null)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

interface FilterInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const FilterInput: React.FC<FilterInputProps> = ({ label, value, onChange, placeholder }) => (
    <div className="flex flex-col">
        <label className="font-semibold text-gray-600 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input 
                type="text" 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-10 bg-white text-gray-900"
            />
        </div>
    </div>
);

const DeliveryStatusBadge: React.FC<{ status: DeliveryStatus }> = ({ status }) => {
    const statusClasses: { [key in DeliveryStatus]: string } = {
        'entregada': 'bg-green-100 text-green-800',
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'cancelada': 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusClasses[status]}`}>
        {status}
        </span>
    );
};

const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  const statusClasses: { [key in InvoiceStatus]: string } = {
    'Pendiente': 'bg-purple-100 text-purple-800',
    'En proceso': 'bg-blue-100 text-blue-800',
    'Timbrada': 'bg-green-100 text-green-800',
    'Cancelada': 'bg-red-100 text-red-800',
    'Generada': 'bg-yellow-100 text-yellow-800',
    'No Generada': 'bg-orange-100 text-orange-800',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default InvoiceTrackingPage;