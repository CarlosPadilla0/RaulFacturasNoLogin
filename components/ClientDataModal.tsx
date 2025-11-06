import React, { useState } from 'react';
import type { Invoice } from '../types';
import { XCircleIcon, EditIcon } from './icons/Icons';

interface ClientDataModalProps {
  invoice: Invoice;
  onClose: () => void;
  onSave: (updatedInvoice: Invoice) => void;
}

// Helper component for editable fields
const EditableItem: React.FC<{
  label: string;
  name: keyof Invoice;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  colSpan?: number;
}> = ({ label, name, value, onChange, type = 'text', colSpan = 1 }) => {
    const spanClass = {
        1: 'sm:col-span-1',
        2: 'sm:col-span-2',
        3: 'sm:col-span-3',
    }[colSpan] || 'sm:col-span-1';
    
    return (
        <div className={spanClass}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-500 capitalize mb-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 shadow-inner text-gray-900 text-md font-semibold transition-colors"
                required
            />
        </div>
    );
};

const ClientDataModal: React.FC<ClientDataModalProps> = ({ invoice, onClose, onSave }) => {
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isEditingFiscal, setIsEditingFiscal] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [isCancellingFolio, setIsCancellingFolio] = useState(false);

  const [formData, setFormData] = useState<Invoice>(invoice);

  const canEdit = invoice.status === 'No Generada';
  const isEditingAny = isEditingClient || isEditingFiscal || isEditingVehicle;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartCancellation = () => {
    setIsCancellingFolio(true);
    setIsEditingClient(true);
    setIsEditingFiscal(true);
    setIsEditingVehicle(true);
  };

  const handleSave = () => {
    let finalData = { ...formData };
    if (isCancellingFolio) {
        finalData = {
            ...finalData,
            status: 'No Generada',
            folioFiscal: undefined,
        };
    }
    onSave(finalData);
    setIsEditingClient(false);
    setIsEditingFiscal(false);
    setIsEditingVehicle(false);
    setIsCancellingFolio(false);
  };

  const handleCancel = () => {
    setFormData(invoice);
    setIsEditingClient(false);
    setIsEditingFiscal(false);
    setIsEditingVehicle(false);
    setIsCancellingFolio(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Detalles de la Factura</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <XCircleIcon className="w-8 h-8" />
              </button>
            </div>
            {formData.folioFiscal && <p className="text-sm text-gray-500 mt-1 font-mono">Folio Fiscal: {formData.folioFiscal}</p>}
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
            <div className="space-y-8">
                {/* Client Data Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Datos del Cliente</h3>
                        {canEdit && !isEditingClient && !isCancellingFolio && (
                            <button onClick={() => setIsEditingClient(true)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 ml-4 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                                <EditIcon className="w-4 h-4" />
                                <span>Editar</span>
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
                        <DataItem label="Nombre" value={formData.clientName} />
                        {isEditingClient ? (
                            <EditableItem label="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} type="email" />
                        ) : (
                            <DataItem label="Correo Electrónico" value={formData.email} />
                        )}
                        {isEditingClient ? (
                            <EditableItem label="Celular" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                        ) : (
                            <DataItem label="Celular" value={formData.phone} />
                        )}
                        <DataItem label="CURP" value={formData.curp} />
                        <DataItem label="Fecha de Nacimiento" value={formData.birthDate} />
                        <DataItem label="Género" value={formData.gender} />
                    </div>
                </section>

                {/* Fiscal Data Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Datos Fiscales</h3>
                        {canEdit && !isEditingFiscal && (
                            <button onClick={() => setIsEditingFiscal(true)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 ml-4 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                                <EditIcon className="w-4 h-4" />
                                <span>Editar</span>
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        {isEditingFiscal ? (
                            <EditableItem label="Nombre o Razón Social" name="razonSocial" value={formData.razonSocial} onChange={handleChange} colSpan={2}/>
                        ) : (
                            <DataItem label="Nombre o Razón Social" value={formData.razonSocial} colSpan={2} />
                        )}
                        {isEditingFiscal ? (
                            <EditableItem label="RFC" name="rfc" value={formData.rfc} onChange={handleChange} />
                        ) : (
                            <DataItem label="RFC" value={formData.rfc} />
                        )}
                        {isEditingFiscal ? (
                            <EditableItem label="Código Postal" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                        ) : (
                            <DataItem label="Código Postal" value={formData.postalCode} />
                        )}
                        {isEditingFiscal ? (
                            <EditableItem label="Régimen Fiscal" name="taxRegime" value={formData.taxRegime} onChange={handleChange} colSpan={2}/>
                        ) : (
                            <DataItem label="Régimen Fiscal" value={formData.taxRegime} colSpan={2} />
                        )}
                         {isEditingFiscal ? (
                            <EditableItem label="Uso de CFDI" name="cfdiUse" value={formData.cfdiUse} onChange={handleChange} colSpan={2} />
                        ) : (
                            <DataItem label="Uso de CFDI" value={formData.cfdiUse} colSpan={2} />
                        )}
                    </div>
                </section>

                {/* Vehicle Data Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Datos del Vehículo</h3>
                         {canEdit && !isEditingVehicle && !isCancellingFolio && (
                            <button onClick={() => setIsEditingVehicle(true)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 ml-4 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                                <EditIcon className="w-4 h-4" />
                                <span>Editar</span>
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
                        <DataItem label="SKU" value={formData.sku} />
                        <DataItem label="Descripción" value={formData.description} colSpan={2} />
                        <DataItem label="Cantidad" value={String(formData.quantity)} />
                        <DataItem label="Precio Venta" value={`$${formData.salePrice.toLocaleString()}`} />
                        <DataItem label="Marca" value={formData.brand} />
                        <DataItem label="Modelo" value={formData.model} />
                        <DataItem label="Color" value={formData.color} />
                        <DataItem label="Año" value={String(formData.year)} />
                        {isEditingVehicle ? (
                            <EditableItem label="No. de Serie" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
                        ) : (
                            <DataItem label="No. de Serie" value={formData.serialNumber} />
                        )}
                        {isEditingVehicle ? (
                            <EditableItem label="No. de Motor" name="motorNumber" value={formData.motorNumber} onChange={handleChange} />
                        ) : (
                            <DataItem label="No. de Motor" value={formData.motorNumber} />
                        )}
                        <DataItem label="Cilindraje" value={formData.cylinderCapacity} />
                        <DataItem label="Pedimento" value={formData.pedimento} />
                        <DataItem label="NCI" value={formData.nci} />
                    </div>
                </section>
            </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end items-center gap-4 border-t border-gray-200">
            {invoice.status === 'Timbrada' && !isEditingAny && (
                <button
                    type="button"
                    onClick={handleStartCancellation}
                    className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors mr-auto"
                >
                    Cancelar Folio Fiscal
                </button>
            )}
            {isEditingAny ? (
            <>
              <button type="button" onClick={handleCancel} className="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                Cancelar
              </button>
              <button type="button" onClick={handleSave} className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Guardar Cambios
              </button>
            </>
          ) : (
            <button onClick={onClose} className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


interface DataItemProps {
  label: string;
  value: string;
  colSpan?: number;
}

const DataItem: React.FC<DataItemProps> = ({ label, value, colSpan = 1 }) => {
    const spanClass = {
        1: 'sm:col-span-1',
        2: 'sm:col-span-2',
        3: 'sm:col-span-3',
    }[colSpan] || 'sm:col-span-1';

    return (
        <div className={spanClass}>
            <p className="text-sm font-medium text-gray-500 capitalize">{label}</p>
            <p className="text-md font-semibold text-gray-800 capitalize break-words">{value}</p>
        </div>
    );
};

export default ClientDataModal;