Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'requestUnavailable', 
	waitOn: function() {return Meteor.subscribe('allPlayers');}
});

Router.map(function(){
	
	//AddHomeRoutes(this);

	this.route('home', {
		path:'/'
	});


	this.route('feedback', {
		path:'/feedback'
	});

	this.route('allPlaypals', {
		path:'/playpals'/*,
		waitOn: function(){ 
			Meteor.subscribe('allPlaypals',Session.get("selectedPlaypalDate")); 
		},
		action:function(){
			if(this.ready())
				this.render();
		}*/
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
	});

	this.route('eventSubmit', {
		path: 'eventSubmit'
	});

	this.route('event', {
		path: '/event/:_id',
		data: function(){return Events.findOne(this.params._id);}
	});

	this.route('strategy', {
		path: '/strategy/:_id',
		template: 'strategy',
		data: function(){return Strategies.findOne(this.params._id);}
	});
	

	AddLearnRoutes(this);
	AddRateReplayRoutes(this);
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