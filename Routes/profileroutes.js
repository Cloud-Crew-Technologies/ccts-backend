import { getAll, getUserbyID, newProfile, newProfileById } from '../controller/profilecontroller.js';
import express from 'express';

const router = express.Router();

router.route('/profile').get(getAll);

router.route('/profile/:email').get(getUserbyID);

router.route('/profile').post(newProfile);

router.route('/profile/:email').put(newProfileById);

export default router;