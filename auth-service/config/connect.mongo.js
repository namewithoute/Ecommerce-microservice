const mongoose= require('mongoose')
require('dotenv').config()
function init(url){
    mongoose.connect(url)

    const conn = mongoose.connection;
    
    conn.on('error', () => console.error.bind(console, 'connection error'));
    
    conn.once('open', () => console.info('Connection to Database is successful'));
    
}

module.exports=init