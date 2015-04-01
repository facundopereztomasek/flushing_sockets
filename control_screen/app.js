var express = require('express'),
    exphbs  = require('express3-handlebars'),
    app = express(),
    server = app.listen(8000),
    
    io = require('socket.io').listen(server),

    hbs;

hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        saludo: function () { return 'Hey'; },
        bar: function () { return 'BAR!'; }
    },
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use("/images", express.static(__dirname + "/images"));
app.get('/', function (req, res, next) {
    res.render('home', {
        showTitle: true,

        // Override `foo` helper only for this rendering.
        helpers: {
            saludo: function () { return 'Hola!'; }
        },
        layout: false
    });
});

app.get('/screen', function (req, res, next) {
    res.render('screen');
});

app.get('/controls', function (req, res, next) {
    res.render('controls');
});

var screenClient;

io.on('connection', function(socket){
    
    console.log('a user connected');

    socket.emit('connection');
    
    socket.on('changeImage', function (data){
        screenClient.emit('loadImage' , data);
    });

    socket.on('screen', function (data){
        screenClient = socket;
        console.log('screen conectada');
    });

});

