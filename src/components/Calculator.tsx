import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface CalculatorProps {
  selectedMaterial: {
    name: string;
    density: number;
    pricePerLb: number;
  } | null;
  onCalculationChange?: (calculation: any) => void;
}
export const Calculator: React.FC<CalculatorProps> = ({ selectedMaterial, onCalculationChange }) => {
  const { t } = useAppContext();
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState<'meter' | 'mm' | 'cm'>('mm');

  // Indian standard: all units in mm, cm, or meter, density in kg/m³, price in ₹/kg
  const calculateWeight = () => {
    if (!selectedMaterial || !diameter || !length) return;

    const d = parseFloat(diameter);
    const l = parseFloat(length);
    const t = thickness ? parseFloat(thickness) : 0;

    if (isNaN(d) || isNaN(l)) return;

    // Convert all to meters
    let dM = d;
    let lM = l;
    let tM = t;
    if (unit === 'mm') {
      dM = d / 1000;
      lM = l / 1000;
      tM = t / 1000;
    } else if (unit === 'cm') {
      dM = d / 100;
      lM = l / 100;
      tM = t / 100;
    }
    // if unit is meter, keep as is

    // Convert density from lb/ft³ to kg/m³
    const densityKg = selectedMaterial.density * 16.0185;
    // Convert price from $/lb to ₹/kg
    const pricePerKg = selectedMaterial.pricePerLb * 181 * 2.20462;

    // Calculate volume based on shape (solid cylinder or hollow pipe)
    let volume = 0;
    if (thickness && t > 0) {
      // Hollow pipe
      const outerRadius = dM / 2;
      const innerRadius = (dM - 2 * tM) / 2;
      volume = Math.PI * (outerRadius * outerRadius - innerRadius * innerRadius) * lM;
    } else {
      // Solid cylinder/rod
      const radius = dM / 2;
      volume = Math.PI * radius * radius * lM;
    }

    const calculatedWeight = volume * densityKg;
    const calculatedPrice = calculatedWeight * pricePerKg;

    setWeight(calculatedWeight);
    setPrice(calculatedPrice);

    // Notify parent component of calculation change
    if (onCalculationChange && diameter && length) {
      onCalculationChange({
        material: selectedMaterial.name,
        diameter: parseFloat(diameter),
        length: parseFloat(length),
        thickness: thickness ? parseFloat(thickness) : undefined,
        weight: calculatedWeight,
        price: calculatedPrice
      });
    }
  };

  useEffect(() => {
    calculateWeight();
  }, [diameter, length, thickness, selectedMaterial, unit]);

  if (!selectedMaterial) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">{t('selectMaterialEmpty')}</h3>
        <p className="text-gray-500">{t('chooseMaterialTypeAbove')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('calculator')}</h2>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="mm">{t('mm')}</option>
          <option value="cm">{t('cm')}</option>
          <option value="meter">{t('meter')}</option>
        </select>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('diameter')} ({t(unit)})
          </label>
          <input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder={t('enterDiameter')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('length')} ({t(unit)})
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={t('enterLength')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('thickness')} ({t(unit)})
          </label>
          <input
            type="number"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            placeholder={t('enterThickness')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {weight.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">{t('kg')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              ₹{price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">{t('price')}</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          {t('material')}: {selectedMaterial.name} • {t('density')}: {(selectedMaterial.density * 16.0185).toFixed(0)} {t('densityUnit')}
        </div>
      </div>
    </div>
  );
};