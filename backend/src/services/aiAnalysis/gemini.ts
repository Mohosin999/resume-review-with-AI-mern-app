import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../../config/env';
import { ResumeContent } from '../../types';

const genAI = new GoogleGenerativeAI(env.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export interface AtsAnalysisResult {
  overallScore: number;
  sectionScores: {
    summary: { score: number; feedback: string };
    experience: { score: number; feedback: string };
    projects: { score: number; feedback: string };
    skills: { score: number; feedback: string };
    contactInfo: { score: number; feedback: string; hasContactInfo: boolean };
  };
  spellingGrammar: {
    score: number;
    errors: Array<{ type: string; message: string; suggestion: string }>;
  };
  atsFriendliness: number;
  suggestions: string[];
}

export interface JobMatchResult {
  matchPercentage: number;
  breakdown: {
    keywords: { score: number; matched: string[]; missing: string[] };
    skills: { score: number; matched: string[]; missing: string[] };
    education: { score: number; details: string };
    experience: { score: number; yearsMatched: number; yearsRequired?: number };
  };
  missingSkills: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface AISectionSuggestion {
  section: string;
  content: string;
  tips: string[];
}

export const analyzeAtsScore = async (
  resume: ResumeContent
): Promise<AtsAnalysisResult> => {
  const resumeText = JSON.stringify(resume, null, 2);

  const prompt = `
Analyze this resume for ATS (Applicant Tracking System) compatibility and provide a detailed assessment.

Resume Content:
${resumeText}

Provide your analysis in the following JSON format ONLY (no additional text):
{
  "overallScore": number (0-100),
  "sectionScores": {
    "summary": { "score": number (0-100), "feedback": string },
    "experience": { "score": number (0-100), "feedback": string },
    "projects": { "score": number (0-100), "feedback": string },
    "skills": { "score": number (0-100), "feedback": string },
    "contactInfo": { "score": number (0-100), "feedback": string, "hasContactInfo": boolean }
  },
  "spellingGrammar": {
    "score": number (0-100),
    "errors": [
      { "type": "spelling|grammar|punctuation", "message": string, "suggestion": string }
    ]
  },
  "atsFriendliness": number (0-100),
  "suggestions": [string]
}

Evaluation criteria:
1. Contact Info: Check for email, phone, LinkedIn, location
2. Summary: Should be 30-100 words, professional, highlight key achievements
3. Experience: Clear job titles, companies, dates, quantified achievements
4. Projects: Relevant technical projects with descriptions
5. Skills: Technical skills clearly listed, relevant to target roles
6. Spelling/Grammar: Check for any errors
7. ATS Friendliness: Standard sections, no tables/images, proper headings, keyword-rich

Return ONLY valid JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('ATS Analysis error:', error);
    throw new Error('Failed to analyze resume ATS score');
  }
};

export const analyzeJobMatch = async (
  resume: ResumeContent,
  jobDescription: string,
  jobTitle?: string,
  company?: string
): Promise<JobMatchResult> => {
  const resumeText = JSON.stringify(resume, null, 2);

  const prompt = `
Analyze how well this resume matches the job description.

Resume Content:
${resumeText}

Job Title: ${jobTitle || 'Not specified'}
Company: ${company || 'Not specified'}

Job Description:
${jobDescription}

Provide your analysis in the following JSON format ONLY (no additional text):
{
  "matchPercentage": number (0-100),
  "breakdown": {
    "keywords": { "score": number (0-100), "matched": [string], "missing": [string] },
    "skills": { "score": number (0-100), "matched": [string], "missing": [string] },
    "education": { "score": number (0-100), "details": string },
    "experience": { "score": number (0-100), "yearsMatched": number, "yearsRequired": number }
  },
  "missingSkills": [string],
  "missingKeywords": [string],
  "suggestions": [string]
}

Evaluation criteria:
1. Keywords: Match important keywords from JD in resume
2. Skills: Compare required/preferred skills with resume skills
3. Education: Check if education requirements are met
4. Experience: Match years of experience and relevance

Return ONLY valid JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('Job Match Analysis error:', error);
    throw new Error('Failed to analyze job match');
  }
};

export const generateSectionContent = async (
  section: string,
  context?: {
    jobTitle?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
  }
): Promise<AISectionSuggestion> => {
  const contextStr = context
    ? `
Context:
- Job Title: ${context.jobTitle || 'Not specified'}
- Industry: ${context.industry || 'Not specified'}
- Experience: ${context.experience || 'Not specified'}
- Skills: ${context.skills?.join(', ') || 'Not specified'}
`
    : '';

  const prompt = `
Generate professional ${section} content for a resume.
${contextStr}

The content should be:
- ATS-friendly (no tables, images, or complex formatting)
- Professional and concise
- Action-oriented with quantified achievements where possible
- Relevant to the specified context

Provide your response in the following JSON format ONLY:
{
  "section": "${section}",
  "content": string (the generated content),
  "tips": [string] (tips for customizing this section)
}

Return ONLY valid JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const suggestion = JSON.parse(jsonMatch[0]);
    return suggestion;
  } catch (error) {
    console.error('Section Generation error:', error);
    throw new Error('Failed to generate section content');
  }
};

export const improveResumeSection = async (
  section: string,
  currentContent: string
): Promise<{ improved: string; changes: string[] }> => {
  const prompt = `
Improve the following resume ${section} section to be more impactful and ATS-friendly.

Current Content:
${currentContent}

Provide suggestions to make it:
- More action-oriented
- Include quantified achievements
- Use strong action verbs
- Include relevant keywords
- Be concise and professional

Provide your response in the following JSON format ONLY:
{
  "improved": string (the improved content),
  "changes": [string] (list of improvements made)
}

Return ONLY valid JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const improvement = JSON.parse(jsonMatch[0]);
    return improvement;
  } catch (error) {
    console.error('Section Improvement error:', error);
    throw new Error('Failed to improve section content');
  }
};
