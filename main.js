if (Meteor.isServer) {

  Meteor.startup(function () {

    

    //prefill  data    
    Players.remove({});
    if (Players.find().count() === 0 ) {   
      Players.insert( { name : "Sam", alias: "kane", race: "Zerg" } );
      Players.insert( { name : "Sasha", alias: "Scarlett", race: "Zerg" } );
      Players.insert( { name : "Conan", alias: "Suppy", race: "Zerg" } );
    }

    

    Races.remove({});
    if (Races.find().count() === 0 ) { 
      Races.insert( { name : "Terran"} );
      Races.insert( { name : "Zerg"} );
      Races.insert( { name : "Protoss"} );
    }

    Leagues.remove({});
     if (Leagues.find().count() === 0 ) { 
      Leagues.insert( { name : "Grandmaster"} );
      Leagues.insert( { name : "Master"} );
      Leagues.insert( { name : "Diamond"} );
      Leagues.insert( { name : "Platinum"} );
      Leagues.insert( { name : "Gold"} );
      Leagues.insert( { name : "Silver"} );
      Leagues.insert( { name : "Bronze"} );
    }
    //end prefill 



    Meteor.publish("allPlayers", function () {
      return Players.find(); 
    });



    Meteor.publish("onePlaypalBy", function(alias) {
      return Players.find({"alias":alias});
    });


    Meteor.publish("allPlaypals", function () {
      return Playpals.find(); 
    });


  Meteor.publish("ownPlaypal", function () {
      return  Playpals.findOne({"submitter": this.userId}); 
    });


  Meteor.publish("allRaces", function () {
      return Races.find(); 
    });

  Meteor.publish("allLeagues", function () {
      return Leagues.find(); 
    });
});
}





if (Meteor.isClient) {
  Meteor.subscribe("ownPlaypal");

  Meteor.subscribe("allPlayers");
  Meteor.subscribe("allPlaypals");
  Meteor.subscribe("allRaces");
  Meteor.subscribe("allLeagues");
}

