'use strict';

const start = async function () {

  const Hapi = require('hapi');
  const Path = require('path');
  const Hoek = require('hoek');
  
  const server = require('./server.js');
  const plugins = require('./server-plugins.js');
  const routes = require('./routes/routes.js');
  
  try {
    await server.register(plugins);
  } catch (err) {
    Hoek.assert(!err, err);
  }
  
  server.route(routes);
  
  try {
    await server.start();
  } catch (err) {
    Hoek.assert(!err, err);
  }

  console.log('Server running at: ', server.info.uri)

}

start();
