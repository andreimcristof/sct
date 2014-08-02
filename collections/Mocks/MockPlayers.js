

InsertMockPlayers = function()
{	
    if (Players.find().count() === 0 ) {   
      Players.insert( { name : "Sam", alias: "kane", race: "Zerg" } );
      Players.insert( { name : "Sasha", alias: "Scarlett", race: "Zerg" } );
      Players.insert( { name : "Conan", alias: "Suppy", race: "Zerg" } );
    }
}