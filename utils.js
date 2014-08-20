Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

Handlebars.registerHelper("readableTime", function(timestamp) {
	var hours = new Date(timestamp).getHours();
	hours = ("0" + hours).slice(-2);

	var minutes = new Date(timestamp).getMinutes();
	minutes = ("0" + minutes).slice(-2);
    return hours + ":" + minutes;
});


replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}



