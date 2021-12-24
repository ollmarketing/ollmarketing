const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const app = express();
const path = require("path");

app.locals.basedir = __dirname;

app.on('mount', server => {
    app.database = server.database;
});

app.use(fileupload({
    useTempFiles: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '../../client/build')));

const checkAccess = (req, res, next) => {
    next();
    /*const origin = req.headers.referer ? req.headers.referer.split('/')[2] : undefined;

    if(origin === process.env.ORIGIN_URL) {
        
    } else {
        return res.status(401).json({error: 'Access denied'})
    } */
}

app.use('/api/admin', checkAccess, require('./routes/adminRoutes'));
app.use('/api/user', checkAccess, require('./routes/userRoutes'));
app.use('/api/blog', checkAccess, require('./routes/blogsRoutes'));
app.use('/api/broker', checkAccess, require('./routes/brokersRoutes'));
app.use('/api/report', checkAccess, require('./routes/reportsRouter'));
app.use('/api/upload', checkAccess, require('./routes/uploadRoutes'));
app.use('/api/trader', checkAccess,  require('./routes/tradersRouter'));
app.use('/api/idea', checkAccess, require('./routes/ideasRouter'));
app.use('/api/transaction', checkAccess, require('./routes/transactionRoutes'));
app.use('/api/price', checkAccess, require('./routes/priceRoutes'));


app.get('*', (req, res) => {			
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));			
});	


module.exports = app;