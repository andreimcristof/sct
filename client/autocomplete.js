
if (Meteor.isClient) {

Template.autoComplete.settings = function() {
  return {
   position: "bottom",
   limit: 10,
   rules: [
       {
         token: '',
         collection: Strategies, 
         field: "name",
         matchAll: true,
         template: Template.autocompleteStrategy
       },
       {
         token: '',
         collection: Events,
         field: "title",
         matchAll: true,
         template: Template.autocompleteEvent
       }
    ]
    }
  };

}