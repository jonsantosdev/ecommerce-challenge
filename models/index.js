// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);
// Product.belongsTo(Category, {
//   foreignKey: '',
//   onDelete: '',
// });

// Categories have many Products
Category.hasMany(Product);
// Category.hasMany(Product, {
//   foreignKey: '',
//    onDelete: '',
// });



// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    // unique: false
  }
  // // Define an alias for when data is retrieved
  // as: '?_data'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  // unique:false
  }
    // // Define an alias for when data is retrieved
    // as: '?_data'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
