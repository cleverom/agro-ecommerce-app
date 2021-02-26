import express from 'express';
import {
  getAll,
  getOne,
  update,
  dataPost,
  deletedData,
  count,
} from '../controller/adminProd';
const router = express.Router();

/* GET users details. */
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', dataPost);
router.put('/:id', update);
router.delete('/:id', deletedData);
router.get('/count', count);

export default router;
