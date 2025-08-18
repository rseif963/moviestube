const mongoose = require("mongoose");

// moviestubeBackend

mongoose
   .connect('mongodb://localhost:27017/moviestubeBackend')
   .then(() => console.log('DB connection successfull')).catch(err=>{
    console.log(err)
   });