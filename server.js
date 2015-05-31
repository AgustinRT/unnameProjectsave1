var express = require("express");
var unname = express();
var mongojs = require("mongojs");
var db = mongojs.connect("unnameDB", ["stages", "groundStorage", "characters", "objects"]);
var bodyParser = require("body-parser");

unname.use(express.static(__dirname + "/public"));
unname.use(bodyParser.json());

unname.get("/accessStages/:nameStage", function(req, res){
	var stageName = req.params.nameStage;
	console.log("stage: "+stageName);
	db.stages.find(
		{
			"nameStage" : stageName
		}, function(err, docs){
			if(err){
				console.log("Error by: ", err);
			}
			res.json(docs);
		}
	);

});
unname.get("/accessGrounds/:typeGround", function(req, res){
	var typeGround = req.params.typeGround;
	console.log("groundType: "+typeGround);
	db.groundStorage.find(
		{
			"typeGround" : typeGround
		}, function(err, docs){
			if(err){
				console.log("Error by: ", err);
			}
			res.json(docs);
		}
	);

});

unname.listen(3000);
console.log("server runing on port 3000");