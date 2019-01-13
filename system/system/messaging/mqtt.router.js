'use strict';

const Rx = require('rxjs');
const SystemContext = require('../system.context');
const { SystemEventRouter, SystemNodeEventRouter } = require('./routers');

class MqttRouter {

  constructor() {}

  init(client) {
    this.client = client;
  }

  inbound(topic, message) {

    let [event] = topic.split('/');

    console.log("MqttRouter::Inbound");
    console.log("MqttRouter::Topic::" + topic)
    console.log('MqttRouter::Event::' + event);

    switch(event) {
      case 'system':
        SystemEventRouter.route(topic, message);
        break;
      case 'node':
        SystemNodeEventRouter.route(topic, message);
        break;
      default:
        break;
    }

  }

  outbound(topic, message) {
    console.log("MqttRouter::Outbound::Publishing new message");
    this.client.publish(topic, JSON.stringify(message));
  }

}

module.exports = new MqttRouter();
