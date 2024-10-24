import { Router } from "express";
import { deleteProduct, getProduct, getProducts, newProduct, updateProduct, updateProductStock } from "../services/productsService.js";
import { getCategoryByName } from "../services/categoriesService.js";
import { handleError } from "../utils/handleErrors.js";
import authLoggedUser from "../middlewares/userAuth.js";
import { validateNewProduct, validateProduct } from "../validators/validate.js";

const router = Router();

router.post('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can add products');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateNewProduct(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    let category = req.body.category_id;
    category = await getCategoryByName(category);
    req.body = { ...req.body, category_id: category._id };
    const product = await newProduct(req.body);
    res.send(product);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.get('/', async (req, res) => {
  try {

    let products = await getProducts();
    res.send(products);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product = await getProduct(id);
    res.send(product);
  } catch (error) {
    return handleError(res, error);;
  }
})

router.put('/:id', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can edit products');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }

    const error = validateProduct(req.body);
    if (error) {
      let err = Error(error);
      err.status = 400;
      err.validator = 'Validation';
      return handleError(res, err);
    }

    const { id } = req.params;
    let product = await updateProduct(id, req.body);
    res.send(product);
  } catch (error) {
    return handleError(res, error);
  }
})

router.patch('/:id', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can update product stock');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const { id } = req.params;
    const { stock } = req.body
    let product = await updateProductStock(id, stock);
    res.send(product);
  } catch (error) {
    return handleError(res, error);
  }
})

router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isEmployee) {
        let error = Error('Only employees can delete products');
        error.status = 403;
        error.validator = 'Authorization';
        return handleError(res, error);
      }
    }
    const { id } = req.params;
    let product = await deleteProduct(id);
    res.send(product);
  } catch (error) {
    return handleError(res, error);;
  }
})

export default router;