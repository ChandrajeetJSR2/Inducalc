import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface CalculatorProps {
  selectedMaterial: {
    id: string;
    name: string;
    density: number;
    pricePerKg: number;
  } | null;
  selectedType: string;
  onCalculationChange?: (calculation: any) => void;
}
export const Calculator: React.FC<CalculatorProps> = ({ selectedMaterial, selectedType, onCalculationChange }) => {
  // Backup prices for all material/type combinations
  const backupPrices: Record<string, Record<string, number>> = {
    ms: {
      Pipe: 55, Rod: 55, Sheet: 55, Plate: 55, 'Angle (ISA)': 55, 'Channel (ISMC)': 55, 'Beam (ISMB)': 55, SHS: 55, RHS: 55, 'TMT Bar': 55, Wire: 55, Bar: 55
    },
    stainless: {
      Pipe: 180, Rod: 180, Sheet: 180, Plate: 180, Channel: 180, Wire: 180, Tube: 180, Bar: 180
    },
    aluminum: {
      Pipe: 220, Rod: 220, Sheet: 220, Plate: 220, Channel: 220, Wire: 220, Tube: 220, Bar: 220, Angle: 220
    },
    copper: {
      Pipe: 800, Rod: 800, Sheet: 800, Plate: 800, Channel: 800, Wire: 800, Tube: 800, Bar: 800
    },
    brass: {
      Pipe: 500, Rod: 500, Sheet: 500, Plate: 500, Channel: 500, Wire: 500, Tube: 500, Bar: 500
    },
    bronze: {
      Pipe: 600, Rod: 600, Sheet: 600, Plate: 600, Channel: 600, Wire: 600, Tube: 600, Bar: 600
    },
    castiron: {
      Pipe: 60, Rod: 60, Bar: 60, Plate: 60
    },
    concrete: {
      Beam: 7, Block: 7, Slab: 7, Column: 7
    },
    plastic: {
      Pipe: 120, Sheet: 120, Rod: 120, Block: 120, Tube: 120, Bar: 120
    },
    lead: {
      Sheet: 200, Pipe: 200, Rod: 200, Bar: 200
    },
    zinc: {
      Sheet: 250, Rod: 250, Bar: 250, Plate: 250
    },
    titanium: {
      Pipe: 1800, Rod: 1800, Sheet: 1800, Plate: 1800, Bar: 1800
    },
    nickel: {
      Pipe: 1600, Rod: 1600, Sheet: 1600, Plate: 1600, Bar: 1600
    },
    tin: {
      Sheet: 900, Rod: 900, Bar: 900
    },
    glass: {
      Sheet: 40, Rod: 40, Block: 40
    },
    wood: {
      Beam: 60, Plank: 60, Board: 60, Block: 60
    }
  };
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

  // Price unit state
  const priceUnits = ['₹/kg', '₹/ton'];
  const [priceInput, setPriceInput] = useState('');
  const [priceUnit, setPriceUnit] = useState('₹/kg');
  const [onlinePrice, setOnlinePrice] = useState<number | null>(null);

  // Add original value state for each dimension field
  const [originalValues, setOriginalValues] = useState({
    diameter: '',
    thickness: '',
    length: '',
    width: '',
    height: '',
  });
  const [originalUnits, setOriginalUnits] = useState({
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
    const densityKg = selectedMaterial.density * 16.0185;
    let volume = 0;

    // Always use original value and original unit for calculation
    const getVal = (field: string) => {
      const val = originalValues[field];
      const unit = originalUnits[field];
      return toMeters(val, unit);
    };

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

    let weightKg = volume * densityKg;
  let pricePerUnit = priceInput !== '' ? Number(priceInput) : (onlinePrice !== null ? (priceUnit === '₹/ton' ? onlinePrice * 1000 : onlinePrice) : (backupPrices[selectedMaterial.id]?.[selectedType] ?? selectedMaterial.pricePerKg));
    let totalPrice = weightKg * (pricePerUnit / (priceUnit === '₹/ton' ? 1000 : 1));
    setWeight(weightKg);
    setPrice(totalPrice);

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
        weight: weightKg,
        price: totalPrice
      });
    }
  };

  useEffect(() => {
    calculateWeight();
  }, [diameter, length, thickness, selectedMaterial, selectedType, language]);

  useEffect(() => {
    if (selectedMaterial && (diameter === '' && thickness === '' && length === '' && width === '' && height === '')) {
      setPriceInput('');
    }
  }, [selectedMaterial, diameter, thickness, length, width, height]);

  // Fetch online price for default, update placeholder and calculation on material/type/unit change.
  useEffect(() => {
    async function fetchOnlinePrice() {
      if (!selectedMaterial || !selectedType) return;
      const apiUrl = `/api/price?material=${selectedMaterial.id}&type=${selectedType}&unit=₹/kg`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data && typeof data.price === 'number' && data.price > 0) {
          setOnlinePrice(data.price);
        } else {
          setOnlinePrice(backupPrices[selectedMaterial.id]?.[selectedType] ?? selectedMaterial.pricePerKg);
        }
      } catch {
        setOnlinePrice(backupPrices[selectedMaterial.id]?.[selectedType] ?? selectedMaterial.pricePerKg);
      }
    }
    fetchOnlinePrice();
  }, [selectedMaterial, selectedType]);

  // Helper to convert price between units
  function convertPrice(price: number, fromUnit: string, toUnit: string) {
    if (fromUnit === toUnit) return price;
    if (fromUnit === '₹/kg' && toUnit === '₹/ton') return price / 1000;
    if (fromUnit === '₹/ton' && toUnit === '₹/kg') return price * 1000;
    return price;
  }

  // Helper to convert dimension value between units
  function convertDimension(val: string, fromUnit: string, toUnit: string) {
    const v = parseFloat(val);
    if (isNaN(v)) return '';
    if (fromUnit === toUnit) return val;
    // mm <-> cm <-> m <-> inch <-> ft
    const unitToM = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      inch: 0.0254,
      ft: 0.3048,
    };
    const meters = v * unitToM[fromUnit];
    return (meters / unitToM[toUnit]).toFixed(2);
  }

  const handlePriceUnitChange = () => {
    const nextUnit = priceUnits[(priceUnits.indexOf(priceUnit) + 1) % priceUnits.length];
    setPriceUnit(nextUnit);
    // Convert input and placeholder price to new unit
    setPriceInput(prev => {
      if (prev === '') return '';
      if (nextUnit === '₹/ton') {
        return (Number(prev) * 1000).toString();
      } else {
        return (Number(prev) / 1000).toString();
      }
    });
  }

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

  // Add metricUnits and imperialUnits at the top of the component
  const metricUnits = ['mm', 'cm', 'm'];
  const imperialUnits = ['inch', 'ft'];

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
          let label = '';
          let placeholder = '';
          let allowedUnits = unitOptions;
          if (field === 'diameter') {
            label = language === 'hi' ? t('diameter') : 'Diameter';
            placeholder = language === 'hi' ? t('enterDiameter') : 'Enter Diameter';
            allowedUnits = ['mm', 'cm', 'inch'];
          } else if (field === 'thickness') {
            label = language === 'hi' ? t('thickness') : 'Thickness';
            placeholder = language === 'hi' ? t('enterThickness') : 'Enter Thickness';
            allowedUnits = ['mm', 'cm', 'inch'];
          } else if (field === 'length') {
            label = language === 'hi' ? t('length') : 'Length';
            placeholder = language === 'hi' ? t('enterLength') : 'Enter Length';
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          } else if (field === 'width') {
            label = language === 'hi' ? t('width') : 'Width';
            placeholder = language === 'hi' ? t('enterWidth') : 'Enter Width';
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          } else if (field === 'height') {
            label = language === 'hi' ? t('height') : 'Height';
            placeholder = language === 'hi' ? t('enterHeight') : 'Enter Height';
            allowedUnits = ['mm', 'cm', 'm', 'inch', 'ft'];
          }

          // Single button for unit switcher (cycle only allowed units)
          const currentUnit = units[field as keyof typeof units];
          const currentIdx = allowedUnits.indexOf(currentUnit);
          const nextUnit = allowedUnits[(currentIdx + 1) % allowedUnits.length];

          // Validation: value must be positive
          let value = '';
          // Always convert value from original unit to current unit
          value = originalValues[field] !== '' ? convertDimension(originalValues[field], originalUnits[field], currentUnit) : '';
          const isInvalid = value !== '' && (isNaN(Number(value)) || Number(value) <= 0);

          return (
            <div key={field} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <button
                  type="button"
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-semibold shadow-md border border-gray-200 transition"
                  onClick={() => {
                    setUnits(units => {
                      const prevUnit = units[field];
                      const newUnit = nextUnit;
                      // No need to update value here, just update unit
                      return { ...units, [field]: newUnit };
                    });
                  }}
                  title={`Switch unit (current: ${currentUnit})`}
                  disabled={allowedUnits.length <= 1}
                >
                  {currentUnit}
                </button>
              </div>
              <input
                type="number"
                value={value}
                onChange={e => {
                  const val = e.target.value;
                  // Store original value and unit on user input
                  setOriginalValues(v => ({ ...v, [field]: val }));
                  setOriginalUnits(u => ({ ...u, [field]: currentUnit }));
                  if (field === 'diameter') setDiameter(val);
                  if (field === 'thickness') setThickness(val);
                  if (field === 'length') setLength(val);
                  if (field === 'width') setWidth(val);
                  if (field === 'height') setHeight(val);
                }}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
                min={1}
              />
              {isInvalid && (
                <span className="text-xs text-red-600 ml-2">{language === 'hi' ? 'सही मान दर्ज करें' : 'Enter a valid positive value'}</span>
              )}
            </div>
          );
        })}
        {/* Price input box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">{language === 'hi' ? 'मूल्य' : 'Price'}</label>
            <button
              type="button"
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-semibold shadow-md border border-gray-200 transition"
              onClick={handlePriceUnitChange}
              title={`Switch price unit (current: ${priceUnit})`}
            >
              {priceUnit}
            </button>
          </div>
          <input
            type="number"
            value={priceInput}
            onChange={e => {
              // Always store as per current unit
              setPriceInput(e.target.value);
            }}
            placeholder={language === 'hi'
              ? `मूल्य दर्ज करें (${onlinePrice !== null ? (priceUnit === '₹/ton' ? (onlinePrice * 1000).toFixed(2) : onlinePrice.toFixed(2)) : (backupPrices[selectedMaterial.id]?.[selectedType] ?? selectedMaterial.pricePerKg).toFixed(2)} ${priceUnit})`
              : `Enter Price (${onlinePrice !== null ? (priceUnit === '₹/ton' ? (onlinePrice * 1000).toFixed(2) : onlinePrice.toFixed(2)) : (backupPrices[selectedMaterial.id]?.[selectedType] ?? selectedMaterial.pricePerKg).toFixed(2)} ${priceUnit})`}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg`}
            min={0}
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
        {/* Remove material description and density info below result */}
      </div>
    </div>
  );
};