#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { async } from 'rxjs';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const sleep1 = (ms = 500) => new Promise((r) => setTimeout(r, ms));

let villageName;
let condition = true;
let day = 1;
let population = 50;
let soldier = 10;
let gold = 1000;
let popularity = 10;

async function villageNamee() {
  await sleep();

  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your village name?',
    default() {
      return 'village';
    },
  });

  villageName = answers.player_name;
}

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'This is a project on text based strategy game  \n'
  );

  await sleep();
  rainbowTitle.stop();

  await sleep();

  figlet('The Vikings', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

await sleep();
console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    Build and develop your village
    dont get ${chalk.bgRed('killed')}
    think wisely be the ${chalk.bgGreen('king')}...
  `);
}

async function intro(){
  
  const spinner = createSpinner('Loading...').start();
  await sleep();

  spinner.success({ text: `${villageName} created successfully` });

  await sleep();
  console.clear();
  
  console.log(`
    ${chalk.red('The Duke is dead')} 
    People in the ${villageName} are looking 
    for a leader to guide them ${chalk.yellow('victory')}
    people look at u with hope 
    let the new journey ${chalk.blue('begin')}...
  `);

  await sleep();

}

async function header(){
  console.clear();
  figlet('The Vikings', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

await sleep1();

console.log('gold:'+chalk.yellow('%s'), gold);
console.log('population:'+chalk.green('%s'), population);
console.log('day:'+chalk.blue('%s'), day);
console.log('soldiers:'+chalk.red('%s'), soldier);
}

async function theGame() {
  await header();

  await sleep1();

  const answers = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'Choose wisely what are u gonna do today\n',
    choices: [
      'train soldiers',
      'The kingdoms',
      'raid',
      'exit'
    ],
  });

  return handleAnswer(answers.choice);
}

async function handleAnswer(a){
  switch(a) {
    case 'train soldiers':
      await soldiers();
      break;
    case 'The kingdoms':
      await kingdom();
      break;
    case 'raid':
      await raid();
      break;
    case 'exit':
      condition = false;
      break;
  
    default:
      console.log('i am done');
  }
}

async function soldiers(){
  console.clear();
  await header();

  await sleep1();

  console.log('note:'+chalk.red('you can train at max 3 soldiers per day and each soldier train cost 5 gold'));
  console.log('\n');
  
  if(population/3 == soldier){
    console.log('no People are intrested in joining the army, you need more population');
  }else{
    let count = parseInt((population/3) - soldier) ;
    console.log(count + ' people are intrested in joining the army');

    if(count == 1){
      const answers = await inquirer.prompt({
        name: 'sol',
        type: 'list',
        message: 'select no of people to train\n',
        choices: [
          '1'  
        ],
      });
      if(answers.sol == '1' ){
        if(gold<0){
          console.log('you dont have enough gold to train \n');
        }else{
          gold = gold- 5;
          soldier = soldier + 1;
          day++;
        }
      }
    }

    if(count == 2){
      const answers = await inquirer.prompt({
        name: 'sol',
        type: 'list',
        message: 'select no of people to train\n',
        choices: [
          '1',
          '2'  
        ],
      });
      if(answers.sol == '1' || answers.sol == '2' ){
        if(gold<0){
          console.log('you dont have enough gold to train \n');
        }else{
          gold = gold- (5 * parseInt(answers.sol));
          soldier = soldier + (1 * parseInt(answers.sol));
          day++;
        }
      }
    }

    if(count >= 3 ){
      const answers = await inquirer.prompt({
        name: 'sol',
        type: 'list',
        message: 'select no of people to train\n',
        choices: [
          '1',
          '2',
          '3'  
        ],
      });
      if(answers.sol == '1' || answers.sol == '2' || answers.sol == '3' ){
        if(gold<0){
          console.log('you dont have enough gold to train \n');
        }else{
          gold = gold- (5 * parseInt(answers.sol));
          soldier = soldier + (1 * parseInt(answers.sol));
          day++;
        }
      }
    }

  }

  
  
}



  console.clear();
  // await welcome();
  // await villageNamee();
  // await intro();
  // await header();
  while(condition){
    await theGame();
  }
  

 