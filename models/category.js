module.exports = function(sequelize, DataTypes) {
    var Categories = sequelize.define("Categories", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      consequence: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    return Categories;
  };