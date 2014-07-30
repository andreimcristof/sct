AddPlaypalRoutes = function(router)
{
	router.route('allPlaypals', {
		path:'/playpals'
	});

	router.route('playpal', {
		path: '/playpal/:_id',
		data: function(){return Playpals.findOne(router.params._id);}
	});

	router.route('playpalSubmit', {
		path: 'playpalSubmit'
	});

	router.route('playpalEdit', {
		path:'playpal/:_id/edit',
		data:function(){return Playpals.findOne(router.params._id);}
	})
}