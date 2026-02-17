import express from 'express';
import { 
  getServicesByCategory, 
  getServiceDetail 
} from '../controllers/service.controller';

const router = express.Router();

// ✅ 1. THE LIST ROUTE (Must be mapped to '/')
// This handles: /api/services?categorySlug=loan-services
router.get('/', getServicesByCategory);

// ✅ 2. THE DETAIL ROUTE (Must be mapped to '/:slug')
// This handles: /api/services/gold-loan
router.get('/:slug', getServiceDetail);

export default router;