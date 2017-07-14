var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
var PythonShell = require('python-shell');
var options = {
    mode: 'text',
    scriptPath: '/',
    args: ['param1', 'value1', 'param2', 'value2']
};

/* var spawn = require('child_process').spawn,
    py    = spawn('python', ['my_script.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

py.stdout.on('data', function(data){
  dataString += data.toString();
});
py.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString);
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();
 */


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'c8886bd6-cb7b-4a1a-bd4f-ff17bf2514f9',
    appPassword: 'i4kKHhthf0fNMs8Wucrkdsm'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    pyShell = new PythonShell('my_script.py')
    pyShell.send(session.message.text);

    pyShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)  
        session.send("You said: %s", message);
    });
    pyShell.end(function (err) {
        if (err) {
            throw err;
        };
        console.log('finished');
    });
    // session.send("You said: %s", session.message.text);
});
