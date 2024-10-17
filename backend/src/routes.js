import express from 'express';
import { getCountries, getCountry } from './controller';

const router = express.Router();

router.get('/', getCountries);
router.get('/country', getCountry);

export default router;
