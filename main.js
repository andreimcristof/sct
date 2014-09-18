if (Meteor.isServer) {

  Meteor.startup(function () {

    //mocks
    
    //Players.remove({});
    //InsertMockPlayers();
    
    //Events.remove({});
    //InsertMockEvents();
    
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

    Timezones.remove({});
    if (Timezones.find().count() === 0 ) { 
        Timezones.insert( { value : "America/New_York", name :"EDT (Eastern Daylight Time)"} );
        Timezones.insert( { value : "Europe/Berlin", name :"CEST (Central European Summer Time)"} );
        Timezones.insert( { value : "Asia/Seoul", name :"KST (Korea Standard Time"} );
        Timezones.insert( { value : "Asia/Shanghai", name :"CST (China Standard Time"} );
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
      },
      
    remove: function (userId, playpal) {
      if(playpal.userId == Meteor.userId())
        return true;
      else
        return false;
      }
    });


    Meteor.publish("allPlayers", function () {
      return Players.find(); 
    });

    Meteor.publish("allPlaypals", function (pDate) {
      
      var dateFilter = GetWholeMonthFilterFromDate(pDate);      
      return Playpals.find(dateFilter); 
    });

    function GetWholeMonthFilterFromDate(pDate){
      var firstDayOfMonth = new Date(pDate.getFullYear(), pDate.getMonth(), 1);
      var lastDayOfMonth = new Date(pDate.getFullYear(), pDate.getMonth() + 1, 0);

      var dateFilter = 
      {
        "submitted": {"$gte": firstDayOfMonth, "$lte": lastDayOfMonth} 
      };
      return dateFilter;
    }
    

    Meteor.publish("allStrategies", function () {
      return Strategies.find(); 
    });


  /*  Meteor.publish("ownPlaypal", function () {
      return  Playpals.findOne({"submitter": this.userId}); 
    });*/


  Meteor.publish("allRaces", function () {
      return Races.find(); 
    });

 Meteor.publish("allTimezones", function () {
      return Timezones.find(); 
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
  
  var SubscriberHelper =
  {
    SubscribeToConstantCollections:function(){
      Meteor.subscribe("allTimezones");    
      Meteor.subscribe("allRaces");
      Meteor.subscribe("allBestAgainst");
      Meteor.subscribe("allLeagues");
      Meteor.subscribe("allServers");
    },

    SubscribeToDynamicCollections:function(){
      //Meteor.subscribe("allPlaypals");
      Meteor.subscribe("allStrategies");
      Meteor.subscribe("allEvents");  
    }
  };

  SubscriberHelper.SubscribeToConstantCollections();
  SubscriberHelper.SubscribeToDynamicCollections();

  var allPlaypalsHandle;

  Meteor.startup(function(){
    Deps.autorun(function(){
      //if(allPlaypalsHandle) 
      //  allPlaypalsHandle.stop();

      allPlaypalsHandle = Meteor.subscribe('allPlaypals',Session.get("selectedPlaypalDate"));
    })

    Session.set("selectedPlaypalDate",moment().utc().toDate());
  });

}