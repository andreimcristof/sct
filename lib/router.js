Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('allPlayers');}
});

Router.map(function(){
	
	//Players routes
	this.route('allPlayers', {
		path:'/'
	});

	this.route('player', {
		path: '/player/:_id',
		data: function(){return Players.findOne(this.params._id);}
	});

	this.route('playerSubmit', {
		path: 'playerSubmit'
	});

	this.route('playerEdit', {
		path:'player/:_id/edit',
		data:function(){return Players.findOne(this.params._id);}
	})



	//Playpal routes
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
		data:function(){return Playpals.findOne(this.params._id);}
	})
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