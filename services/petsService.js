import config from 'config'
import Pet from '../models/collections/Pets.js'
import { createError } from '../utils/handleErrors.js';

const db = config.get('DB');

// [POST]
const addPet = async (petInfo) => {
  if (db === 'mongodb') {
    try {
      let findPet = await Pet.findOne({ name: petInfo.name });
      if (findPet) return createError('Bad Request', Error('Pet already exists'));
      let pet = new Pet(petInfo);
      pet = await pet.save();
      return pet;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getPets = async () => {
  if (db === 'mongodb') {
    try {
      let pets = await Pet.find();
      return pets;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getPetByName = async (name) => {
  if (db === 'mongodb') {
    try {
      let pet = await Pet.findOne({ name });
      return pet;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

const getPet = async (petId) => {
  if (db === 'mongodb') {
    try {
      let pet = await Pet.findById(petId);
      return pet;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  return configError('db');
}

export { addPet, getPets, getPetByName, getPet };