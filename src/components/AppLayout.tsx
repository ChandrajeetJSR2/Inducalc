import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { materialTypeImages } from '../materialTypeImages';
import { materialDescriptionsHi } from '../materialDescriptions.hi';
import { materialTypeDescriptionsHi } from '../materialTypeDescriptions.hi';
import { materialTypeDescriptions } from '../materialTypeDescriptions';
import { MaterialCard } from './MaterialCard';
import { Calculator } from './Calculator';
import { ProjectSaver } from './ProjectSaver';
import { QuickActions } from './QuickActions';



export const AppLayout: React.FC = () => {
  const { language, toggleLanguage, t } = useAppContext();
    const materials = [
      {
        id: 'ms',
        name: 'Mild Steel (MS)',
        types: [
          'Pipe', 'Rod', 'Sheet', 'Plate', 'Angle (ISA)', 'Channel (ISMC)', 'Beam (ISMB)', 'SHS', 'RHS', 'TMT Bar', 'Wire', 'Bar'
        ],
        description: 'Mild Steel is widely used for construction, fabrication, and reinforcement. All Indian Standard sections (ISA, ISMC, ISMB, SHS, RHS, TMT) are types of MS, not separate materials.',
        density: 7850,
        pricePerLb: 0.85,
        image: 'https://d64gsuwffb70l.cloudfront.net/ms-preview.webp'
      },
      // ...existing materials...
      {
        id: 'stainless',
        name: 'Stainless Steel',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Channel', 'Wire', 'Tube', 'Bar'],
        description: 'Corrosion-resistant steel alloy for food, chemical, and architectural use.',
        density: 8000,
        pricePerLb: 2.15,
        image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828971603_fed79859.webp'
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Channel', 'Wire', 'Tube', 'Bar', 'Angle'],
        description: 'Lightweight, corrosion-resistant metal for transport, construction, and packaging.',
        density: 2700,
        pricePerLb: 1.25,
        image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828976104_2e5760ba.webp'
      },
      {
        id: 'copper',
        name: 'Copper',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Channel', 'Wire', 'Tube', 'Bar'],
        description: 'High conductivity metal for electrical, plumbing, and industrial use.',
        density: 8960,
        pricePerLb: 3.50,
        image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828983325_be0633d5.webp'
      },
      {
        id: 'brass',
        name: 'Brass',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Channel', 'Wire', 'Tube', 'Bar'],
        description: 'Copper-zinc alloy for decorative, plumbing, and electrical use.',
        density: 8500,
        pricePerLb: 2.00,
        image: 'https://d64gsuwffb70l.cloudfront.net/brass-preview.webp'
      },
      {
        id: 'bronze',
        name: 'Bronze',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Channel', 'Wire', 'Tube', 'Bar'],
        description: 'Copper-tin alloy for bearings, bushings, and marine hardware.',
        density: 8800,
        pricePerLb: 2.50,
        image: 'https://d64gsuwffb70l.cloudfront.net/bronze-preview.webp'
      },
      {
        id: 'castiron',
        name: 'Cast Iron',
        types: ['Pipe', 'Rod', 'Bar', 'Plate'],
        description: 'Iron-carbon alloy for pipes, machinery, and automotive parts.',
        density: 7200,
        pricePerLb: 0.60,
        image: 'https://d64gsuwffb70l.cloudfront.net/castiron-preview.webp'
      },
      {
        id: 'concrete',
        name: 'Concrete',
        types: ['Beam', 'Block', 'Slab', 'Column'],
        description: 'Composite material for construction, used in beams, blocks, slabs, and columns.',
        density: 2400,
        pricePerLb: 0.12,
        image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828979973_72191290.webp'
      },
      {
        id: 'plastic',
        name: 'Plastic',
        types: ['Pipe', 'Sheet', 'Rod', 'Block', 'Tube', 'Bar'],
        description: 'Synthetic material for lightweight, corrosion-resistant applications.',
        density: 950,
        pricePerLb: 0.50,
        image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828963179_58e238f1.webp'
      },
      {
        id: 'lead',
        name: 'Lead',
        types: ['Sheet', 'Pipe', 'Rod', 'Bar'],
        description: 'Heavy, malleable metal for radiation shielding and batteries.',
        density: 11340,
        pricePerLb: 2.00,
        image: 'https://d64gsuwffb70l.cloudfront.net/lead-preview.webp'
      },
      {
        id: 'zinc',
        name: 'Zinc',
        types: ['Sheet', 'Rod', 'Bar', 'Plate'],
        description: 'Corrosion-resistant metal for galvanizing and die-casting.',
        density: 7135,
        pricePerLb: 1.50,
        image: 'https://d64gsuwffb70l.cloudfront.net/zinc-preview.webp'
      },
      {
        id: 'titanium',
        name: 'Titanium',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Bar'],
        description: 'High-strength, lightweight metal for aerospace and medical use.',
        density: 4500,
        pricePerLb: 10.00,
        image: 'https://d64gsuwffb70l.cloudfront.net/titanium-preview.webp'
      },
      {
        id: 'nickel',
        name: 'Nickel',
        types: ['Pipe', 'Rod', 'Sheet', 'Plate', 'Bar'],
        description: 'Corrosion-resistant metal for alloys and batteries.',
        density: 8900,
        pricePerLb: 8.00,
        image: 'https://d64gsuwffb70l.cloudfront.net/nickel-preview.webp'
      },
      {
        id: 'tin',
        name: 'Tin',
        types: ['Sheet', 'Rod', 'Bar'],
        description: 'Soft, malleable metal for coatings and alloys.',
        density: 7280,
        pricePerLb: 2.50,
        image: 'https://d64gsuwffb70l.cloudfront.net/tin-preview.webp'
      },
      {
        id: 'glass',
        name: 'Glass',
        types: ['Sheet', 'Rod', 'Block'],
        description: 'Non-crystalline solid for windows, containers, and optics.',
        density: 2500,
        pricePerLb: 0.80,
        image: 'https://d64gsuwffb70l.cloudfront.net/glass-preview.webp'
      },
      {
        id: 'wood',
        name: 'Wood',
        types: ['Beam', 'Plank', 'Board', 'Block'],
        description: 'Natural material for construction, furniture, and packaging.',
        density: 600,
        pricePerLb: 0.30,
        image: 'https://d64gsuwffb70l.cloudfront.net/wood-preview.webp'
      },
    ];
    const [selectedMaterialId, setSelectedMaterialId] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const selectedMaterial = materials.find(m => m.id === selectedMaterialId) || null;
    const [currentCalculation, setCurrentCalculation] = useState<any>(null);
  // const [currentCalculation, setCurrentCalculation] = useState<any>(null); // Already declared below

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 shadow-sm border-b border-gray-200 flex items-center justify-between px-4 py-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">InduCalc</h1>
        <button
          onClick={toggleLanguage}
          className="bg-white/80 hover:bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-semibold shadow-md border border-gray-200 transition"
          aria-label="Switch language"
        >
          {language === 'en' ? 'हिन्दी' : 'English'}
        </button>
      </div>
      {/* Hero Section */}
      <div
        className="relative h-48 sm:h-64 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828963179_58e238f1.webp')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-2 sm:px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              InduCalc
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-3 sm:mb-6">
          {t('professional')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:space-x-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t('preciseWeight')}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t('realTime')}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t('projectMgmt')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  <div className="w-full max-w-full px-1 py-2 sm:px-4 sm:py-8">
        {/* Material Selection */}
        <div className="mb-2 sm:mb-8">
          <h2 className="text-base sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-6">{language === 'hi' ? 'सामग्री प्रकार चुनें' : 'Select Material Type'}</h2>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none"
                     value={selectedMaterialId}
                     onChange={e => {
                       setSelectedMaterialId(e.target.value);
                       setSelectedType('');
                     }}
                   >
                     <option value="" disabled>{language === 'hi' ? 'सामग्री चुनें' : 'Select Material'}</option>
                     {materials.map(material => (
                       <option key={material.id} value={material.id}>
                         {language === 'hi' && t('materialNames') && t('materialNames')[material.id] ? t('materialNames')[material.id] : material.name}
                       </option>
                     ))}
                   </select>
                {/* Helper text */}
                {!selectedMaterialId && <div className="text-xs text-red-500 mt-1">{language === 'hi' ? 'कृपया सामग्री चुनें' : 'Please select a material.'}</div>}
              </div>
              <div>
                <select
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none"
                     value={selectedType}
                     onChange={e => setSelectedType(e.target.value)}
                     disabled={!selectedMaterial}
                   >
                     <option value="" disabled>{language === 'hi' ? 'प्रकार चुनें' : 'Select Type'}</option>
                     {selectedMaterial && selectedMaterial.types.map(type => (
                       <option key={type} value={type}>
                         {language === 'hi' && t('materialTypes') && t('materialTypes')[type] ? t('materialTypes')[type] : type}
                       </option>
                     ))}
                   </select>
                {/* Helper text */}
                {selectedMaterial && !selectedType && <div className="text-xs text-red-500 mt-1">{language === 'hi' ? 'कृपया प्रकार चुनें' : 'Please select a type.'}</div>}
              </div>
            </div>
            {selectedMaterial && (
                 <div className="mt-6 p-6 rounded-xl bg-white shadow border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                   <img
                     src={selectedType && materialTypeImages[selectedMaterial.id]?.[selectedType] ? materialTypeImages[selectedMaterial.id][selectedType] : selectedMaterial.image}
                     alt={selectedMaterial.name + (selectedType ? ' ' + selectedType : '')}
                     className="w-24 h-24 rounded-lg border border-gray-300 object-cover"
                     onError={e => { e.currentTarget.src = selectedMaterial.image; }}
                   />
                   <div className="flex-1 text-left">
                     <div className="font-bold text-2xl mb-2 text-gray-800">
                       {language === 'hi' && t('materialNames') && t('materialNames')[selectedMaterial.id] ? t('materialNames')[selectedMaterial.id] : selectedMaterial.name}
                       {selectedType && <span className="text-base text-gray-500">({language === 'hi' && t('materialTypes') && t('materialTypes')[selectedType] ? t('materialTypes')[selectedType] : selectedType})</span>}
                     </div>
                     <div className="mb-2 text-gray-700 text-base">
             {selectedType && (language === 'hi'
             ? materialTypeDescriptionsHi[selectedMaterial.id]?.[selectedType]
             : materialTypeDescriptions[selectedMaterial.id]?.[selectedType])
             ? (language === 'hi'
               ? materialTypeDescriptionsHi[selectedMaterial.id]?.[selectedType]
               : materialTypeDescriptions[selectedMaterial.id]?.[selectedType])
             : (language === 'hi'
               ? materialDescriptionsHi[selectedMaterial.id] || selectedMaterial.description
               : selectedMaterial.description)}
                     </div>
                     <div className="mb-1 text-gray-600 text-sm">
                       {language === 'hi' ? 'घनत्व:' : 'Density:'} <span className="font-semibold">{selectedMaterial.density} kg/m³</span>
                     </div>
                     <div className="mb-1 text-gray-600 text-sm">
                       {language === 'hi' ? 'प्रकार:' : 'Type:'} <span className="font-semibold">{selectedType ? (language === 'hi' && t('materialTypes') && t('materialTypes')[selectedType] ? t('materialTypes')[selectedType] : selectedType) : (language === 'hi' ? 'प्रकार चुनें' : 'Select Type')}</span>
                     </div>
                   </div>
                 </div>
            )}
        </div>
        
        {/* Calculator and Project Saver */}
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
          <div>
            <Calculator 
              selectedMaterial={selectedMaterial ? { ...selectedMaterial, id: selectedMaterial.id } : null}
              selectedType={selectedType}
              onCalculationChange={setCurrentCalculation}
            />
          </div>
          <div>
            <ProjectSaver 
              currentCalculation={currentCalculation}
            />
          </div>
        </div>

        {/* Quick Actions (moved below) */}
        <QuickActions 
          materialCount={materials.length}
          onExportPDF={() => alert('PDF export feature coming soon!')}
          onClearAll={() => {
            setSelectedMaterialId('');
            setSelectedType('');
            setCurrentCalculation(null);
          }}
          onImportData={() => alert('Import feature coming soon!')}
        />

        {/* Features Section */}
        <div className="mt-4 sm:mt-16 bg-white rounded-xl shadow-lg p-2 sm:p-8">
          <h2 className="text-base sm:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-8">
            {t('professionalFeatures')}
          </h2>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('accurateCalculations')}</h3>
              <p className="text-gray-600">{t('industryStandardDensity')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('realTimePricing')}</h3>
              <p className="text-gray-600">{t('instantCostCalculations')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('projectManagementFeature')}</h3>
              <p className="text-gray-600">{t('saveAndOrganize')}</p>
              <p className="text-gray-500 text-xs mt-1">{t('Available')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;