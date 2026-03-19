import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Briefcase, CheckCircle, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import { resumeApi, jobMatchApi } from '../api/api';
import { BackButton, ScoreCard, MatchBreakdown, SuggestionList, LoadingSpinner } from '../components/ui';
import { Resume, JobMatchResult } from '../types';

export default function JobMatchPage() {
  const navigate = useNavigate();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);
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

    if (!jobDescription.trim()) {
      toast.error('Please paste the job description');
      return;
    }

    try {
      setAnalyzing(true);
      const response = await jobMatchApi.analyze({
        resumeId: selectedResume._id,
        jobDescription,
        jobTitle: jobTitle || undefined,
        company: company || undefined,
      });
      setResult(response.data.data);
      toast.success('Job match analysis completed');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to analyze job match');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedResume(null);
    setJobDescription('');
    setJobTitle('');
    setCompany('');
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
          <h1 className="text-3xl font-bold text-white mb-2">Job Match Analysis</h1>
          <p className="text-gray-400">
            Compare your resume against a job description to see how well you match
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
                Step 1: Select Your Resume
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Step 2: Job Details (Optional)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="input w-full"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="input w-full"
                    placeholder="e.g., Google"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Step 3: Paste Job Description
              </h2>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                rows={12}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <button
                onClick={handleAnalyze}
                disabled={!selectedResume || !jobDescription.trim() || analyzing}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner /> Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Briefcase className="w-5 h-5" /> Analyze Job Match
                  </span>
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
                  score={result.matchPercentage}
                  label="Match Percentage"
                  size="lg"
                  showProgress
                />
              </div>
              <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Job Details</h2>
                {result.jobTitle && (
                  <p className="text-gray-300 mb-2">
                    <span className="text-gray-500">Position:</span> {result.jobTitle}
                  </p>
                )}
                {result.company && (
                  <p className="text-gray-300 mb-4">
                    <span className="text-gray-500">Company:</span> {result.company}
                  </p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Analyze Another Job
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Match Breakdown</h2>
              <MatchBreakdown breakdown={result.breakdown} />
            </motion.div>

            {/* Missing Skills */}
            {result.missingSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Missing Skills</h2>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
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
              <h2 className="text-xl font-semibold text-white mb-4">Tailoring Suggestions</h2>
              <SuggestionList suggestions={result.suggestions} title="AI Suggestions" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
