import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface CalculatorProps {
  selectedMaterial: {
    id: string;
    name: string;
    density: number;
    pricePerLb: number;
  } | null;
  selectedType: string;
  onCalculationChange?: (calculation: any) => void;
}
export const Calculator: React.FC<CalculatorProps> = ({ selectedMaterial, selectedType, onCalculationChange }) => {
  const { t, language } = useAppContext();
  // Dynamic input states
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  // Remove unit selector, default to mm
  const unit = 'mm';

  // New: detect if type is selected
  const typeSelected = !!selectedType;

  // Indian standard: all units in mm, cm, or meter, density in kg/m³, price in ₹/kg
  const calculateWeight = () => {
    if (!selectedMaterial || !selectedType) return;
    // Convert density from lb/ft³ to kg/m³
    const densityKg = selectedMaterial.density * 16.0185;
    // Convert price from $/lb to ₹/kg
    const pricePerKg = selectedMaterial.pricePerLb * 181 * 2.20462;
    let volume = 0;

    // Helper: convert mm to m
    const mmToM = (val: string) => val ? parseFloat(val) / 1000 : 0;

    // Dynamic calculation logic
    if (["Pipe"].includes(selectedType)) {
      // Pipe: diameter, thickness, length
      if (!diameter || !thickness || !length) return;
      const dM = mmToM(diameter);
      const tM = mmToM(thickness);
      const lM = mmToM(length);
      const outerRadius = dM / 2;
      const innerRadius = (dM - 2 * tM) / 2;
      volume = Math.PI * (outerRadius ** 2 - innerRadius ** 2) * lM;
    } else if (["Rod", "Bar", "Wire", "TMT Bar"].includes(selectedType)) {
      // Rod/Bar/Wire: diameter, length
      if (!diameter || !length) return;
      const dM = mmToM(diameter);
      const lM = mmToM(length);
      const radius = dM / 2;
      volume = Math.PI * radius * radius * lM;
    } else if (["Sheet", "Plate"].includes(selectedType)) {
      // Sheet/Plate: length, width, thickness
      if (!length || !width || !thickness) return;
      const lM = mmToM(length);
      const wM = mmToM(width);
      const tM = mmToM(thickness);
      volume = lM * wM * tM;
    } else if (["Block"].includes(selectedType)) {
      // Block: length, width, height
      if (!length || !width || !height) return;
      const lM = mmToM(length);
      const wM = mmToM(width);
      const hM = mmToM(height);
      volume = lM * wM * hM;
    } else if (["Channel", "Angle", "Beam", "SHS", "RHS"].includes(selectedType)) {
      // Channel/Angle/Beam/SHS/RHS: height, width, thickness, length
      if (!height || !width || !thickness || !length) return;
      const hM = mmToM(height);
      const wM = mmToM(width);
      const tM = mmToM(thickness);
      const lM = mmToM(length);
      // Approximate as hollow rectangle
      volume = ((hM * wM) - ((hM - 2 * tM) * (wM - 2 * tM))) * lM;
    } else {
      // Default: use length only
      if (!length) return;
      const lM = mmToM(length);
      volume = lM;
    }

    const calculatedWeight = volume * densityKg;
    const calculatedPrice = calculatedWeight * pricePerKg;

    setWeight(calculatedWeight);
    setPrice(calculatedPrice);

    // Notify parent component of calculation change
    if (onCalculationChange) {
      onCalculationChange({
        material: selectedMaterial.name,
        type: selectedType,
        diameter: diameter ? parseFloat(diameter) : undefined,
        length: length ? parseFloat(length) : undefined,
        thickness: thickness ? parseFloat(thickness) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
        weight: calculatedWeight,
        price: calculatedPrice
      });
    }
  };

  useEffect(() => {
    calculateWeight();
  }, [diameter, length, thickness, selectedMaterial, selectedType, language]);


  // If no material selected
  if (!selectedMaterial) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          {language === 'hi' ? 'ऊपर सामग्री प्रकार चुनें' : 'Choose A Material Type Above To Start Calculating'}
        </h3>
      </div>
    );
  }

  // If material selected but no type selected
  if (selectedMaterial && !selectedType) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          {language === 'hi' ? 'ऊपर प्रकार चुनें' : 'Choose A Type Above To Start Calculating'}
        </h3>
      </div>
    );
  }

  // If both material and type are selected, show input box
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('calculator')}</h2>
        <h3 className="text-lg font-semibold text-gray-600 mt-2">
          {/* Show material and type names, with translation if available */}
          {language === 'hi' && t('materialNames') && t('materialNames')[selectedMaterial.id] ? t('materialNames')[selectedMaterial.id] : selectedMaterial.name}
          {selectedType && (
            <span className="ml-2 text-base text-gray-500">
              {language === 'hi' && t('materialTypes') && t('materialTypes')[selectedType] ? t('materialTypes')[selectedType] : selectedType}
            </span>
          )}
        </h3>
      </div>

      {/* Dynamic input boxes based on type */}
      <div className="space-y-4 mb-6">
        {/* Pipe: diameter, thickness, length */}
        {["Pipe"].includes(selectedType) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('diameter')} (mm)</label>
              <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder={t('enterDiameter')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thickness (mm)</label>
              <input type="number" value={thickness} onChange={e => setThickness(e.target.value)} placeholder={t('enterThickness')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
          </>
        )}
        {/* Rod/Bar/Wire: diameter, length */}
        {["Rod", "Bar", "Wire", "TMT Bar"].includes(selectedType) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('diameter')} (mm)</label>
              <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder={t('enterDiameter')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
          </>
        )}
        {/* Sheet/Plate: length, width, thickness */}
        {["Sheet", "Plate"].includes(selectedType) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('width')} (mm)</label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder={t('enterWidth')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('thickness')} (mm)</label>
              <input type="number" value={thickness} onChange={e => setThickness(e.target.value)} placeholder={t('enterThickness')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
          </>
        )}
        {/* Block: length, width, height */}
        {["Block"].includes(selectedType) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('width')} (mm)</label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder={t('enterWidth')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('height')} (mm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={t('enterHeight')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
          </>
        )}
        {/* Channel/Angle/Beam/SHS/RHS: height, width, thickness, length */}
        {["Channel", "Angle", "Beam", "SHS", "RHS"].includes(selectedType) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('height')} (mm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={t('enterHeight')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('width')} (mm)</label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder={t('enterWidth')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('thickness')} (mm)</label>
              <input type="number" value={thickness} onChange={e => setThickness(e.target.value)} placeholder={t('enterThickness')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
            </div>
          </>
        )}
        {/* Default: length only */}
        {!["Pipe", "Rod", "Bar", "Wire", "TMT Bar", "Sheet", "Plate", "Block", "Channel", "Angle", "Beam", "SHS", "RHS"].includes(selectedType) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('length')} (mm)</label>
            <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder={t('enterLength')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
          </div>
        )}
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