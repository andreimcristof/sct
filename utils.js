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

makeRandomDate = function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//makeRandomDate(new Date(2012, 0, 1), new Date())
