import { useState } from 'react';
import { Sparkles, Loader2, Plus, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { resumeBuilderApi } from '../../api/api';
import { AISectionSuggestion } from '../../types';

interface SkillsEditorProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
  jobTitle?: string;
}

export default function SkillsEditor({
  skills,
  onAdd,
  onRemove,
  jobTitle,
}: SkillsEditorProps) {
  const [newSkill, setNewSkill] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAISuggest = async () => {
    try {
      setGenerating(true);
      const response = await resumeBuilderApi.generateSection({
        section: 'Technical Skills',
        context: {
          jobTitle,
        },
      });

      const suggestion = response.data.data as AISectionSuggestion;
      // Parse the suggested skills (assuming comma-separated or bullet points)
      const suggestedSkills = suggestion.content
        .split(/[,\n•-]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0 && s.length < 50);

      suggestedSkills.slice(0, 5).forEach((skill: string) => {
        if (!skills.includes(skill)) {
          onAdd(skill);
        }
      });

      toast.success(`${Math.min(5, suggestedSkills.length)} skills added!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to suggest skills');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Technical Skills</label>
        <button
          type="button"
          onClick={handleAISuggest}
          disabled={generating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white text-sm rounded-lg transition-all disabled:cursor-not-allowed"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {generating ? 'Generating...' : 'AI Suggest'}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input flex-1 text-sm"
          placeholder="Add a skill (e.g., React, Python)"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-400 text-sm">No skills added yet</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-900/30 border border-blue-500/30 text-blue-300 rounded-lg text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(skill)}
                className="hover:text-blue-100 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Tip: Add at least 8-12 relevant technical skills for better ATS scoring
      </p>
    </div>
  );
}
