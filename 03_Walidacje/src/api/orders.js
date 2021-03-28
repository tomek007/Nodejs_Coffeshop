import express from 'express';
import Orders from '../services/orders';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const router = Router();

const orders = new Orders();

router.get('/', (req, res) => {
  res.json({
    availableMethods: ['GET /:id', 'POST /:id', 'PUT', 'DELETE /:id'],
  });
});

router.get('/:id', async (req, res) => {
  console.log(
    `GET ORDER ${req.params.id}, from ${req.query.dateFrom} to ${req.query.dateTo}`
  );

  try {
    const orderData = await orders.getOrders(req.params.id);

    return res.json({
      orders: orderData,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.post('/:id?', async (req, res) => {
  const order = { _id: req.params.id, ...req.body };
  console.log(`POST ORDER`, order);

  try {
    await orders.updateOrder(order);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.put('/:id?', async (req, res) => {
  const order = { _id: req.params.id, ...req.body };
  console.log(`PUT ORDER`, order);

  try {
    await orders.addOrder(order);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE ORDER ${req.params.id}`);

  try {
    await orders.deleteOrder(req.params.id);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

export default router;
