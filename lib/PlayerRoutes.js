AddPlayerRoutes = function(router)
{
	router.route('player', {
		path: '/player/:_id',
		data: function(){return Players.findOne(router.params._id);}
	});

	router.route('playerSubmit', {
		path: 'playerSubmit'
	});

	router.route('playerEdit', {
		path:'player/:_id/edit',
		data:function(){return Players.findOne(router.params._id);}
	})
}