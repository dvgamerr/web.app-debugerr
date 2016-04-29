import { Meteor } from 'meteor/meteor';

import '../imports/startup/client';

const md5 		= require('md5');
const Q 			= require('q');

let SignalConnected = true;

const IdSignal = Meteor.setInterval(function(){
	let io = Meteor.status();
	if(SignalConnected != io.connected) {
		if(io.connected) {
			// hide preload
		} else {
			// show preload
		}
		SignalConnected = io.connected;
	}
}, 3000);


$.fn.extend({
  avatar: function(email, size) {
    size = size || 256;
    var url = '//www.gravatar.com/avatar/'+md5(email || 'none')+'?d=mm&s='+size;
    return $(this).css('background-image',"url('"+url+"')");
  }
});

window.T = {
	Call : function(name, param){
		let def = Q.defer();
	  let result = new MysqlSubscription(name, param, function() { 
	    if(result[0]) {
	    	// result[0]
	    	def.resolve(result[0]);
	    } else {
	    	def.resolve();
	    }
	  });
    return def.promise;
	},
	Timestamp : parseInt((new Date().getTime() / 1000)),
	Storage: function(key, setValue) {
		var getValue = null;
		try {
			if(typeof setValue === 'undefined') {
				getValue = window.localStorage.getItem(key);
				try { getValue = JSON.parse(getValue); } catch (e) { }
			} else if (typeof setValue === 'object') {
				getValue = JSON.stringify(setValue);
			} else {
				window.localStorage.setItem(key, setValue.toString());
			}
		} catch (e) { /* Browser not support localStorage function. */ }
		return getValue;
	},
	StorageClear: function(key){
		try {
			if(key == undefined) {
				$.each(window.localStorage, function(key,value){ window.localStorage.removeItem(key); }); 
			} else {
				localStorage.removeItem(key);
			}
		} catch (e) { /* Browser not support localStorage function. */ }
	}
}
