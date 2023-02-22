const portfinder = require('portfinder');

const findAvailablePort = (startPort, endPort, cb) => {
  portfinder.basePort = startPort;

  const options = {
    port: startPort,
    stopPort: endPort
  };

  portfinder.getPort(options, (err, port) => {
    if (err) {
      cb(err);
    } else {
      cb(null, port);
    }
  });
}

module.exports = findAvailablePort


