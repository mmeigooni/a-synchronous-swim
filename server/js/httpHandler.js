const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue')

// require messageQueue
// in our if it's a GET
  // dequeue from the messages

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.url === '/') {
    res.writeHead(200, headers);
    if (req.method === 'GET') {
      let dequeuedMessage = messageQueue.dequeue();
      if(dequeuedMessage) {
        res.write(dequeuedMessage);
      } else {
        res.write('Nothing in the queue');
      }
    }
    res.end();
    next()
  } else if (req.url === '/background') {
    if (req.method === 'GET') {
      // console.log('background win');
      // console.log(fs.readFile('./background.jpg'));
      fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(fileData, 'binary');
        }
        res.end();
        next()
      });
    }
    if (req.method === 'POST') {
      var imageData = Buffer.alloc(0);
      req.on('data', (chunk) => {
        imageData = Buffer.concat([imageData, chunk]);
      });
      req.on('end', () => {
        var file = multipart.getFile(imageData);
        fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
          if (err) {
            res.writeHead(404, headers);
          } else {
            res.writeHead(200, headers);
          }
          res.end();
          next();
        });
      });
    }
  }
  // invoke next() at the end of a request to help with testing!
};

// create a helper function that generates a random direction

