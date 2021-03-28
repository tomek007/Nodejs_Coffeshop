import express from 'express';
import Products from '../services/products';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const router = Router();

const products = new Products();

router.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /:id?onlyAvailable',
      'POST /:id',
      'PUT',
      'DELETE /:id',
    ],
  });
});

router.get('/:id?', async (req, res) => {
  console.log(`GET PRODUCTS ${req.params.id}`, req.query.onlyAvailable);

  try {
    const productData = await products.getProducts(
      req.params.id,
      req.query.onlyAvailable
    );

    return res.json({
      products: productData,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Generic server error',
      message: err.message,
    });
  }
});

router.post('/:id', async (req, res) => {
  const product = { _id: req.params.id, ...req.body };
  console.log(`POST PRODUCTS`, product);

  try {
    await products.updateProduct(product);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.put('/:id?', async (req, res) => {
  const product = { _id: req.params.id, ...req.body };
  console.log(`PUT PRODUCTS`, product);

  try {
    await products.addProduct(product);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE PRODUCTS ${req.params.id}`);

  try {
    await products.deleteProduct(req.params.id);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

export default router;
