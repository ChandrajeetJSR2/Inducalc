
import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface Project {
  id: string;
  name: string;
  material: string;
  diameter: number;
  length: number;
  thickness?: number;
  weight: number;
  price: number;
  date: string;
}

interface ProjectSaverProps {
  currentCalculation: {
    material: string;
    diameter: number;
    length: number;
    thickness?: number;
    weight: number;
    price: number;
  } | null;
}
export const ProjectSaver: React.FC<ProjectSaverProps> = ({ currentCalculation }) => {
  const { t } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const saveProject = () => {
    if (!currentCalculation || !projectName.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName.trim(),
      material: currentCalculation.material,
      diameter: currentCalculation.diameter,
      length: currentCalculation.length,
      thickness: currentCalculation.thickness,
      weight: currentCalculation.weight,
      price: currentCalculation.price,
      date: new Date().toLocaleDateString()
    };
    setProjects([newProject, ...projects]);
    setProjectName('');
    setShowSaveForm(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const totalValue = projects.reduce((sum, project) => sum + project.price, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('savedProjects')}</h2>
        <button
              onClick={() => setShowSaveForm(!showSaveForm)}
              disabled={!currentCalculation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {t('saveButton')}
            </button>
          </div>

          {showSaveForm && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder={t('enterProjectName') || 'Enter project name'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={saveProject}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('saveButton')}
                </button>
                <button
                  onClick={() => setShowSaveForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  {t('cancel') || 'Cancel'}
                </button>
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ₹{totalValue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">{t('price')}</div>
              </div>
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                {t('noProject')}
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg text-blue-700">{project.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{project.date}</div>
                    <div className="text-sm text-gray-700">
                      {project.material} | {project.diameter} × {project.length} {project.thickness ? `× ${project.thickness}` : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {project.weight.toFixed(2)} {t('kg')} • ₹{project.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    {t('delete') || 'Delete'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      );
};