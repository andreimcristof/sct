InsertMockStrategies = function()
{

    if (Strategies.find().count() === 0 ) {   
      
      for(var i = 0; i < 20; i++)
      {
	      Strategies.insert( 
	      	{ 
	      		name : i + "rax", 
	      		race : "zerg",
	      		description: "somedescription", 
	      		wikiLink: "http://liquipedia.net",
	      		videoLink: "http://www.youtube.com",
	      		submitted: new Date().getTime() 
	      	});
	    }
    }
}