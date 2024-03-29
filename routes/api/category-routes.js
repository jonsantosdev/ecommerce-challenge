const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

  // find all categories

// router.get('/', async (req, res) => {
//   try {
//     const categoryData = await Category.findAll();
//       // be sure to include its associated Products
//       include: [{ model: Product, through: ProductTag}]
//     res.status(200).json(categoryData);
     
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        // be sure to include its associated Products
        include: [{ model: Product }]
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // create a new category
  router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a category by its `id` value
  router.put('/:id', (req, res) => {
    // Calls the update method on the Book model
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      // Gets the categories based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategoryName) => {
      // Sends the updated category as a json response
      res.json(updatedCategoryName);
    })
    .catch((err) => res.json(err));
});


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      // res.status(200).json(categoryData); 
      res.status(200).json({ message: 'Category deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
