import { Router } from "express";
import { getCategories, getCategory, getCategoryByName, newCategory, updateCategory } from "../services/categoriesService.js";
import { handleError } from "../utils/handleErrors.js";
import authLoggedUser from "../middlewares/userAuth.js";
import { validateCategory } from "../validators/validate.js";

const router = Router();

router.post('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can add a category');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateCategory(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const category = await newCategory(req.body);
    res.send(category);
  } catch (error) {
    return handleError(res, error);
  }
})

router.get('/', async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    try {
      const { name } = req.body;
      const category = await getCategoryByName(name);
      res.send(category);
    } catch (error) {
      return handleError(res, error);
    }
  } else {
    try {
      const categories = await getCategories();
      res.send(categories);
    } catch (error) {
      return handleError(res, error);
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategory(id);
    res.send(category);
  } catch (error) {
    return handleError(res, error);
  }
})

router.put('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can edit a category');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateCategory(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const category = await updateCategory(id, req.body);
    res.send(category);
  } catch (error) {
    return handleError(res, error);
  }
})

// for when user attempts to delete a category
router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    res.status(405).send('Not Allowed: Deleting categories not permitted');
  } catch (error) {
    return handleError(res, error);
  }
})

export default router;