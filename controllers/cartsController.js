import { Router } from "express";
import { handleError } from "../utils/handleErrors.js";
import { addToCart, cleanCart, createCart, getCart } from "../services/cartsService.js";
import authLoggedUser from "../middlewares/userAuth.js";
import { validateCart } from "../validators/validate.js";

const router = Router();

router.post('/:id', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      let error = Error('Only system admins can add a cart');
      error.status = 403;
      error.validator = 'Authorization';
      return handleError(res, error);
    }

    const { id } = req.params;
    let cart = await createCart(id);
    res.send(cart);
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('Users can only view their own cart');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    let cart = await getCart(id);
    res.send(cart);
  } catch (error) {
    return handleError(res, error);
  }
});

router.patch('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('Users can only add products to their own cart');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateCart(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    let cart = await addToCart(id, req.body);
    res.send(cart);
  } catch (error) {
    return handleError(res, error);
  }
});

router.patch('/:id/empty', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('Users can only empty their own cart');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    let cart = await cleanCart(id);
    res.send(cart);
  } catch (error) {
    return handleError(res, error);
  }
})

// for when user attempts to delete a cart
router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    res.status(405).send('Not Allowed: Deleting carts not permitted');
  } catch (error) {
    return handleError(res, error);;
  }
})

export default router;