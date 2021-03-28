import express from 'express';
import Staff from '../services/staff';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const router = Router();

const staff = new Staff();

router.get('/', (req, res) => {
  res.json({
    availableMethods: ['GET /:id', 'POST /:id', 'PUT', 'DELETE /:id'],
  });
});

router.get('/:id?', async (req, res) => {
  console.log(`GET STAFF ${req.params.id}`);

  try {
    const employeeData = await staff.getEmployee(req.params.id);

    return res.json({
      employees: employeeData,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Generic server error',
      message: err.message,
    });
  }
});

router.post('/:id?', async (req, res) => {
  const employee = { _id: req.params.id, ...req.body };
  console.log('POST STAFF', employee);

  try {
    await staff.updateEmployee(employee);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.put('/:id?', async (req, res) => {
  const employee = { _id: req.params.id, ...req.body };
  console.log(`PUT STAFF ${req.params.id}`, req.body);

  try {
    await staff.addEmployee(employee);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE STAFF ${req.params.id}`);

  try {
    await staff.deleteEmployee(req.params.id);
    return res.json({
      ok: true,
    });
  } catch (err) {
    return errorResponse(err, res);
  }
});

export default router;
