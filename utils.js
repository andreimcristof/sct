Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toString('yyyy-MM-dd')
});