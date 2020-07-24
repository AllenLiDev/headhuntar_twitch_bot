const tmi = require('tmi.js');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const commands = {
  notFound: 'Type !Commands for list of available bot commands.',
  '!bot': 'I am a chat bot created by Headhuntar. Beep Boop'

}
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(user, userInfo, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // console.log(user, userInfo)

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName[0] === "!") {
    client.say(user, runCommand(commandName));
  }
}

const runCommand = (command) => {
  if (command === '!commands') {
    console.log(getCommands());
  }
  if (commands.hasOwnProperty(command)) {
    return commands[command];
  } else {
    console.log('command not found');
    return commands.notFound;
  }
}

const getCommands = () => {
  return Object.keys(commands);
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
