import { Response } from 'express';
import { AuthRequest } from '../../middlewares';
import { parseResumeFile } from '../../services/resumeParser';
import fs from 'fs';
import path from 'path';

export const parseResume = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    try {
      const resumeContent = await parseResumeFile(filePath, req.file.mimetype);

      fs.unlinkSync(filePath);

      return res.status(200).json({
        success: true,
        data: {
          resumeName: originalName,
          resumeContent,
        },
      });
    } catch (parseError: any) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw parseError;
    }
  } catch (error: any) {
    console.error('Resume parse error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to parse resume',
    });
  }
};
