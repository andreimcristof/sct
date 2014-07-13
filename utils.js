Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});


//console.log(Users.find({$or: [{email: 'some@mail.com'},{city: 'atlanta'}]}).fetch());


replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}