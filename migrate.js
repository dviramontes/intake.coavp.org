/**
	Migration procedure

	TODO:
	[x] - import data from csv file
	[ ] - create temporary collection for migrated collection
	[ ] - migrate sample 
	[ ] - normalize data (also rationalize?)
	[ ] - consider moving routine migration 
		  functions to .mongorc.js (~/.)
	[ ] - use grunt-ec2

	

**/


var path = require('path'),
    mongoose = require('mongoose'),
    colors = require('colors');

console.log("Running from:" + __dirname);

// establish connection
mongoose.connect("mongodb://localhost/local");
// connected db
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error".red));

// dbName  = database
// colName = collection
// catName = category lookup

var populateCollection = function(dbName, colName, catNameName){

	// get local db at localhost
	var col = db.getSiblingDB(dbName).getCollection(colName); 
	// print collection length/count
	print(col.count());

}

populateCollection("testdb", "intakes");


