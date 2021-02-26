import express from 'express';
import product from '../models/product';
const router = express.Router();
import mongoose from 'mongoose';
import productSchema from '../models/product';

/* GET products listing. */
export const getAll = async (req: express.Request, res: express.Response) => {
  const product = await productSchema.find();

  if (!product) {
    res.status(404).json({ success: false });
    return;
  }
  res.status(200).render('product', { success: product });
};

/* GET by Id */
export const getOne = async (req: express.Request, res: express.Response) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    res.status(500).json({ message: 'Product not found' });
  } else {
    res.status(200).send(product);
  }
};

/* PUT by Id */
export const update = async (req: express.Request, res: express.Response) => {
  const product = await productSchema.findByIdAndUpdate(req.params.Id, {
    productName: req.body.productName,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    dateUpdated: Date.now(),
  });
  if (product) {
    return res.status(201).send(product);
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Products not updated successfully' });
  }
};

/* POST products listing. */
export const dataPost = async (req: express.Request, res: express.Response) => {
  let newProduct = new productSchema({
    productName: req.body.product,
    quantity: req.body.Quantity,
    price: req.body.Price,
    image: req.body.productImage,
    category: req.body.Category,
    description: req.body.description,
  });
  newProduct = await newProduct.save();

  if (!newProduct) {
    return res.status(400).send('Product cannot be created');
  } else {
    return res.status(200).send(newProduct);
  }
};

/* DELETE produts listing */
export const deletedData = (req: express.Request, res: express.Response) => {
  productSchema
    .findByIdAndRemove(req.params.id)
    .then((item) => {
      if (item) {
        return item;
      } else {
        return 'Not found';
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};

export const count = async (req: express.Request, res: express.Response) => {
  const productCount = await productSchema.countDocuments((count) => count);

  if (!productCount) {
    res.status(404).json({ success: false });
  }
  res.status(200).send({ productCount: productCount });
};

export default router;
