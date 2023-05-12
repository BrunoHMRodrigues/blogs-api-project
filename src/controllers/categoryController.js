const { categoryService } = require('../services');

const NAME_REQUIRED_CODE = 400;
const NAME_REQUIRED_MSG = '"name" is required';

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(NAME_REQUIRED_CODE).json({ message: NAME_REQUIRED_MSG });

  const category = await categoryService.createCategory(name);

  return res.status(201).json(category);
};

module.exports = {
  createCategory,
};