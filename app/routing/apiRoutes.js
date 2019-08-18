var friendsData = require('../data/friends.js');
console.log(friendsData);
module.exports = function(app) {
	//whenever the user goes to the api/tables url go ahead and display the tableData in json format
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
		console.log("friendsData[0].scores[0]: " + friendsData[0].scores[0]);

	});

	app.post('/api/friends', function(req, res) {
		console.log(req.body);

		var userData = {
      		name: "",
      		img: "",
      		difference: 20
    	};

		var newFriend = req.body;
	    var newImg = req.body.newImg;  
	    var newName = req.body.newName;
	    var newScores = req.body.scores;

	    console.log(newFriend);

	    console.log(newName);
	    console.log(newScores);
	    var friendCalc = 0;

	    for (var i = 0; i < friendsData.length; i++) {
	    	console.log(friendsData[i].friendName);
	    	friendCalc = 0;
			for (var j = 0; j < friendsData[i].scores.length; j++) {
				friendCalc += Math.abs(friendsData[i].scores[j] - newScores[j]);
				console.log("friendCalc: " + friendCalc);

				if (friendCalc < userData.difference) {
					userData.name = friendsData[i].friendName;
					userData.img = friendsData[i].friendImg;
					userData.difference = friendCalc;
					console.log("userData.name: " + userData.name);
					console.log("userData.difference: " + userData.difference);
				}
			}
		}

		friendsData.push(newFriend);
		res.json(userData);

  	});
  	
}