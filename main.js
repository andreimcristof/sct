if (Meteor.isServer) {

  Meteor.startup(function () {

    

    //prefill players dummy data    
    if(Players.find().count()>6)
    {
      Players.remove({});
    }

    if (Players.find().count() === 0 ) {   
      Players.insert( { name : "Sam", alias: "kane", race: "Zerg" } );
      Players.insert( { name : "Sasha", alias: "Scarlett", race: "Zerg" } );
      Players.insert( { name : "Conan", alias: "Suppy", race: "Zerg" } );
    }
    //end prefill players


    //publish players
    //Meteor.publish("onePlayerByAlias", function(alias)     {
    //  return Players.find({"alias":alias});
    //});

    Meteor.publish("allPlayers", function () {
      return Players.find(); 
    });


    //publish playpals
    Meteor.publish("onePlaypalBy", function(alias) {
      return Players.find({"alias":alias});
    });


    Meteor.publish("allPlaypals", function () {
      return Playpals.find(); 
    });


  Meteor.publish("ownPlaypal", function () {
      return  Playpals.findOne({"submitter": this.userId}); 
    });

});
}





if (Meteor.isClient) {
  Meteor.subscribe("ownPlaypal");

  Meteor.subscribe("allPlayers");
  Meteor.subscribe("allPlaypals");
}

