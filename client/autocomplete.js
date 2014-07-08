
if (Meteor.isClient) {

Template.autoComplete.settings = function() {
  return {
   position: "bottom",
   limit: 10,
   rules: [
     {
       token: '',
       collection: Players,
       field: "alias",
       template: Template.userPill
     },
     {
       token: '!',
       collection: Players,
       field: "_id",
       options: '',
       matchAll: true,
       filter: { type: "autocomplete" },
       template: Template.userPill
     }
   ]
  }
};

}