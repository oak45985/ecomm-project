const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Category.findAll({
      order: [['id', 'DESC']],
      attributes: [
        'id',
        'category_name'
      ],
      order: [['id', 'DESC']],
      include: [
        {
          model: Product,
          attributes: [
            'product_name',
            'price',
            'stock'
          ]
        }
      ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'product_name',
          'price',
          'stock'
        ]
      }
    ]
  })
  .then(dbSingleCategoryData => {
    if (!dbSingleCategoryData) {
      res.status(404).json({ message: 'No category found with id' });
      return;
    }
    res.json(dbSingleCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name }, 
    { 
    where: {
      id: req.params.id
    }
   })
   .then(dbUpdatedCategory => {
    if(!dbUpdatedCategory[0]) {
      res.status(404).json({ message: "No category with this ID" });
      return;
    }
    res.json(dbUpdatedCategory);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No category found at this ID'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
