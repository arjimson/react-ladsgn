const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('config')
const cors = require('cors');

app.use(cors())
app.use(express.json())

// routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))


// connect to database
const db = config.get('mongoURI')

mongoose
    .connect(db,
        { useNewUrlParser: true
        , useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
    })
}

mongoose.set('useFindAndModify', false);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
