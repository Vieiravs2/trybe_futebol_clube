import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import Validations from '../middlewares/validations';

const router = Router();

router.get('/matches', MatchesController.getMatches);
router.patch('/matches/:matchId/finish', Validations.validateToken, MatchesController.finishMatch);

export default router;
