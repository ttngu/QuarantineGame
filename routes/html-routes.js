var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });

    app.get("/game", function(req, res){
        res.sendFile(path.join(__dirname, "../public/gamePage.html"));
    });
    app.get("/about", function(req, res){
        res.sendFile(path.join(__dirname, "../public/aboutPage.html"));
    });
    app.get("/contact", function(req, res){
        res.sendFile(path.join(__dirname, "../public/contactPage.html"));
    });
}