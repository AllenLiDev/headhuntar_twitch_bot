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
  switch (commandName) {
    case '!action':
      client.action(user, 'sociallink');
      break;
    case '!bot':
      client.say(user, `Im a chat bot created by @Headhuntar. Beep Boop.`);
      break;
    case '!youtube':
      client.say(user, `Check out my youtube channel https://www.youtube.com/channel/UC129b2Rxm14Zd33umONHZ-A`);
      break;
    case '!dice':
      client.say(user, `You rolled a number`);
      break;
    default:
      console.log(`* Unknown command ${commandName}`);
  }
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
