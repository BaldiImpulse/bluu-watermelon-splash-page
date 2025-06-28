
import React from 'react';
import { Shield, Clock, Plus } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  return (
    <>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-4 bg-green-50 rounded-lg p-3">
        <div className="flex items-center space-x-1">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700 font-medium">Pagamento Seguro</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700 font-medium">Entrega Rápida</span>
        </div>
      </div>

      {/* Shipping alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <p className="text-xs md:text-sm text-orange-800 font-medium flex items-center">
          <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          Adicione mais uma unidade para liberar frete grátis!
        </p>
      </div>
    </>
  );
};

export default TrustIndicators;
