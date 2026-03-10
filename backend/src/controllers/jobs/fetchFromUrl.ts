import { Response } from "express";
import { AuthRequest } from "../../middlewares";

export const fetchFromUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const linkedInPatterns = [
      /linkedin\.com\/jobs\/view\/.*/i,
      /linkedin\.com\/jobs\/job\/.*/i,
      /linkedin\.com\/jobs\/collections\/.*/i,
      /linkedin\.com\/jobs\/.*/i,
    ];

    const isLinkedInUrl = linkedInPatterns.some((pattern) => pattern.test(url));

    if (!isLinkedInUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid LinkedIn job posting URL",
      });
    }

    const mockDescription = `
      Senior Full Stack Developer
      
      About the Role:
      We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for building and maintaining web applications using modern technologies.
      
      Requirements:
      - 5+ years of experience in full stack development
      - Strong proficiency in React, Node.js, and TypeScript
      - Experience with cloud platforms (AWS, Azure, or GCP)
      - Familiarity with database design (PostgreSQL, MongoDB)
      - Excellent problem-solving skills
      
      Preferred Skills:
      - Experience with microservices architecture
      - Knowledge of CI/CD pipelines
      - Experience with Docker and Kubernetes
      - Strong communication skills
      
      Benefits:
      - Competitive salary
      - Health insurance
      - Remote work options
      - Professional development budget
    `;

    res.json({
      success: true,
      data: {
        title: "Senior Full Stack Developer",
        description: mockDescription,
        url: url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job description from URL",
    });
  }
};
