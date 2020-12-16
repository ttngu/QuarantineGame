var db = require("../models");

module.exports = function(app) {
    //get all Categories
    app.get("/api/categories", function(req, res) {
        db.Categories.findAll({}).then(function(dbCats) {
          res.json(dbCats);
        });
      });
    app.get("/api/cards", function(req,res){
        db.Card.findAll({}).then(function(dbCards){
            res.json(dbCards);
        })
    })
    app.get("/api/cards/:catid", function(req,res){
        db.Card.findAll({where: {
            category: req.params.catid
        }}).then(function(dbCardCat){
            res.json(dbCardCat)
        })
    })
    app.post("/api/gameroom/", function(req,res){
        db.GameRoom.create({
            roomname: req.body.lobbyCode,
            user_list: req.body.user,
            cons_name: req.body.cons,
            rounds: req.body.rounds
          }).then(function(data){
              res.json(data);
          })
    })
    app.get("/api/gameroom/:id", function(req,res){
        db.GameRoom.findAll({where: {roomname: req.params.id}}).then(function(data){
            res.json(data)
        })        
    })
    //update userList
    app.put("/api/gameroom/:id", function(req,res){
        console.log(req.body);
        db.GameRoom.update(
            {user_list: req.body.users}, 
            {where: {roomname: req.params.id}}).then(function(data){
            res.json(data);
        })
    })
    app.delete("/api/gameroom/:id", function(req,res){
        db.GameRoom.destroy({where: {roomname: req.params.id}}).then(function(data){
            res.json(data);
        })
    })
}