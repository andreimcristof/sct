Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}