if (Meteor.isServer) {

  Meteor.startup(function () {

    //mocks
    
    //Players.remove({});
    //InsertMockPlayers();
    
    Events.remove({});
    InsertMockEvents();
    
    Playpals.remove({});
    InsertMockPlaypals();

    //end mocks



    //prefill constants
    Strategies.remove({});
    InsertStrategies();

    Races.remove({});
    if (Races.find().count() === 0 ) { 
      Races.insert( { name : "Terran", objectType :"race"} );
      Races.insert( { name : "Zerg", objectType :"race"} );
      Races.insert( { name : "Protoss", objectType :"race"} );
    }

    Bestagainst.remove({});
    if (Bestagainst.find().count() === 0 ) { 
      Bestagainst.insert( { name : "Terran", objectType :"bestagainst"} );
      Bestagainst.insert( { name : "Zerg", objectType :"bestagainst"} );
      Bestagainst.insert( { name : "Protoss", objectType :"bestagainst"} );
    }

    Leagues.remove({});
     if (Leagues.find().count() === 0 ) { 
      Leagues.insert( { name : "Grandmaster", objectType :"league"} );
      Leagues.insert( { name : "Master", objectType :"league"} );
      Leagues.insert( { name : "Diamond", objectType :"league"} );
      Leagues.insert( { name : "Platinum", objectType :"league"} );
      Leagues.insert( { name : "Gold", objectType :"league"} );
      Leagues.insert( { name : "Silver", objectType :"league"} );
      Leagues.insert( { name : "Bronze", objectType :"league"} );
    }


    Servers.remove({});
    if (Servers.find().count() === 0 ) { 
      Servers.insert( { name : "North America", objectType :"server"} );
      Servers.insert( { name : "Europe", objectType :"server"} );
      Servers.insert( { name : "Korea", objectType :"server"} );
      Servers.insert( { name : "South-East Asia", objectType :"server"} );
    }
    //end prefill 


    
    //rights
    Playpals.allow({
    update: function (userId, playpal) {
      if(playpal.userId == Meteor.userId())
        return true;
      else
        return false;
      }
    });


    Meteor.publish("allPlayers", function () {
      return Players.find(); 
    });


    Meteor.publish("allPlaypals", function () {
      return Playpals.find(); 
    });
    

    Meteor.publish("allStrategies", function () {
      return Strategies.find(); 
    });


  /*  Meteor.publish("ownPlaypal", function () {
      return  Playpals.findOne({"submitter": this.userId}); 
    });*/


  Meteor.publish("allRaces", function () {
      return Races.find(); 
    });

  Meteor.publish("allBestAgainst", function () {
      return Bestagainst.find(); 
    });

  Meteor.publish("allLeagues", function () {
      return Leagues.find(); 
    });

  Meteor.publish("allServers", function () {
      return Servers.find(); 
    });

   Meteor.publish("allEvents", function () {
      return Events.find(); 
    });
});
}





if (Meteor.isClient) {
  Meteor.subscribe("ownPlaypal");

  //Meteor.subscribe("allPlayers");
  Meteor.subscribe("allPlaypals");
  Meteor.subscribe("allRaces");
  Meteor.subscribe("allBestAgainst");
  Meteor.subscribe("allLeagues");
  Meteor.subscribe("allServers");
  Meteor.subscribe("allStrategies");
  Meteor.subscribe("allEvents");
}

