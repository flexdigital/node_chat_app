const moment = require('moment');

var date = moment(1499628461399);
var someStamp = moment().valueOf();

console.log(someStamp);

console.log(date.format('MMM Do, YYYY h:mm a'));
console.log(date.fromNow());