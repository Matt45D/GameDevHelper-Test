const fs = require('fs');

var express = require("express");
readline = require('readline');
google = require('googleapis');
request = require('request');
app = express();



var boardEntries = {}
  // Defining the request URL
  var options = {
      url: 'https://spreadsheets.google.com/feeds/cells/1F9-jrgmvlyA1SKTvklOITyTS0Yqdvb_LVfegmDEhNNE/1/public/values?alt=json'
	}
  // Using the request package to pull the information using the options object defined above
  request(options, callback);
  
  // Callback function logging the request body in the console if it was successful
  function callback(error, response, body){
    if (!error && response.statusCode == 200) {
		sheet = JSON.parse(body);
		
		var incr = 1;
		boardEntries[incr] = {};
		
		for (var i in sheet.feed.entry){
			data = sheet.feed.entry[i];
			
			var cell = data.title.$t;
			
		if(parseInt(cell.slice(1,cell.length)) != incr){
			incr++;
			boardEntries[incr] = {};
		}
		if(cell.slice(0,1) == "I"){
		
			boardEntries[incr].title = data.content.$t;
		
		}
		if(cell.slice(0,1) == "C"){
		
			boardEntries[incr].descrip = data.content.$t;
		
		}
		if(cell.slice(0,1) == "D"){
		
			boardEntries[incr].contact = data.content.$t;
		
		}
		if(cell.slice(0,1) == "E"){
		
			boardEntries[incr].dueDate = data.content.$t;
		
		}					
		if(cell.slice(0,1) == "F"){
		
			boardEntries[incr].status = data.content.$t.toLowerCase();
		
		}			
		if(cell.slice(0,1) == "G"){
		
			boardEntries[incr].owner = data.content.$t;
		
		}
		if(cell.slice(0,1) == "H"){
		
			boardEntries[incr].addit = data.content.$t;
		
		}
		if(cell.slice(0,1) == "B"){
			boardEntries[incr].category = data.content.$t;
		}
			
		}
	
	getStatusData(function(res){
		
		for(var i in boardEntries){
			if(res[i]){
				boardEntries[i].status = res[i].status;
				boardEntries[i].id = res[i].id;
			}
		}
		
	});
	
	}
  }


const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file =>file.endsWith('.js'));
const auth = require('./auth.json');
const config = require('./config.json');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
var devServer;

client.on('ready', () => {
	var channel = client.channels.get(config.reactChan);
	devServer = client;
	channel.fetchMessage(config.reactMsg)
  .then(message => {
		
	message.react('💻');
	message.react('📝');
	message.react('🎨');
	message.react('🎤');	
		
	/*	
	const filter = (reaction, user) => {
		return true;
	};
	
  	const collector = message.createReactionCollector(filter,{});

	collector.on('collect', (reaction, user) => {
		console.log(`Collected ${reaction.emoji.name} from ${message.author.tag}`);
		if(reaction.emoji.name === '👍'){
			message.reply('Oi! It worked!');
			let role = message.guild.roles.find(r => r.name === "Cool Dude");
			//console.log(message.author);
		//	message.guild.fetchMember(reaction.users[0]).then(member => {
			
		//		member.addRole(role).catch(console.error);
			
		//	}
		//	)
		//	.catch(console.error);
		
		
		
		}
	});
  */
  console.log(message.content)
  }
  )
  .catch(console.error);
  
	//channel.send(" What is your role in gamedevelopment? Share with everyone! React to this message to receive the realted roles!\n💻 - @Programmer\n🎤- @Musician\n🎨 - @Artist\n📝 - @Writer");

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', (reaction, user) => {
	
	console.log(reaction.message.id);
	if(reaction.message.id == config.reactMsg){
		
		if(reaction.emoji.name === '💻')
			var role = reaction.message.guild.roles.find(r => r.name === "Programmer");
		
		if(reaction.emoji.name === '🎨')
			var role = reaction.message.guild.roles.find(r => r.name === "Artist");
		
		if(reaction.emoji.name === '🎤')
			var role = reaction.message.guild.roles.find(r => r.name === "Musician");
		
		if(reaction.emoji.name === '📝')
			var role = reaction.message.guild.roles.find(r => r.name === "Writer");
		
		
		if(role){
			reaction.message.guild.fetchMember(user).then(member => {
			
				member.addRole(role);
			
			}
			).catch(console.error);
		}
	}
	console.log('reaction Added!');
	console.log(reaction.emoji.name);
	console.log(user.username);
});

