Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('allPlayers');}
});

Router.map(function(){
	
	AddHomeRoutes(this);

	this.route('allPlaypals', {
		path:'/playpals'
	});

	this.route('playpal', {
		path: '/playpal/:_id',
		data: function(){return Playpals.findOne(this.params._id);}
	});

	this.route('playpalSubmit', {
		path: 'playpalSubmit'
	});

	this.route('playpalEdit', {
		path:'playpal/:_id/edit',
		data:function(){ return Playpals.findOne(this.params._id);}
	})

	//AddPlayerRoutes(this);
	//AddPlaypalRoutes(Router);
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