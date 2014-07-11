Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

