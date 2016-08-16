import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.result = new ReactiveVar();
  Meteor.call('lstmp', (err, res) => {
    if (err) {
      this.result.set(err.error);
    } else {
      this.result.set(res);
    }
  });
});

Template.hello.helpers({
  listing() {
    return Template.instance().result.get();
  },
});
