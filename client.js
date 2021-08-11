const messages = document.getElementById('messages');
const msgF = document.getElementById("msgF");


var socket = io('http://localhost:3000'  , { transports: ['websocket', 'polling', 'flashsocket'] });
socket.on('message',data=>{
    console.log(data);
    appendMsg(data)
})

socket.on("output-messages",data=>{
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            appendMsg(message.msg)
            
        });
    }
   
})

msgF.addEventListener("submit",e=>{
    e.preventDefault();
    socket.emit("chatmessage",msgF.msg.value);
    msgF.msg.value="";

})


function appendMsg(message){
    const html = `<div>${message}</div>`;
    messages.innerHTML +=html;


}