import { useState } from 'react';
import { Sparkles, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { resumeBuilderApi } from '../../api/api';
import { AISectionSuggestion, Project } from '../../types';

interface ProjectsEditorProps {
  projects: Project[] | undefined;
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export default function ProjectsEditor({
  projects = [],
  onAdd,
  onUpdate,
  onRemove,
}: ProjectsEditorProps) {
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const handleAIGenerate = async (index: number) => {
    try {
      setGeneratingIndex(index);
      const project = projects[index];
      const response = await resumeBuilderApi.generateSection({
        section: 'Project Description',
        context: {
          jobTitle: project.name,
          skills: project.technologies,
        },
      });

      const suggestion = response.data.data as AISectionSuggestion;
      onUpdate(index, 'description', suggestion.content);
      toast.success('Project description generated!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to generate description');
    } finally {
      setGeneratingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Projects</label>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400 text-sm">No projects added yet</p>
      ) : (
        projects.map((project, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">Project {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-gray-400">Project Name *</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onUpdate(index, 'name', e.target.value)}
                className="input w-full text-sm"
                placeholder="e.g., E-commerce Platform"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-400">Description *</label>
                <button
                  type="button"
                  onClick={() => handleAIGenerate(index)}
                  disabled={generatingIndex === index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white text-xs rounded transition-all disabled:cursor-not-allowed"
                >
                  {generatingIndex === index ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {generatingIndex === index ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea
                value={project.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                className="input w-full text-sm"
                rows={3}
                placeholder="Describe the project, your role, and technologies used..."
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Technologies (comma-separated)</label>
              <input
                type="text"
                value={project.technologies?.join(', ') || ''}
                onChange={(e) =>
                  onUpdate(index, 'technologies', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))
                }
                className="input w-full text-sm"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Live Link</label>
                <input
                  type="url"
                  value={project.links?.live || ''}
                  onChange={(e) =>
                    onUpdate(index, 'links.live', e.target.value)
                  }
                  className="input w-full text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">GitHub Link</label>
                <input
                  type="url"
                  value={project.links?.github || ''}
                  onChange={(e) =>
                    onUpdate(index, 'links.github', e.target.value)
                  }
                  className="input w-full text-sm"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
