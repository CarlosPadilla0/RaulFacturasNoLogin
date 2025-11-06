import React from 'react';
import { BackArrowIcon } from './icons/Icons';

interface BillingDataPageProps {
  onBack: () => void;
  onNavigateToInvoices: () => void;
}

const BillingDataPage: React.FC<BillingDataPageProps> = ({ onBack, onNavigateToInvoices }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Datos de facturación</h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <BackArrowIcon className="w-5 h-5" />
            <span>Volver al Menú</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">Los campos con asterisco (*) son obligatorios.</p>

        <form>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-gray-700">Usar RFC genérico</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="RFC" required placeholder="RUR900101ABC" linkText="¿No sabes tu RFC? Consúltalo aquí" />
            <InputField label="Nombre o razón social" required placeholder="José Raúl Ríos Mireles" />
            <InputField label="Código Postal" required placeholder="80000" />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Régimen fiscal <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
                <option>Personas Físicas con Actividades Empresariales y Profesionales</option>
                <option>Sueldos y Salarios e Ingresos Asimilados a Salarios</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Uso de CFDI <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
                <option>Gastos en general</option>
                <option>Adquisición de mercancías</option>
              </select>
            </div>
            
            <InputField label="Correo electrónico" required placeholder="Raul.Mireless@Coppel.com" type="email" />
            <InputField label="Confirmar correo electrónico" required placeholder="Raul.Mireless@Coppel.com" type="email" />
            <InputField label="Fecha de Nacimiento" required placeholder="01/01/1990" />
            <InputField label="CURP" required placeholder="RUR900101HSR..." linkText="¿No sabes tu CURP? Consúltalo aquí" />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Género <span className="text-red-500">*</span></label>
            <div className="mt-2 flex items-center">
              <label className="inline-flex items-center mr-6">
                <input type="radio" name="gender" className="h-4 w-4 text-blue-600" defaultChecked />
                <span className="ml-2">Masculino</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="gender" className="h-4 w-4 text-blue-600" />
                <span className="ml-2">Femenino</span>
              </label>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              disabled
              className="py-2 px-6 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onNavigateToInvoices}
              className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Seguimiento de Pólizas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  linkText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, required, placeholder, type = 'text', linkText }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
    />
    {linkText && (
      <a href="#" className="text-xs text-blue-600 hover:underline mt-1 block text-right">
        {linkText}
      </a>
    )}
  </div>
);

export default BillingDataPage;
