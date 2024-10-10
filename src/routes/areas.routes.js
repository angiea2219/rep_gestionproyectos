import { Router } from "express";
import { getAreas,saveAreas,updateAreas,deleteAreas } from "../controllers/AreasController.js";
const router=Router();
router.get('/areas',getAreas);
router.get('/areas/:id_area',getAreas);
router.post('/areas',saveAreas);
router.put('/areas/:id_area',updateAreas);
router.delete('/areas/:id_area',deleteAreas);

export default router;