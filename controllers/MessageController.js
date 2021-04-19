const mongoose = require('mongoose');
const Message = require('../models/Message');

exports.sendMessage = (req,res)=>{
	const message = new Message({
		text : req.body.text,
		date : new Date()
	});

	message.save()
	.then(()=>{res.status(201).json({message: "message envoyé"})})
	.catch((error)=>res.status(400).json({erreur: error}));
};

exports.updateMessage = (req,res)=>{
	const message = new Message({
		text : req.body.text
	});

	message.modifyOne({_id: req.param._id}, message)
	.then(()=>{res.status(201).json({message: "message mis à jour"})})
	.catch((error)=>res.status(400).json({erreur: error}));
};

exports.deleteMessage = (req,res)=>{
	message.deleteOne({_id: req.param._id})
	.then(()=>{res.status(200).json({message: "message supprimé"})})
	.catch((error)=>res.status(400).json({erreur: error}));
};

exports.getAll = (req,res)=>{
	message.find()
	.then((message)=>{res.status(200).json({message})})
	.catch((error)=>res.status(404).json({erreur: error}));
};

exports.getOne = (req,res)=>{
	message.findOne({_id: req.param._id})
	.then((message)=>{res.status(200).json({message})})
	.catch((error)=>res.status(404).json({erreur: error}));
};

