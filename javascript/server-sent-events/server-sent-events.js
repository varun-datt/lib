var fs = require('fs');
var http = require('http');

var connectionCounter = 1;

http.createServer(function(request, response) {

    if (request.url === '/') {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(fs.readFileSync('index.html'));
        response.end();

    } else if (request.url === '/events') {

        var thisConnection = connectionCounter++;
        var thisEvent = 1;

        console.log('Client connected to event stream (connection #' + thisConnection + ', Last-Event-Id: ' + request.headers['last-event-id'] + ') ' + new Date().toISOString());
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
        //    'Access-Control-Allow-Headers': '*'
            'Access-Control-Allow-Headers': 'X-Client-ID,X-Request-ID,X-NetBackup-Audit-Reason,Content-Type,Authorization,Access-Control-Request-Method,Access-Control-Request-Headers'
        //    'Cache-Control': 'no-cache', // let intermediaries know to NOT cache anything
         //   'Access-Control-Request-Method': '*',
        });

      console.log(request.method);

      if (request.method === 'OPTIONS') {
        response.end();
      } else {


      response.write('event: message\n');
      response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
      response.write('data: Server says hi! (event #' + thisEvent++ +' of connection #' + thisConnection + ')\n\n');

        var ticker = setInterval(function() {
            response.write('event: message\n');
            response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
            response.write('data: Server says hi! (event #' + thisEvent++ +' of connection #' + thisConnection + ')\n\n');
        }, 3000);

        request.on('close', function() {
            console.log('Client disconnected from event stream (connection #' + thisConnection + ') ' + new Date().toISOString());
            response.end();
            clearInterval(ticker);
        });
      }

    } else {

        response.writeHead(404);
        response.end();

    }

}).listen(8888);

