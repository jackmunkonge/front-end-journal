const express = require('express');
const resourceRoutes = require('./routes/resourceRoutes');
const config = require('./config');
const app = express();

app.set('port', config.app.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/public'));

exports.init = function() {
    // Routes
    app.use('/', resourceRoutes);

app.listen(config.app.port, () => console.log('App listening on port ' + config.app.port + '!'))
};
