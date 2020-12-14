module.exports = function(sequelize, DataTypes) {
    var Card = sequelize.define("Card", {
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
    return Card;
  };
  //Category DataTypes.STRING
  //Body DataTypes.TEXT
  //Consequence DataTypes.NUMBER

  //Table: Consequence
  //Body DataTypes.STRING
  
//Lobby Set up
  //unique ID - gen
  //other users join based on lobby code
  //define consequence "shots", default:"points"
  //set up options:
    //endgame scenarios:
        //rounds x
        //phase II: first to x
    //deck selection by category
        //allows for future categories
        //let deck = query(* from cards where category: x)
    //phase II: custom cards, 
    //phase II: bonus
        //random shot (x chance)
        //last place prize (options)
            //punishments
  //start lobby on max players 8 or min 2 and manual start
    //Phase II: join an active lobby
  //Lobby x People
  //Username List 1-x
  //First card draws
  //Voting phase timed 60 seconds 
    //Populate button "vote"
    //select one and buttons go away
    //Display results at 30 seconds or once everyone voted
    //update scores, display "winner" 15 seconds
    //tie is both win, if everyone wins no one win
    //Go again animate card flip
    //Play 
    //On End Display final scores
    //Call an uber? if score > 10 google maps hospital, score > 99 funeral home (gg), start gofundme, obit