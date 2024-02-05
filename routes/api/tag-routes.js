const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        // be sure to include its associated Product data
        include: [{ model: Product }]
      });
      
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        // be sure to include its associated Product data
        include: [{ model: Product }]
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create(req.body);
      // res.status(200).json(tagData);
      res.status(200).json({ message: 'Tag added!' });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
    // Calls the update method on the Book model
    Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name,
      },
      {
        // Gets the tag name on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTagName) => {
        // Sends the tag name as a json response
        res.json(updatedTagName);
      })
      .catch((err) => res.json(err));
  });

  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json({ message: 'Tag deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

