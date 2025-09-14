import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { MaterialCard } from './MaterialCard';
import { Calculator } from './Calculator';
import { ProjectSaver } from './ProjectSaver';
import { QuickActions } from './QuickActions';



export const AppLayout: React.FC = () => {
  const { language, toggleLanguage, t } = useAppContext();
  const materials = [
    {
      id: 'steel-pipe',
      name: t('steelPipe'),
      description: t('steelPipeDesc'),
      density: 490,
      pricePerLb: 0.85,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828968007_2a1fdf73.webp'
    },
    {
      id: 'steel-rod',
      name: t('steelRod'),
      description: t('steelRodDesc'),
      density: 490,
      pricePerLb: 0.75,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828969903_bad39f9e.webp'
    },
    {
      id: 'aluminum',
      name: t('aluminum'),
      description: t('aluminumDesc'),
      density: 168,
      pricePerLb: 1.25,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828976104_2e5760ba.webp'
    },
    {
      id: 'rebar',
      name: t('rebar'),
      description: t('rebarDesc'),
      density: 490,
      pricePerLb: 0.65,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828983325_be0633d5.webp'
    },
    {
      id: 'concrete',
      name: t('concrete'),
      description: t('concreteDesc'),
      density: 150,
      pricePerLb: 0.12,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828979973_72191290.webp'
    },
    {
      id: 'stainless',
      name: t('stainlessSteel'),
      description: t('stainlessSteelDesc'),
      density: 500,
      pricePerLb: 2.15,
      image: 'https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828971603_fed79859.webp'
    }
  ];
  const [selectedMaterial, setSelectedMaterial] = useState<typeof materials[0] | null>(null);
  const [currentCalculation, setCurrentCalculation] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-48 sm:h-64 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://d64gsuwffb70l.cloudfront.net/68c6572494b6310b9ac6dca9_1757828963179_58e238f1.webp')`
        }}
      >
        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-semibold shadow-md border border-gray-200 transition"
          aria-label="Switch language"
        >
          {language === 'en' ? 'हिन्दी' : 'English'}
        </button>
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
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{t('selectMaterial')}</h2>
          </div>
        </div>
      </div>

  <div className="w-full max-w-full px-1 py-2 sm:px-4 sm:py-8">
        {/* Material Selection */}
        <div className="mb-2 sm:mb-8">
          <h2 className="text-base sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-6">{t('selectMaterialType')}</h2>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                name={material.name}
                image={material.image}
                description={material.description}
                density={material.density}
                pricePerLb={material.pricePerLb}
                isSelected={selectedMaterial?.id === material.id}
                onClick={() => setSelectedMaterial(material)}
              />
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <QuickActions 
          materialCount={materials.length}
          onExportPDF={() => alert('PDF export feature coming soon!')}
          onClearAll={() => {
            setSelectedMaterial(null);
            setCurrentCalculation(null);
          }}
          onImportData={() => alert('Import feature coming soon!')}
        />

        {/* Calculator and Project Saver */}
  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
          <div>
            <Calculator 
              selectedMaterial={selectedMaterial}
              onCalculationChange={setCurrentCalculation}
            />
          </div>
          <div>
            <ProjectSaver 
              currentCalculation={currentCalculation}
            />
          </div>
        </div>

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