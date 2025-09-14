import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    selectMaterial: 'Select Material Type',
    calculator: 'Calculator',
    diameter: 'Diameter',
    length: 'Length',
    thickness: 'Wall Thickness (Optional For Hollow Pipes)',
    enterDiameter: 'Enter Diameter',
    enterLength: 'Enter Length',
    enterThickness: 'Leave Empty For Solid Material',
    weight: 'Weight',
    price: 'Total Cost',
    material: 'Material',
    density: 'Density',
    kg: 'kg',
    rupee: '₹',
    meter: 'Meter',
    mm: 'mm',
    cm: 'cm',
    projectManagement: 'Project Management',
    realTimePricing: 'Real-Time Pricing',
    accurateCalculations: 'Accurate Calculations',
    professionalFeatures: 'Professional Features',
    savedProjects: 'Saved Projects',
    exportPDF: 'Export PDF',
    importData: 'Import Data',
    clearAll: 'Clear All',
    materials: 'Materials',
    calculations: 'Calculations',
    units: 'Units',
    selectAMaterial: 'Select A Material',
    chooseMaterial: 'Choose A Material Type Above To Start Calculating Weight And Pricing',
    densityUnit: 'kg/m³',
    priceUnit: '₹/kg',
    preciseWeight: 'Precise Weight Calculations',
    realTime: 'Real-Time Pricing',
    projectMgmt: 'Project Management',
    professional: 'Professional Fabrication And Structural Material Calculations',
  // Professional Features Section
  industryStandardDensity: 'Industry-Standard Density Formulas For Precise Weight Calculations',
  instantCostCalculations: 'Instant Cost Calculations Based On Current Material Prices',
  projectManagementFeature: 'Project Management',
  saveAndOrganize: 'Save And Organize Multiple Calculations For Easy Project Tracking',
  // Save Project Card
  saveProject: 'Save Project',
  saveProjectDesc: 'Save Your Calculation For Future Reference And Easy Access',
  saveButton: 'Save',
  noProject: 'No Project',
  selectMaterialEmpty: 'No Material Selected',
  chooseMaterialTypeAbove: 'Choose A Material Type Above To Start Calculating',
  available247: 'Available',
  },
  hi: {
    selectMaterial: 'सामग्री प्रकार चुनें',
    calculator: 'कैलकुलेटर',
    diameter: 'व्यास',
    length: 'लंबाई',
    thickness: 'दीवार की मोटाई (खोखले पाइप के लिए वैकल्पिक)',
    enterDiameter: 'व्यास दर्ज करें',
    enterLength: 'लंबाई दर्ज करें',
    enterThickness: 'ठोस सामग्री के लिए खाली छोड़ें',
    weight: 'वजन',
    price: 'कुल लागत',
    material: 'सामग्री',
    density: 'घनत्व',
    kg: 'किलोग्राम',
    rupee: '₹',
    meter: 'मीटर',
    mm: 'मिमी',
    cm: 'सेमी',
    projectManagement: 'प्रोजेक्ट प्रबंधन',
    realTimePricing: 'रीयल-टाइम मूल्य निर्धारण',
    accurateCalculations: 'सटीक गणना',
    professionalFeatures: 'पेशेवर विशेषताएँ',
    savedProjects: 'सहेजे गए प्रोजेक्ट्स',
    exportPDF: 'पीडीएफ निर्यात करें',
    importData: 'डेटा आयात करें',
    clearAll: 'सभी साफ करें',
    materials: 'सामग्री',
    calculations: 'गणनाएँ',
    units: 'इकाइयाँ',
    selectAMaterial: 'सामग्री चुनें',
    chooseMaterial: 'वजन और मूल्य निर्धारण की गणना शुरू करने के लिए ऊपर सामग्री प्रकार चुनें',
    densityUnit: 'किलोग्राम/मी³',
    priceUnit: '₹/किलोग्राम',
    preciseWeight: 'सटीक वजन गणना',
    realTime: 'रीयल-टाइम मूल्य',
    projectMgmt: 'प्रोजेक्ट प्रबंधन',
    professional: 'पेशेवर फैब्रिकेशन और संरचनात्मक सामग्री गणना',
  // Professional Features Section
  industryStandardDensity: 'सटीक वजन के लिए इंडस्ट्री-मानक घनत्व सूत्र',
  instantCostCalculations: 'मौजूदा सामग्री कीमतों पर तुरंत लागत गणना',
  projectManagementFeature: 'प्रोजेक्ट प्रबंधन',
  saveAndOrganize: 'आसान ट्रैकिंग के लिए कई गणनाएँ सेव और व्यवस्थित करें',
  // Save Project Card
  saveProject: 'प्रोजेक्ट सेव करें',
  saveProjectDesc: 'भविष्य के लिए अपनी गणना सेव करें और आसानी से एक्सेस करें',
  saveButton: 'सेव करें',
  noProject: 'कोई प्रोजेक्ट नहीं',
  selectMaterialEmpty: 'कोई सामग्री चयनित नहीं',
  chooseMaterialTypeAbove: 'गणना शुरू करने के लिए ऊपर सामग्री प्रकार चुनें',
  available247: 'उपलब्ध है',
  }
};

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  language: 'en',
  toggleLanguage: () => {},
  t: (key: string) => translations['en'][key] || key,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
