import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();

router.get('/teams', TeamController.getAllTeams);
router.get('/teams/:teamId', TeamController.findTeamById);

export default router;
