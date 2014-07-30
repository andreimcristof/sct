Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('allPlayers');}
});

Router.map(function(){
	
	AddHomeRoutes(this);
	//AddPlayerRoutes(this);
	AddPlaypalRoutes(this);
	AddLearnRoutes(this);
	AddRateReplayRoutes(this);
	AddClanRoutes(this);
	AddEventRoutes(this);

});


var requireLogin = function(pause){
	if(!Meteor.user()){
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDeniedNeedLogin');
		
		pause();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'playpalSubmit'});
Router.onBeforeAction(requireLogin, {only: 'playerSubmit'});