import express from 'express';
import { 
  getAllSwaps, 
  createSwap, 
  addInterestedUser, 
  deleteSwap, 
  updateSwap, 
  deleteInterestedUser, 
  updateInterestedUser 
} from '../controllers/skillSwapController.js';

const router = express.Router();

router.get('/', getAllSwaps);
router.post('/', createSwap);
router.post('/:id/interested', addInterestedUser);
router.delete('/:id', deleteSwap);
router.put('/:id', updateSwap);
router.delete('/:id/interested/:userIndex', deleteInterestedUser);
router.put('/:id/interested/:userIndex', updateInterestedUser);

export default router; 