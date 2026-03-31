import { AtsScore } from '../../models/AtsScore';
import { Resume } from '../../models/Resume';
import { analyzeAtsScore as analyzeWithGemini } from '../aiAnalysis/gemini';
import { ResumeContent } from '../../types';

const validErrorTypes = ['spelling', 'grammar', 'punctuation', 'formatting', 'redundancy'];

const sanitizeSpellingGrammar = (spellingGrammar: any) => {
  return {
    ...spellingGrammar,
    errors: spellingGrammar.errors.map((error: any) => ({
      ...error,
      type: validErrorTypes.includes(error.type) ? error.type : 'formatting',
    })),
  };
};

export const calculateAtsScore = async (
  userId: string,
  resumeId: string
) => {
  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw new Error('Resume not found');
  }

  // Analyze with Gemini AI
  const analysis = await analyzeWithGemini(resume.content);

  // Sanitize spelling grammar errors to match allowed enum values
  const sanitizedSpellingGrammar = sanitizeSpellingGrammar(analysis.spellingGrammar);

  // Save the analysis result
  const atsScore = await AtsScore.create({
    userId,
    resumeId,
    overallScore: analysis.overallScore,
    sectionScores: analysis.sectionScores,
    spellingGrammar: sanitizedSpellingGrammar,
    atsFriendliness: analysis.atsFriendliness,
    suggestions: analysis.suggestions,
  });

  return atsScore;
};

export const getAtsScoreHistory = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [scores, total] = await Promise.all([
    AtsScore.find({ userId })
      .populate('resumeId', 'metadata.filename content.personalInfo.fullName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    AtsScore.countDocuments({ userId }),
  ]);

  return {
    scores,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAtsScoreById = async (userId: string, scoreId: string) => {
  const score = await AtsScore.findOne({
    _id: scoreId,
    userId,
  }).populate('resumeId', 'metadata.filename content');

  if (!score) {
    throw new Error('ATS Score not found');
  }

  return score;
};

export const deleteAtsScore = async (userId: string, scoreId: string) => {
  const result = await AtsScore.deleteOne({
    _id: scoreId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error('ATS Score not found');
  }

  return { success: true };
};
