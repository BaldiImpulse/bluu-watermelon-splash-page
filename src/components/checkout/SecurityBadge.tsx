
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityBadge: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-blue-800 font-medium">
          Seus dados estão protegidos com criptografia SSL
        </span>
      </div>
    </div>
  );
};

export default SecurityBadge;
