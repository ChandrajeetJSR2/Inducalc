import { FC } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface MaterialCardProps {
  name: string;
  image: string;
  description: string;
  density: number;
  pricePerLb: number;
  isSelected: boolean;
  onClick: () => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  name,
  image,
  description,
  density,
  pricePerLb,
  isSelected,
  onClick
}) => {
  const { t } = useAppContext();
  // Convert density from lb/ft³ to kg/m³ (1 lb/ft³ = 16.0185 kg/m³)
  const densityKg = (density * 16.0185).toFixed(0);
  // Convert price from $/lb to ₹/kg (1 $/lb ≈ 181 ₹/kg as of 2025)
  const pricePerKg = (pricePerLb * 181 * 2.20462).toFixed(2);
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isSelected 
          ? 'bg-blue-600 text-white shadow-2xl ring-4 ring-blue-300' 
          : 'bg-white text-gray-800 shadow-lg hover:shadow-xl border border-gray-200'
        }
      `}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{name}</h3>
            <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'} truncate`}>
              {description}
            </p>
            <div className="mt-2 flex justify-between text-xs">
              <span className={isSelected ? 'text-blue-200' : 'text-gray-500'}>
                {densityKg} {t('densityUnit')}
              </span>
              <span className={`font-semibold ${isSelected ? 'text-blue-100' : 'text-green-600'}`}>
                ₹{pricePerKg}/{t('kg')}
              </span>
            </div>
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};