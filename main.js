#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { async } from 'rxjs';
import { kingdomlist } from './kingdoms.js';
import { villageList } from './village.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const sleep1 = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const sleep2 = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

let villageName;
let condition = true;
let day = 1;
let population = 30;
let soldier = 10;
let gold = 500;
let popularity = 10;
let posting = "commander";
let holdings = [];
let raidDays = 0;
let food = 100;
let kingdomcheck = false;

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

  await sleep2();

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
console.log('food:'+chalk.red('%s'), food);
console.log('population:'+chalk.green('%s'), population);
console.log('day:'+chalk.blue('%s'), day);
console.log('soldiers:'+chalk.red('%s'), soldier);
console.log('popularity:'+chalk.blue('%s'), popularity);
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
      'trade',
      'organise feast',
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
    case 'trade':
      await trade();
      break;  
    case 'organise feast':
      await feast();
      break;  
    case 'exit':
      await exit();
      break;
  
    default:
      console.log('i am done');
  }
}

async function feast(){
  console.clear();
  await header();
  await sleep1();

  console.log(chalk.blue('Organizing feast increases your popularity but it will cost 100 gold'));
  const answers = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'You wanna organise the feast?\n',
    choices: [
      'yes',
      'no',
    ],
  });
  if(answers.choice == 'yes'){
     gold -= 100;
     popularity += 10; 
     day++; 
  }else{
     await theGame();
  }
}

async function trade(){
  console.clear();
  await header();
  await sleep1();

  const answers = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'What you wanna trade\n',
    choices: [
      'Buy: 200 food - 50 gold',
      'Sell: 200 food - 50 gold',
      'Go back'
    ],
  });
  if(answers.choice == 'Buy: 200 food - 50 gold'){
    food += 200;
    gold -= 50;
    day++;
  }else if(answers.choice == 'Sell: 200 food - 50 gold'){
    food -= 200;
    gold += 50;
  }else if(answers.choice == 'Go back'){
    await theGame();
  }
}

