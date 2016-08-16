import { Meteor } from 'meteor/meteor';
import Fiber from 'fibers';
import Future from 'fibers/future';

const child_process = require('child_process');
const exec = child_process.exec;

Meteor.methods({
  lstmp() {
    const fut = new Future();
    exec('ls -l /tmp', function (error, stdout, stderr) {
      new Fiber(function () {
        fut.return(stdout);
      }).run();
    });
    return fut.wait();
  },
});
