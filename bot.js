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

const headshot = () => {
  let percent = Math.floor(Math.random() * 100) + 1;
  if (percent === 99) {
    return '100%. headhu11Pog PogChamp headhu11Pog';
  }
  if (percent === 0) {
    return '0%. KEKW KEKW KEKW'
  }
  return `${percent}%`;
}

const commands = {
  notFound: 'Type !Commands for list of available bot commands.',
  '!bot': 'I am a chat bot created by Headhuntar. Beep Boop.',
  '!dev': 'Headhuntar is a Full Stack Developer. Check out my github @ https://github.com/AllenLiDev .',
  '!apex': 'I am a TTV Wraith Main LUL. My Highest Rank was Apex Predator in Season 2.',
  '!csgo': 'I solo queued to Global Elite longggg time ago on CS GO.',
  '!emotes': 'https://www.twitch.tv/ksen1y give her a follow!',
  '!valorant': 'On that Grind for Radiant, but I will be happy to hit Immortal 3! Tune in daily for the grind!',
  '!youtube': 'Check out and follow my youtube @ https://www.youtube.com/user/huntedhunter/',
  '!twitter': 'Its kinda dead but follow me for updates about next stream or irl stuff @ https://twitter.com/headhuntar',
  '!insta': 'Dont have',
  '!rank': 'Current Valorant Rank: D1. I working on it.',
  '!physio': 'Get some gaming physio and posture tips from 2 real physios @ https://www.twitch.tv/physiobros',
  '!marcus': 'Marcus the first MOD. Hes responsible for clipping my headhu11Pog plays.',
  // '!headshot': `Beep Boop. I calculated your name will result in a headshot percent of ${Math.floor(Math.random() * 100) + 1}`
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
