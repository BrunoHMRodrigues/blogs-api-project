const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  console.log('entrou no getBy');
  console.log('id', id);
  const category = await Category.findOne({ where: { id } });

  return category;
};

module.exports = {
  createCategory,
  getAll,
  getCategoryById,
};