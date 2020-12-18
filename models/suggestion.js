module.exports = function(sequelize, DataTypes) {
    var Suggestion = sequelize.define("Suggestion", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
    }
    });
    return Suggestion;
  };