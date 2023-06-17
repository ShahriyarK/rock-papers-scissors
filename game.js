const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  let commands = ['r', 'p', 's'];
  let fullCommands = ['Rock', 'Paper', 'Scissors']
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    let fullCommand = fullCommands[i];
    console.log(`  Type '${command}' for ${fullCommand}`);
  }
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

function getWinner(move1, move2) {
  if (VALID_MOVES[move1].winsAgainst === move2) {
    return 1;
  }
  else if (move1 === move2) {
    return 0;
  }
  return -1;
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIdx = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIdx];
}

function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  const winFactor = getWinner(cmd, cpu);
  if (winFactor === 1) console.log('You win!\n');
  if (winFactor === -1) console.log('You lose...\n');
  if (winFactor === 0) console.log('You tie.\n');
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]){
      const cpu = getCPUMove();
      const winFactor = getWinner(cmd, cpu);
      if (winFactor === 1) wins++;
      if (winFactor === -1) losses++;
      if (winFactor === 0) ties++;
      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
