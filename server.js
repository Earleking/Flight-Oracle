var http = require('http');
var util = require('util');
var express = require('express'),
    app = express();
var Weather = require('../weatherApi');
var events = require('events');
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var path = require('path');
var spawn = require('child_process').spawn;
var weather = new Weather();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname + "/../")));
//app.use(express.static(path.join(__dirname + "/../")))

//app.use(express.static(__dirname + "/../node_modules/chart.js/dist"));
server.listen(8080);
//app.listen(8080);
console.log(__dirname);
app.get('/', function(req, res) {
    console.log(__dirname + "/Base.html");
    res.sendFile(__dirname + "/Base.html");
});

io.on('connection', function(socket) {
    //socket.emit('news', { hello: 'world' });
    socket.on('dataRecieved', function(data) {
        console.log("got: " + data.date);
        weather.getLocationCode(data.city.split(",")[0], function(code) {
            weather.getShortTerm(code, function(shortData) {
                //console.log(shortData);
                var period;
                var fullTime = parseInt(code.time);
                var wind, rain, snow, temp;
                if(20 <= fullTime || fullTime < 2) {
                    period = 1;
                }
                else if(2 <= fullTime && fullTime < 8) {
                    period = 2;
                }
                else if(8 <= fullTime && fullTime < 14) {
                    period = 3;
                }
                else {
                    period = 4;
                }
                for(weatherPeriod in shortData.data) {
                    var jsonData = shortData.data[weatherPeriod];
                    //console.log(jsonData);
                    if(jsonData.time.indexOf(data.date) !== -1) {
                        wind = jsonData.forecastArr[0].windSpeed;
                        rain = jsonData.rain;
                        snow = jsonData.snow;
                        temp = jsonData.tempMin;
                    }
                }
                if(rain == undefined) {
                    throw "did not find data";
                }
                //get python stuff
                console.log("ONTO PYTHON!!! Data is: " + wind + ", " + rain + ", " + snow + ", " +temp);
                util.log('something');
                var emitter = new events.EventEmitter();
                var prob, time;
                var process = spawn('python', ["runPrediction.py", wind, rain, snow, temp]);
                process.stdout.on('data', function (data){
                    var text = data.toString('utf8');
                    console.log("Prediction rate is: " + text);
                    util.log("k");
                    prob = text;
                    emitter.emit('done');
                }); 
                var process2 = spawn('python', ["runWaitingTime.py", wind, rain, snow, temp]);
                process2.stdout.on('data', function (data2) {
                    var t2 = data2.toString('utf8');
                    time = t2;
                    emitter.emit('done');
                });
                emitter.on('done', function() {
                    if(time != undefined && prob != undefined) {
                        socket.emit("showData", {percent: prob, time: time});                        
                    }
                })
                /*var process2 = spawn('python', ["durationCalc.py", wind, rain, snow, temp]);
                process.stdout.on('data', function (data){
                    var text = data.toString('utf8');
                    console.log("back: " + text);
                }); */
                //after that, socket emit back to site
            });
        });
    });
});

var exiter = function(data, ) {

}
