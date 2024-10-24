import { Router } from "express";
import { changeOrderStatus, getOrder, getOrders, getOrdersFromUser, newOrder } from "../services/ordersService.js";
import { handleError } from "../utils/handleErrors.js";
import authLoggedUser from "../middlewares/userAuth.js";
import { validateOrder } from "../validators/validate.js";

const router = Router();

router.post('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (payload._id != id) {
      let error = Error('Cannot add an order for another user');
      error.status = 403;
      error.validator = 'Authorization';
      return handleError(res, error);
    }

    const error = validateOrder(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    let order = await newOrder(id, req.body);
    res.send(order);
  } catch (error) {
    handleError(res, error);
  }
})

router.get('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can view all orders');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    let orders = await getOrders();
    res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
})

router.get('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;

    let order = await getOrder(id, payload);
    res.send(order);
  } catch (error) {
    handleError(res, error);
  }
})

router.get('/user/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        if (payload._id != id) {
          let error = Error('Cannot view an other user orders');
          error.status = 403;
          error.validator = 'Authorization';
          return handleError(res, error);
        }
      }
    }
    let orders = await getOrdersFromUser(id);
    res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
})

router.patch('/:id', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can change an order status');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const { id } = req.params;
    let order = await changeOrderStatus(id, req.body);
    res.send(order);
  } catch (error) {
    handleError(res, error);
  }
})

router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    res.status(405).send('Not Allowed: Deleting orders not permitted');
  } catch (error) {
    handleError(res, error);
  }
})

export default router;