async function exit(){
  console.clear();
  await header();
  await sleep1();

  const answers = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'Are you sure you wanna exit\n',
    choices: [
      'yes i am done',
      'no ,who would exit?',
    ],
  });

  if(answers.choice == 'yes i am done'){
    console.log('You played ' + chalk.cyan(day) + '....' );
    console.log(chalk.cyan(population) + 'people miss you... ' );
    console.log('Meet you in valhala ' + chalk.cyan(posting) + '....' );
    await sleep2();
    condition = false;
  }else{
    await theGame();
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
    await sleep2();
    await theGame();
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

async function kingdom(){
  console.clear();
  await header();

  await sleep1();
  
  console.log('\n');
  console.log('note:'+chalk.red('Having more holdings determines your position each battle tekes 3 days to complete'));
  console.log(`
   ${chalk.blue('King')} - must have 3 or more holdings 
   ${chalk.blue('duke')} - must have 2 or more holdings 
   ${chalk.blue('commander')} - doesnt require any holdings 
  `);
  
  const answers = await inquirer.prompt({
    name: 'sol',
    type: 'list',
    message: 'choose what to do\n',
    choices: [
      'kingdoms and holdings',
      'attack',
      'Go back'  
    ],
  });
  if( answers.sol == 'Go back'){
    await theGame();
  }
  if( answers.sol == 'kingdoms and holdings'){
    kingdomlist.forEach(element => console.log(element.name + '(' + element.population +')' +' : ' + element.posting));
    await sleep2();
    await kingdom();
  }
  if( answers.sol == 'attack'){
    kingdomlist.forEach(element => 
      console.log(element.no+'.'+element.name + '(' + element.population +')' +' : ' + element.posting));

      const king = await inquirer.prompt({
        name: 'kingdom',
        type: 'list',
        message: 'select the kingdom to attack\n',
        choices: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7' 
        ],
      });
      let defender = parseInt(king.kingdom);
      for(const element of holdings){
          if(element == kingdomlist[defender - 1].name){
            kingdomcheck = true;
          }
      }
      if(kingdomcheck == true){
         console.log(chalk.yellow('This village already belongs to your kingdom'));
         await sleep();
         await kingdom();
      }else{
      if(soldier > kingdomlist[defender -1].soldier){

        holdings.push(kingdomlist[defender -1].name);
        kingdomlist[defender -1].holdedBy = villageName;
        kingdomlist[defender -1].gold /= 2;
        gold += kingdomlist[defender -1].gold;
        soldier = soldier - (soldier/5);
        kingdomlist[defender -1].soldier -= (kingdomlist[defender -1].soldier)/5;
        popularity += 5;
        day += 3;
        
        kingdomcheck = false;
        console.log('You '+chalk.green('Won') + ' the battle');
        await sleep();
      }else{
        gold /= 2;
        kingdomlist[defender -1].gold += gold;
        soldier = soldier - (soldier/5);
        kingdomlist[defender -1].soldier -= (kingdomlist[defender -1].soldier)/5;
        day += 3;
        
        kingdomcheck = false;
        console.log('You '+chalk.red('Lost') + ' the battle');
        await sleep();
      } 
    }
    }
  }

  async function raid(){
   console.clear();
   await header();

   await sleep1();
  
   console.log('\n');
   console.log('note:'+chalk.red('leaving your village for more days makes your kingdom vulnerable to attack'));
   console.log(`
   ${chalk.blue('Travel')} - it takes 1 day to travel to the land to raid 
   ${chalk.blue('attack')} - each village has its own days to raid 
   ${chalk.blue('choose wisely to return fast')} 
  `);

  const answers = await inquirer.prompt({
    name: 'sol',
    type: 'list',
    message: 'What do you choose to do?\n',
    choices: [
      'start the raid',
      'not today'  
    ],
  });
  
  if(answers.sol == 'start the raid'){
    day++;
    raidDays++;
    console.clear();
    
    console.log('note:'+chalk.green('We have reached the land lets show who we are'));
    await sleep();
    await raidlist();
  }else{
    await theGame();
  }

  }

  async function raidlist(){
    console.clear();
    await header();
    await sleep1();

    console.log('\n');
    console.log('note:'+chalk.red('1.With great popularity to earn greater the gold to raid but it wont be easier'));
    console.log('note:'+chalk.red('2.You can send a spy to see the battle stats and gold we can raid but it takes a day extra'));

    villageList.forEach(e => 
      console.log(e.id +'.'+e.name + '(' + e.popularity + ')' ));    
    
    const vil = await inquirer.prompt({
        name: 'village',
        type: 'list',
        message: 'select the village\n',
        choices: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          'return to our village' 
        ],
    });
    if(vil.village == 'return to our village'){
      day++;
      raidDays++;
      await raidCheck();
    }else{
    let i = parseInt(vil.village);
    console.clear();

    await header();
    await sleep1();
    console.log('\n');
    
    console.log('note:'+chalk.red('We are ready to attack '+ villageList[i-1].name));

    const vopt = await inquirer.prompt({
      name: 'vill',
      type: 'list',
      message: 'what are we gonna do?\n',
      choices: [
        'send a spy',
        'attack who cares', 
      ],
  });
    
    if(vopt.vill == 'send a spy'){
      day++;
      raidDays++;
      console.log('\n');

      console.log('soldiers:'+villageList[i-1].battle+'     gold:'+villageList[i-1].gold);
      console.log('\n');
      await sleep();

      const vopt1 = await inquirer.prompt({
        name: 'vill1',
        type: 'list',
        message: 'What are we gonna do?\n',
        choices: [
          'Lets raid',
          'Look for other village', 
        ],
      });

      if(vopt1.vill1 == 'Lets raid'){
           day +=  parseInt(villageList[i-1].day);
           raidDays += parseInt(villageList[i-1].day);
           let ratio = parseInt(soldier%villageList[i-1].battle) < 1 ? true : false;
           if(ratio == true){
            soldier = soldier - parseInt(soldier%villageList[i-1].battle);
            gold += villageList[i-1].gold;
            villageList[i-1].gold /= 2;
            villageList[i-1].attackDay = day;
            villageList[i-1].attacked++;
            popularity += villageList[i-1].popularity;
            console.log('raiding...');
            console.log('\n');

            console.log(chalk.green('The raid was successfull'));
            await sleep();
            await raidlist();
           }else{
            console.log('raiding...');
            console.log('\n');

            console.log(chalk.red('They are strong we lost some troops'));
            day++;
            raidDays++;
            soldier -= 5;
            await sleep();
            await raidlist();
           } 
      }else{
        await raidlist();
      }
    }else{
      day +=  parseInt(villageList[i-1].day);
      raidDays += parseInt(villageList[i-1].day);
      let ratio = parseInt(soldier%villageList[i-1].battle) < 1 ? true : false;
      if(ratio == true){
       soldier = soldier - parseInt(soldier%villageList[i-1].battle);
       gold += parseInt(villageList[i-1].gold);
       villageList[i-1].gold /= 2;
       villageList[i-1].attackDay = day;
       villageList[i-1].attacked++;
       popularity += villageList[i-1].popularity;
       console.log('raiding...');
       console.log('\n');

       console.log(chalk.green('The raid was successfull'));
       await sleep();
       await raidlist();
            }else{
              console.log('raiding...');
              console.log('\n');
  
              console.log(chalk.red('They are strong we lost some troops'));
              day++;
              raidDays++;
              soldier -= 5;
              await sleep();
              await raidlist();
             } 
    }        
  }
}


  async function populationcheck(){
    if(day % 10 == 0){
        population += 2 + parseInt(popularity/5);
    }
  }

  async function postingcheck(){
    if(holdings.length >= 3){
      posting = "King";
    }else if(holdings.length == 2){
      posting = "duke";
    }else if(holdings.length < 2){
      posting = "commander";
    }
  }

  async function raidCheck(){
    if(raidDays > 7){
      gold -= Math.random() * 500; 
    }
  }

  async function foodcheck(){
    food = food - population;
    food = food + ((population - soldier)* 1.5);
    if(food <= 0){
      console.log(chalk.red('people are starving'));
    }
  }

  console.clear();
  await welcome();
  await villageNamee();
  await intro();
  await header();
  while(condition){
    await populationcheck();
    await postingcheck();
    await foodcheck();
    await theGame();
  }
  
  

 