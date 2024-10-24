import { Router } from "express";
import { handleError } from "../utils/handleErrors.js";
import { addPet, getPet, getPetByName, getPets } from "../services/petsService.js";
import authLoggedUser from "../middlewares/userAuth.js";

const router = Router();

router.post('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      let error = Error('Only system admins can add pets');
      error.status = 403;
      error.validator = 'Authorization';
      return handleError(res, error);
    }
    const pet = await addPet(req.body);
    res.send(pet);
  } catch (error) {
    handleError(res, error);
  }
})

router.get('/', async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    try {
      const { name } = req.body;
      const category = await getPetByName(name);
      res.send(category);
    } catch (error) {
      return handleError(res, error);;
    }
  } else {
    try {
      const pets = await getPets();
      res.send(pets);
    } catch (error) {
      return handleError(res, error);;
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await getPet(id);
    res.send(pet);
  } catch (error) {
    handleError(res, error);
  }
})

router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    res.status(405).send('Not Allowed: Deleting pets not permitted');
  } catch (error) {
    handleError(res, error);
  }
})

export default router;