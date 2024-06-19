import express from "express";
import {
  addBlock,
  deleteBlock,
  getBlocks,
  updateBlock,
} from "../controller/blockController.js";

const router = express.Router();

router.get("/get-all-blocks", getBlocks);
router.post("/add-block", addBlock);
router.put("/update/:id", updateBlock);
router.delete("/delete/:id", deleteBlock);

export default router;
