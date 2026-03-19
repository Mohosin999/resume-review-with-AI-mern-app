import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { resumeApi, atsScoreApi } from '../api/api';
import { BackButton, FileUpload, ScoreCard, SectionScoreCard, SuggestionList, LoadingSpinner } from '../components/ui';
import { Resume, AtsScore } from '../types';

export default function AtsScorePage() {
  const navigate = useNavigate();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AtsScore | null>(null);
  const [showResumes, setShowResumes] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeApi.getAll(1, 50);
      setResumes(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUploadSuccess = (resume: Resume) => {
    setSelectedResume(resume);
    toast.success('Resume uploaded successfully');
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', file);
      const response = await resumeApi.upload(formData);
      const uploadedResume = response.data.data;
      setSelectedResume(uploadedResume);
      toast.success('Resume uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResume = (resume: Resume) => {
    setSelectedResume(resume);
    setShowResumes(false);
  };

  const handleAnalyze = async () => {
    if (!selectedResume) {
      toast.error('Please select a resume');
      return;
    }

    try {
      setAnalyzing(true);
      const response = await atsScoreApi.analyze({ resumeId: selectedResume._id });
      setResult(response.data.data);
      toast.success('ATS analysis completed');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedResume(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">ATS Score Check</h1>
          <p className="text-gray-400">
            Analyze your resume for ATS (Applicant Tracking System) compatibility
          </p>
        </motion.div>

        {!result ? (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Select or Upload Resume
              </h2>

              <div className="mb-4">
                <button
                  onClick={() => {
                    fetchResumes();
                    setShowResumes(!showResumes);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  {showResumes ? 'Hide' : 'Choose'} from Existing Resumes
                </button>
              </div>

              {showResumes && (
                <div className="mb-4 max-h-60 overflow-y-auto space-y-2">
                  {loading ? (
                    <LoadingSpinner />
                  ) : resumes.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No resumes found</p>
                  ) : (
                    resumes.map((resume) => (
                      <button
                        key={resume._id}
                        onClick={() => handleSelectResume(resume)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedResume?._id === resume._id
                            ? 'bg-blue-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <p className="text-white font-medium">
                          {resume.content.personalInfo.fullName || resume.metadata.originalName}
                        </p>
                        <p className="text-sm text-gray-400">
                          {resume.metadata.filename}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await handleFileUpload(file);
                    }}
                  />
                </label>
              </div>

              {selectedResume && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Selected: {selectedResume.content.personalInfo.fullName || selectedResume.metadata.originalName}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!selectedResume || analyzing}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner /> Analyzing...
                  </span>
                ) : (
                  'Analyze ATS Score'
                )}
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="md:col-span-1">
                <ScoreCard
                  score={result.overallScore}
                  label="Overall ATS Score"
                  size="lg"
                  showProgress
                />
              </div>
              <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">ATS Friendliness</p>
                    <p className="text-2xl font-bold text-white">{result.atsFriendliness}%</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Spelling & Grammar</p>
                    <p className="text-2xl font-bold text-white">{result.spellingGrammar.score}%</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Analyze Another Resume
                </button>
              </div>
            </motion.div>

            {/* Section Scores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Section Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SectionScoreCard
                  sectionName="Summary"
                  score={result.sectionScores.summary.score}
                  feedback={result.sectionScores.summary.feedback}
                />
                <SectionScoreCard
                  sectionName="Experience"
                  score={result.sectionScores.experience.score}
                  feedback={result.sectionScores.experience.feedback}
                />
                <SectionScoreCard
                  sectionName="Projects"
                  score={result.sectionScores.projects.score}
                  feedback={result.sectionScores.projects.feedback}
                />
                <SectionScoreCard
                  sectionName="Skills"
                  score={result.sectionScores.skills.score}
                  feedback={result.sectionScores.skills.feedback}
                />
                <SectionScoreCard
                  sectionName="Contact Info"
                  score={result.sectionScores.contactInfo.score}
                  feedback={result.sectionScores.contactInfo.feedback}
                  hasContactInfo={result.sectionScores.contactInfo.hasContactInfo}
                />
              </div>
            </motion.div>

            {/* Spelling & Grammar Errors */}
            {result.spellingGrammar.errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Spelling & Grammar Errors</h2>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="space-y-3">
                    {result.spellingGrammar.errors.map((error, idx) => (
                      <div key={idx} className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-red-400 font-medium">{error.message}</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Suggestion: {error.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Improvement Suggestions</h2>
              <SuggestionList suggestions={result.suggestions} title="AI Suggestions" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
