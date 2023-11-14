import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();

router.get('/teams', TeamController.getAllTeams);

export default router;
