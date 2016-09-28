module.exports = function(client) {

  client.on('connection' , function(socket){
    console.log('A user '+ socket.id + 'connected');
//    client.emit('message' , 'A user connected');
  });

  client.on('disconnect' , function(socket){
    console.log('A user '+ socket.id + 'disconnected');
//    client.emit('message' , 'A user disconnected');
  });

  client.on('message' , function(msg){
    console.log('A user '+ socket.id + 'sent a message : '+msg );
//    client.emit('message' , 'message : '+msg);
  });
};
