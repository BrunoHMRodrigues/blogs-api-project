const categoryService = require('../services/categoryService');

const CATEGORY_NOT_FOUND_MSG = 'one or more "categoryIds" not found';

const verifyCategoryIds = async (categoryIds) => {
  const promises = categoryIds.map(async (categoryId) => {
    const result = await categoryService.getCategoryById(categoryId);
    return !!result;
  });

  const results = await Promise.all(promises);

  if (results.includes(false)) {
    return { type: 400, message: CATEGORY_NOT_FOUND_MSG };
  }

  return { type: null };
};

module.exports = verifyCategoryIds;