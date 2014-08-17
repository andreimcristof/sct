Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

makeRandomDate = function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//makeRandomDate(new Date(2012, 0, 1), new Date())