client.on('messageReactionRemove', (reaction, user) => {
	
	console.log(reaction.message.id);
	if(reaction.message.id == config.reactMsg){
		
		if(reaction.emoji.name === '💻')
			var role = reaction.message.guild.roles.find(r => r.name === "Programmer");
		
		if(reaction.emoji.name === '🎨')
			var role = reaction.message.guild.roles.find(r => r.name === "Artist");
		
		if(reaction.emoji.name === '🎤')
			var role = reaction.message.guild.roles.find(r => r.name === "Musician");
		
		if(reaction.emoji.name === '📝')
			var role = reaction.message.guild.roles.find(r => r.name === "Writer");
		
		
		if(role){
		
			reaction.message.guild.fetchMember(user).then(member => {
			
					member.removeRole(role);
			
			}
			).catch(console.error);
		}
	}
	console.log('reaction removed!');
	console.log(reaction.emoji.name);
	console.log(user.username);
});


client.on('message', message => {
	
	if (!message.content.startsWith('!') || message.author.bot) return;

	const args = message.content.slice(1).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

//	const filter = (reaction, user) => {
//		return true;
//	};

	//const collector = message.createReactionCollector(filter, {});
	
	if(commandName == "help"){
	message.channel.send("To post a Quest on our quest board, fill out the form here: https://forms.gle/Hh7PcsBa8WLD745eA \nTo refresh the board, type !post or !updateboard. \nTo update a quest's status, type !update. This bot works in personal messages too.\nTo see all posts in a category, send !list followed by a category.");
	}
	
	if(commandName == "updateboard" || commandName == "post"){

		message.channel.send("We will update the information on the board! Requests will be sent to 'open', 'taken', or 'complete' based on their status. Quests with the status 'hidden' will not be displayed. In order to update a request, type !update. Use !help for help.");

		request(options, callback);
		
		for(i = 0; i < 2; i++){
		getStatusData(function(res){
			for(var i in boardEntries){
				if(!res[i]){
					console.log("dosn't exist!, adding");
					thisEntry = boardEntries[i];
					post = createEmbed(thisEntry.title, thisEntry.descrip, thisEntry.contact, thisEntry.dueDate, thisEntry.status, thisEntry.addit, thisEntry.category);
					
					if(boardEntries[i].status == "open"){
			
						var channel = devServer.channels.get(config.open);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "taken"){
			
						var channel = devServer.channels.get(config.taken);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "complete"){
			
						var channel = devServer.channels.get(config.complete);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else {
						updateStatus(i,boardEntries[i].status);
					}
				}
				else if(boardEntries[i].status != res[i].status){
					console.log(res);
					if(res[i].id){
						removePost(res[i].status, res[i].id);
					}
					thisEntry = boardEntries[i];
					post = createEmbed(thisEntry.title, thisEntry.descrip, thisEntry.contact, thisEntry.dueDate, thisEntry.status, thisEntry.addit, thisEntry.category);
					
					if(boardEntries[i].status == "open"){
			
						var channel = devServer.channels.get(config.open);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "taken"){
			
						var channel = devServer.channels.get(config.taken);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "complete"){
			
						var channel = devServer.channels.get(config.complete);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else {
						boardEntries[i].id = undefined;
						updateStatus(i,boardEntries[i].status);
					}
					
					//make channel the correct one to put it in.
							
					
					
				}
				
			}
			
			
		});
		}
	}

		
	//	updateStatus(1, "Ready");


		//post = createEmbed("title", "somone to help", "Team6\n kyle","please god help me now i", "Right now", "Active", "Please just sve me Im die");
	
		
//		message.channel.send(post).then(sent => { // 'sent' is that message you just sent
			//let id = sent.id;
			//console.log(id);
		//});
	
	if(commandName == "list"){
		if(args[0]){
			console.log(args[0]);
			console.log(boardEntries);
			for(var i in boardEntries){
				if(boardEntries[i].category == args[0] && boardEntries[i].status == "open"){
				console.log("buildin");
					thisEntry = boardEntries[i];
					post = createEmbed(thisEntry.title, thisEntry.descrip, thisEntry.contact, thisEntry.dueDate, thisEntry.status, thisEntry.addit, thisEntry.category);

					message.channel.send({embed:post});
				}
			}
		}
		else{
			
			message.channel.send("Type !list followed by a category to see all posts related to that category. The categories are Art, Music, Programming and Writing.");
		}
		
		
	}
	if(commandName == "update"){
				
				
				EntriesList = {};
				var incr = 0;
				for(var i in boardEntries){
					if(boardEntries[i].owner == message.author.id){
						EntriesList[incr] = i;
						incr++;
					}
					
				}
				
				var ownedList = "";
				
				for(var i in EntriesList){
					entry = EntriesList[i];
					var num = parseInt(i, 10) + 1;
					ownedList = ownedList + num.toString() + ": " + boardEntries[entry].title + "\n";
					
				}
			//	console.log(ownedList);
				
				if(args[0] == undefined || args[1] == undefined){
					message.channel.send("Here is a list of your posts:\n" + ownedList + "To update the status of a post, send the post number, then the new status. The status can be 'open', 'taken', 'complete' or 'hidden' (Example: !update 1 open)");
				}
				else{
					entry = EntriesList[parseInt(args[0],10) - 1];
					if(entry){
						
						boardEntries[entry].status = args[1];
						message.channel.send("The post's status has been be changed to " + args[1]);
						
					}
					else{
						message.channel.send("Sorry! We weren't able to update that. Make sure you are using the right number before the status. (ie, '!update 1 open'). Use !update for to see a list of your posts.");
					}
			
			getStatusData(function(res){
			for(var i in boardEntries){
				if(!res[i]){
					console.log("dosn't exist!, adding");
					thisEntry = boardEntries[i];
					post = createEmbed(thisEntry.title, thisEntry.descrip, thisEntry.contact, thisEntry.dueDate, thisEntry.status, thisEntry.addit, thisEntry.category);

					if(boardEntries[i].status == "open"){
			
						var channel = devServer.channels.get(config.open);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "taken"){
			
						var channel = devServer.channels.get(config.taken);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "complete"){
			
						var channel = devServer.channels.get(config.complete);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else {
						updateStatus(i,boardEntries[i].status);
					}
				}
				else if(boardEntries[i].status != res[i].status){
					console.log(res);
					if(res[i].id){
						removePost(res[i].status, res[i].id);
					}
					thisEntry = boardEntries[i];
					post = createEmbed(thisEntry.title, thisEntry.descrip, thisEntry.contact, thisEntry.dueDate, thisEntry.status, thisEntry.addit, thisEntry.category);
					
					if(boardEntries[i].status == "open"){
			
						var channel = devServer.channels.get(config.open);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "taken"){
			
						var channel = devServer.channels.get(config.taken);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else if(boardEntries[i].status == "complete"){
			
						var channel = devServer.channels.get(config.complete);
						sendAndSaveId(channel, i); 
						updateStatus(i,boardEntries[i].status);
					}
					else {
						boardEntries[i].id = undefined;
						updateStatus(i,boardEntries[i].status);
					}
				}

			// updateStatus(1, args[0]);
			 
			 //getStatusData(function(res){
				 //console.log(res);
			// });
			}
			});
		}
	}
	
	if (!client.commands.has(commandName)) return;
	
	
	
	const command = client.commands.get(commandName);	
	
	
	
	if (command.guildOnly && message.channel.type !== 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
	}
	
	if (command.args && !args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	// do the same for the rest of the commands...
});

updateStatus = function(id, status){
	
	boardStatus = {};
	boardEntries[id].status = status;
	
	for(var i in boardEntries){
		boardStatus[i] = {};
		boardStatus[i].id = boardEntries[i].id;
		boardStatus[i].status = boardEntries[i].status;
		boardStatus[i].messageId = boardEntries[i].messageId;
		
	}
	console.log("updating");
	const jsonString = JSON.stringify(boardStatus);
	fs.writeFile('./status.json', jsonString, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
		}
	});
	
}

getStatusData = function(cb){
	
	fs.readFile('./status.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customer = JSON.parse(jsonString);
       cb(customer);
	} catch(err) {
			console.log('Error parsing JSON string:', err)
		}
	});
}

removePost = function(board, messageId){
	
	if(board == "open"){
		var channel = devServer.channels.get(config.open);
		console.log(messageId);
		channel.fetchMessage(messageId)
		.then(message => {
			message.delete()
			.then(msg => console.log(`Deleted message from ${msg.author.username}`))
			.catch(console.error);
			
		});
		
	}
	if(board == "taken"){
		var channel = devServer.channels.get(config.taken);
		console.log(messageId);
		channel.fetchMessage(messageId)
		.then(message => {
			message.delete()
			.then(msg => console.log(`Deleted message from ${msg.author.username}`))
			.catch(console.error);
			
		});
		
	}
	if(board == "complete"){
		var channel = devServer.channels.get(config.complete);
		console.log(messageId);
		channel.fetchMessage(messageId)
		.then(message => {
			message.delete()
			.then(msg => console.log(`Deleted message from ${msg.author.username}`))
			.catch(console.error);
			
		});
		
	}
	
}
sendAndSaveId = function(channel, id){
	
		channel.send({embed:post}).then(sent => { // 'sent' is that message you just sent
		boardEntries[id].id = sent.id;
		updateStatus(id,boardEntries[id].status);
		}).catch(console.error);
}

	
createEmbed = function(title, description, contactInfo, dueDate, cond, addit, category){
   
   if(!title || title == ""){
		title = "None";
	}
	if(!description || description == ""){
		description = "None";		
	}
	if(!contactInfo || contactInfo == ""){
	    contactInfo = "None";
	}
	if(!dueDate || dueDate == ""){
		dueDate = "None";
	}
	if(!cond || cond == ""){
	    cond = "None";
	}
	if(!addit || addit == ""){
		addit = "None";
	}
	if(!category || category == ""){
	    category = "None";
	}
	console.log(addit);
	const embedPost = {
				color: 0x0099ff,
				title: title,
				url: 'https://www.ubcgamedev.com/',
				author: {
				name: 'Quest',
				icon_url: 'https://i.imgur.com/Pk6Xe30.png',
				url: 'https://www.ubcgamedev.com/',
				},
				description: description,
				thumbnail: {
					url: 'https://i.imgur.com/Pk6Xe30.png',
					},
				fields: [

					{
					name: "Category",
					value:  category,
					inline: false,
					},
					{
					name: 'Contact Info',
					value: contactInfo,
					inline: false,
					},
					{
					name: 'Due Date',
					value: dueDate,
					inline: true,
					},
					{
					name: 'Status',
					value: cond,
					inline:true,
					},
					{
					name: 'Additional Details',
					value: addit,
					inline: false,
					},
				],
				timestamp: new Date(),
				footer: {
				text: 'To post your own request, fill out the form here: https://forms.gle/Hh7PcsBa8WLD745eA/',
				icon_url: 'https://i.imgur.com/zSx1fuS.png',
				},
			}
		return embedPost;
}
client.login(auth.token);
