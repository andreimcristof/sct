
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
         token: '!',
         collection: Events,
         field: "title",
         options: '',
         matchAll: true,
         filter: { type: "autocomplete" },
         template: Template.autocompleteEvent
       }
    ]
    }
  };

}