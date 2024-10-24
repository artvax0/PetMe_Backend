import { Router } from "express";
import { getUser, getUserOrders, getUsers, login, registerUser, updateUser, updateUserOrders } from "../services/usersService.js";
import { handleError } from "../utils/handleErrors.js";
import authLoggedUser from "../middlewares/userAuth.js";
import { validateLogin, validateRegistry, validateUser } from "../validators/validate.js";

const router = Router();

router.post('/', async (req, res) => {
  try {
    const error = validateRegistry(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    const error = validateLogin(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const user = await login(email, password);
    res.send(user);
  } catch (error) {
    return handleError(res, error);
  }
})

router.get('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      let error = Error('Only an admin can get all users');
      error.status = 403;
      error.validator = 'Authorization';
      return handleError(res, error);
    }
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.get('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('A user cannot view other users');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.get('/:id/orders', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('A user cannot view other user orders');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const userOrders = await getUserOrders(id);
    res.send(userOrders);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.put('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('A user cannot update other users');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateUser(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const user = await updateUser(id, req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.patch('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id != id) {
        let error = Error('A user cannot update other user orders');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const user = await updateUserOrders(id, req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error);;
  }
})

export default router;