import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

require('/imports/language')('Nippon');

import './nippon.html';

Template.Nippon.onRendered(() => {
  $('.ui.dimmer.prepare').fadeOut(300);
  $('.ui.panel.sign-in').hide();
  $('.ui.panel.main').show();
  
  $('.user-menu > .item').removeClass('selected');
  $('.user-menu > .item.nippon').addClass('selected');
});