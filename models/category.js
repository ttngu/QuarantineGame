module.exports = function(sequelize, DataTypes) {
    var Categories = sequelize.define("Categories", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
    }
    });
    return Categories;
  };