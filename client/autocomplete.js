
if (Meteor.isClient) {

Template.autoComplete.settings = function() {

  return {
   position: "bottom",
   limit: 10,
   rules: [
     {
       token: '#',
       collection: Strategies,
       field: "name",
       template: Template.autocompleteStrategy
     },
     {
       token: '@',
       collection: Events,
       field: "title",
       template: Template.autocompleteEvent
      }
    ]  
    }
  };
}