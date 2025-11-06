import React from 'react';
import { FurnitureIcon, ShirtIcon, ShieldIcon, ShieldCheckIcon, TrashIcon, TagIcon, InfoIcon, CheckCircleIcon, SearchIcon, GiftIcon, XCircleIcon, CatalogIcon, DocumentTextIcon } from './icons/Icons';

interface MainMenuPageProps {
  onNavigateToInvoices: () => void;
}

const InfoHeader: React.FC = () => (
  <header className="bg-blue-600 text-white p-2">
    <div className="container mx-auto">
      {/* Desktop layout */}
      <div className="hidden md:flex justify-between items-center text-sm font-semibold">
        <div>
          <span className="font-bold">Cliente:</span> Kayn Lopez
        </div>
        <div>
          <span className="font-bold">Dinero Electronico:</span> $0
        </div>
        <div>
          <span className="font-bold">Caja - Cambiar Vendedor:</span> 71 - Raúl Mireless
        </div>
      </div>
      {/* Mobile layout */}
      <div className="md:hidden space-y-1 text-xs font-semibold">
        <div className="flex justify-between">
          <span><span className="font-bold">Cliente:</span> Kayn Lopez</span>
          <span><span className="font-bold">Dinero:</span> $0</span>
        </div>
        <div className="text-center">
          <span className="font-bold">Caja:</span> 71 - Raúl Mireless
        </div>
      </div>
    </div>
  </header>
);

const TotalsPanel: React.FC = () => {
    const totals = [
        { label: 'Total Contado', value: '$0' },
        { label: 'Descuentos', value: '$0' },
        { label: 'Reembolso', value: '$0' },
        { label: 'Dinero Electrónico', value: '$0' },
        { label: 'Pago Inicial', value: '$0' },
        { label: 'Su Pago', value: '$0' },
        { label: 'Sobreprecio', value: '$0' },
        { label: 'Abono Mensual', value: '$0', icon: true },
        { label: 'Abono Mensual', value: '$0', icon: true },
        { label: 'Pago Mensual', value: '$0', icon: true },
        { label: 'Total Crédito', value: '$0' }
    ];

    return (
        <aside className="w-full md:w-64 bg-slate-800 text-white p-4 flex flex-col">
            <div className="flex-grow">
                {totals.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 border-b border-slate-700">
                        <span className="text-sm font-medium flex items-center">{item.label} {item.icon && <FurnitureIcon className="w-4 h-4 ml-2" />}</span>
                        <span className="font-semibold">{item.value}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-2 border-t-2 border-slate-600">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Artículos:</span>
                    <span>2</span>
                </div>
            </div>
        </aside>
    );
};

const MainContent: React.FC<MainMenuPageProps> = ({ onNavigateToInvoices }) => {
    return (
        <main className="flex-grow flex flex-col md:flex-row bg-gray-200">
            {/* Mobile: TotalsPanel at top, Desktop: TotalsPanel at left */}
            <div className="md:hidden">
                <TotalsPanel />
            </div>
            <div className="hidden md:block">
                <TotalsPanel />
            </div>
            
            <div className="flex-grow p-4 flex flex-col lg:flex-row">
                <section className="w-full lg:w-3/5 lg:pr-4 mb-4 lg:mb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full min-h-[200px] lg:min-h-full">
                      {/* Empty space for articles */}
                    </div>
                </section>
                <section className="w-full lg:w-2/5 lg:pl-4 flex flex-col">
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex-grow">
                        <h2 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-4">Agregar Artículos</h2>
                        <div className="text-center mb-6">
                            <span className="font-semibold text-gray-600">Muebles | Ropa</span>
                            <button disabled className="w-full mt-2 py-2 md:py-3 text-base md:text-lg bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-400 cursor-not-allowed">
                                Escanear SKU
                            </button>
                        </div>
                        <div>
                           <h3 className="text-base md:text-lg font-semibold text-center text-gray-700 mb-4">Captura Manual</h3>
                           <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 text-center justify-items-center">
                               <ActionButton icon={<FurnitureIcon className="w-6 h-6 md:w-8 md:h-8"/>} label="Muebles" disabled/>
                               <ActionButton icon={<ShirtIcon className="w-6 h-6 md:w-8 md:h-8"/>} label="Ropa" disabled/>
                               <ActionButton icon={<ShieldIcon className="w-6 h-6 md:w-8 md:h-8"/>} label="Seguros y Servicios" disabled/>
                               <ActionButton icon={<ShieldCheckIcon className="w-6 h-6 md:w-8 md:h-8"/>} label="Seguimiento de Facturas Motos" onClick={onNavigateToInvoices}/>
                           </div>
                        </div>
                    </div>
                    <div className="mt-4">
                       <button disabled className="w-full flex items-center justify-center gap-2 py-2 md:py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md cursor-not-allowed text-sm md:text-base">
                          <CatalogIcon className="w-5 h-5 md:w-6 md:h-6" />
                          <span>Buscar artículos en Catálogo Virtual</span>
                       </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

const ActionButton: React.FC<{icon: React.ReactNode, label: string, disabled?: boolean, onClick?: () => void}> = ({ icon, label, disabled, onClick }) => (
    <div className="flex flex-col items-center">
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-blue-500 text-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform transform enabled:hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {icon}
        </button>
        <span className="mt-2 text-xs md:text-sm font-semibold text-gray-600 text-center">{label}</span>
    </div>
);


const FooterToolbar: React.FC = () => {
    const actions = [
        { label: 'Eliminar artículo', icon: <TrashIcon/> },
        { label: 'Aplicar Descuentos', icon: <TagIcon/> },
        { label: 'Ver información del vehículo', icon: <InfoIcon/> },
        { label: 'Proceder a Pago', icon: <CheckCircleIcon/> },
        { label: 'Buscar en Tienda', icon: <SearchIcon/> },
        { label: 'Añadir cuenta de Regalos', icon: <GiftIcon/> },
        { label: 'Cancelar Venta', icon: <XCircleIcon/> },
    ];
    return (
        <footer className="bg-blue-600 text-white p-2">
            <div className="container mx-auto">
                {/* Desktop layout */}
                <div className="hidden lg:flex justify-around items-center">
                    {actions.map((action, index) => (
                        <button key={index} disabled className="flex flex-col items-center text-xs font-medium cursor-not-allowed opacity-80">
                            <div className="w-8 h-8 flex items-center justify-center">{action.icon}</div>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
                {/* Mobile layout - Scrollable horizontal */}
                <div className="lg:hidden overflow-x-auto">
                    <div className="flex space-x-4 pb-2 min-w-max">
                        {actions.map((action, index) => (
                            <button key={index} disabled className="flex flex-col items-center text-xs font-medium cursor-not-allowed opacity-80 min-w-[60px]">
                                <div className="w-6 h-6 flex items-center justify-center">{action.icon}</div>
                                <span className="text-center leading-tight">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};


const MainMenuPage: React.FC<MainMenuPageProps> = ({ onNavigateToInvoices }) => {
  return (
    <div className="flex flex-col h-screen font-sans">
      <InfoHeader />
      <MainContent onNavigateToInvoices={onNavigateToInvoices} />
      <FooterToolbar />
    </div>
  );
};

export default MainMenuPage;