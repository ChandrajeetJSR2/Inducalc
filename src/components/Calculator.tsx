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

  // Unit state for each field
  const unitOptions = ['mm', 'cm', 'm', 'inch', 'ft'];
  const [units, setUnits] = useState({
    diameter: 'mm',
    thickness: 'mm',
    length: 'mm',
    width: 'mm',
    height: 'mm',
  });

  // Helper: convert value to meters based on unit
  const toMeters = (val: string, unit: string) => {
    const v = val ? parseFloat(val) : 0;
    switch (unit) {
      case 'mm': return v / 1000;
      case 'cm': return v / 100;
      case 'm': return v;
      case 'inch': return v * 0.0254;
      case 'ft': return v * 0.3048;
      default: return v / 1000;
    }
  };

  // Helper: get required fields for selectedType
  const getFieldsForType = (type: string) => {
    switch (type) {
      case 'Pipe':
        return ['diameter', 'thickness', 'length'];
      case 'Rod':
      case 'Bar':
      case 'Wire':
      case 'TMT Bar':
      case 'Rebar':
        return ['diameter', 'length'];
      case 'Sheet':
      case 'Plate':
        return ['length', 'width', 'thickness'];
      case 'Block':
        return ['length', 'width', 'height'];
      case 'Channel':
      case 'Angle':
      case 'Beam':
      case 'SHS':
      case 'RHS':
        return ['height', 'width', 'thickness', 'length'];
      default:
        return ['length'];
    }
  };

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

    // Helper: convert value to meters based on unit
    const getVal = (field: string) => toMeters(
      field === 'diameter' ? diameter :
      field === 'thickness' ? thickness :
      field === 'length' ? length :
      field === 'width' ? width :
      field === 'height' ? height : '',
      units[field as keyof typeof units]
    );

    // Dynamic calculation logic
    if (["Pipe"].includes(selectedType)) {
      // Pipe: diameter, thickness, length
  if (!diameter || !thickness || !length) return;
  const dM = getVal('diameter');
  const tM = getVal('thickness');
  const lM = getVal('length');
  const outerRadius = dM / 2;
  const innerRadius = (dM - 2 * tM) / 2;
  volume = Math.PI * (outerRadius ** 2 - innerRadius ** 2) * lM;
    } else if (["Rod", "Bar", "Wire", "TMT Bar"].includes(selectedType)) {
      // Rod/Bar/Wire: diameter, length
  if (!diameter || !length) return;
  const dM = getVal('diameter');
  const lM = getVal('length');
  const radius = dM / 2;
  volume = Math.PI * radius * radius * lM;
    } else if (["Sheet", "Plate"].includes(selectedType)) {
      // Sheet/Plate: length, width, thickness
  if (!length || !width || !thickness) return;
  const lM = getVal('length');
  const wM = getVal('width');
  const tM = getVal('thickness');
  volume = lM * wM * tM;
    } else if (["Block"].includes(selectedType)) {
      // Block: length, width, height
  if (!length || !width || !height) return;
  const lM = getVal('length');
  const wM = getVal('width');
  const hM = getVal('height');
  volume = lM * wM * hM;
    } else if (["Channel", "Angle", "Beam", "SHS", "RHS"].includes(selectedType)) {
      // Channel/Angle/Beam/SHS/RHS: height, width, thickness, length
  if (!height || !width || !thickness || !length) return;
  const hM = getVal('height');
  const wM = getVal('width');
  const tM = getVal('thickness');
  const lM = getVal('length');
  // Approximate as hollow rectangle
  volume = ((hM * wM) - ((hM - 2 * tM) * (wM - 2 * tM))) * lM;
    } else {
      // Default: use length only
  if (!length) return;
  const lM = getVal('length');
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

      {/* Dynamic input boxes based on type (refactored) */}
      <div className="space-y-4 mb-6">
        {getFieldsForType(selectedType).map(field => {
          // Capitalize first letter for label and placeholder
          const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
          let label = '';
          let placeholder = '';
          let allowedUnits = unitOptions;
          if (field === 'diameter') {
            label = capitalize(t('diameter'));
            placeholder = capitalize(t('enterDiameter'));
            allowedUnits = ['mm', 'cm', 'inch'];
          } else if (field === 'thickness') {
            label = 'Thickness';
            placeholder = 'Enter Thickness';
            allowedUnits = ['mm', 'cm', 'inch'];
          } else if (field === 'length') {
            label = capitalize(t('length'));
            placeholder = capitalize(t('enterLength'));
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          } else if (field === 'width') {
            label = capitalize(t('width'));
            placeholder = capitalize(t('enterWidth'));
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          } else if (field === 'height') {
            label = capitalize(t('height'));
            placeholder = capitalize(t('enterHeight'));
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          }

          // Single button for unit switcher (cycle only allowed units)
          const currentUnit = units[field as keyof typeof units];
          const currentIdx = allowedUnits.indexOf(currentUnit);
          const nextUnit = allowedUnits[(currentIdx + 1) % allowedUnits.length];

          // Validation: value must be positive
          let value = '';
          if (field === 'diameter') value = diameter;
          if (field === 'thickness') value = thickness;
          if (field === 'length') value = length;
          if (field === 'width') value = width;
          if (field === 'height') value = height;
          const isInvalid = value !== '' && (isNaN(Number(value)) || Number(value) <= 0);

          return (
            <div key={field} className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <input
                type="number"
                value={value}
                onChange={e => {
                  const val = e.target.value;
                  if (field === 'diameter') setDiameter(val);
                  if (field === 'thickness') setThickness(val);
                  if (field === 'length') setLength(val);
                  if (field === 'width') setWidth(val);
                  if (field === 'height') setHeight(val);
                }}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
                min={1}
              />
              <button
                type="button"
                className="ml-2 px-2 py-1 rounded text-sm border bg-green-500 text-white"
                onClick={() => setUnits(units => ({ ...units, [field]: nextUnit }))}
                title={`Switch unit (current: ${currentUnit})`}
                disabled={allowedUnits.length <= 1}
              >
                {currentUnit}
              </button>
              {isInvalid && (
                <span className="text-xs text-red-600 ml-2">Enter a valid positive value</span>
              )}
            </div>
          );
        })}
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