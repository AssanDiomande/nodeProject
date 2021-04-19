var http = require('http');
var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const thingsRoute = require('./routes/Things');
const usersRoute = require('./routes/User');
const messageRoute = require('./routes/Message');
const auth = require('./middleware/auth');


/*
var EventEmitter = require('events').EventEmitter;

var server = http.createServer((req,res)=>{

	var event = new EventEmitter();

	event.on("greeting",(message)=>{
		console.log(message);
	});

	event.emit("greeting","Hello...");

	res.writeHead(200);
	res.end("message");
});
server.listen(5000);
*/

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/mongo",thingsRoute);
app.use("/user",usersRoute);
app.use("/message",messageRoute);
app.get("/socket",auth,(req,res)=>{
	res.sendFile(__dirname+"/views/index.html");
});
app.get("/login",(req,res)=>{
	res.sendFile(__dirname+"/views/connect.html");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://test:test@cluster0.1vnpk.mongodb.net/Cluster0?retryWrites=true&w=majority',
{
	useNewUrlParser: true,
   	useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on("connection",(socket)=>{
	console.log("utilisateur connecté");
});

server.listen(3000);