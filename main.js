if (Meteor.isServer) {

  Meteor.startup(function () {


    Playpals.allow({
    update: function (userId, playpal) {
      if(playpal.userId == Meteor.userId())
        return true;
      else
        return false;
      }
    });
    //Playpals.remove({});

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


    Servers.remove({});
    if (Servers.find().count() === 0 ) { 
      Servers.insert( { name : "North America"} );
      Servers.insert( { name : "Europe"} );
      Servers.insert( { name : "Korea"} );
      Servers.insert( { name : "South-East Asia"} );
    }
    //end prefill 



    Meteor.publish("allPlayers", function () {
      return Players.find(); 
    });



    Meteor.publish("allPlaypals", function () {
      return Playpals.find(); 
    });


/*  Meteor.publish("ownPlaypal", function () {
      return  Playpals.findOne({"submitter": this.userId}); 
    });*/


  Meteor.publish("allRaces", function () {
      return Races.find(); 
    });

  Meteor.publish("allLeagues", function () {
      return Leagues.find(); 
    });

  Meteor.publish("allServers", function () {
      return Servers.find(); 
    });
});
}





if (Meteor.isClient) {
  Meteor.subscribe("ownPlaypal");

  Meteor.subscribe("allPlayers");
  Meteor.subscribe("allPlaypals");
  Meteor.subscribe("allRaces");
  Meteor.subscribe("allLeagues");
  Meteor.subscribe("allServers");
}

