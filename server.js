const mongoose = require("mongoose");
const Msg = require("./models/messages");
var io = require('socket.io')(3000);
const mongoDB = "mongodb+srv://maria:marimo73@cluster0.tqasn.mongodb.net/chat-db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).then(()=>{
  console.log("connected");
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    Msg.find().then(result=>{
      socket.emit("output-messages", result)
    })
    console.log('a user connected');
    socket.emit('message',"Hello World");
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on("chatmessage", msg=> {
      const message = new Msg( {msg});
      message.save().then(()=>{
        io.emit('message',msg);

      })
      
    })
  });