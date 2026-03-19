import { Response } from 'express';
import { AuthRequest } from '../../middlewares';
import {
  createAtsScoreHistory,
  getAtsScoreHistory,
  getAtsScoreHistoryById,
  deleteAtsScoreHistory,
  deleteAllAtsScoreHistory,
} from '../../services/atsScoreHistory';

export const analyzeAtsScore = async (req: AuthRequest, res: Response) => {
  try {
    const { resumeName, resumeContent } = req.body;

    if (!resumeContent) {
      return res.status(400).json({
        success: false,
        message: 'Resume content is required',
      });
    }

    const score = await createAtsScoreHistory(
      req.user._id.toString(),
      resumeName || 'Untitled Resume',
      resumeContent
    );

    res.status(201).json({
      success: true,
      data: score,
    });
  } catch (error: any) {
    console.error('ATS Score analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze ATS score',
    });
  }
};

export const getAtsScores = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;

    const result = await getAtsScoreHistory(
      req.user._id.toString(),
      page,
      limit
    );

    res.json({
      success: true,
      data: result.scores,
      pagination: result.pagination,
    });
  } catch (error: any) {
    console.error('Get ATS scores error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get ATS scores',
    });
  }
};

export const getAtsScore = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const score = await getAtsScoreHistoryById(req.user._id.toString(), id);

    res.json({
      success: true,
      data: score,
    });
  } catch (error: any) {
    console.error('Get ATS score error:', error);
    res.status(404).json({
      success: false,
      message: error.message || 'ATS Score not found',
    });
  }
};

export const deleteAtsScoreController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteAtsScoreHistory(req.user._id.toString(), id);

    res.json({
      success: true,
      message: 'ATS Score deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete ATS score error:', error);
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to delete ATS Score',
    });
  }
};

export const deleteAllAtsScoresController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await deleteAllAtsScoreHistory(req.user._id.toString());

    res.json({
      success: true,
      message: 'All ATS Scores deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete all ATS scores error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete ATS Scores',
    });
  }
};
