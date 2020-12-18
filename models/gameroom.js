module.exports = function(sequelize, DataTypes) {
    var GameRoom = sequelize.define("GameRoom", {
      roomname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]
        }
      },
      user_list: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cons_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "points"
      },
      rounds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 10
      },
      start:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
    return GameRoom;
  };