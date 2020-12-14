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
    
}