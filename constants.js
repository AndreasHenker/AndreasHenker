
//abilities: base Ability [0], specialities [1...]
export const abilities = {
    abilityList: ["Agility", "Animal_Handling", "Athletics", "Awareness", "Cunning", "Deception", "Endurance", "Fighting", "Healing", "Knowledge", "Marksmanship", "Persuasion", "Status", "Stealth", "Survival", "Thievery", "Warfare","Will", "Language"],
    "Agility": ["Acrobatics", "Balance", "Contortions", "Dodge", "Quickness"],
    "Animal_Handling": ["Charm", "Drive", "Ride", "Train"],
    "Athletics":["Climb", "Jump", "Run", "Strength", "Swim", "Throw"],
    "Awareness": ["Empathy", "Notice"],
    "Cunning": ["Decipher", "Logic", "Memory"],
    "Deception": ["Act", "Bluff", "Cheat", "Disguise"],
    "Endurance": ["Resilience", "Stamina"],
    "Fighting": ["Axes", "Bludgeons", "Brawling", "Fencing", "Long_Blades", "Pole_Arms", "Short_Blades", "Shields", "Spears"],
    "Healing": ["Diagnose", "Treat_Ailment", "Treat_Injury"],
    "Knowledge": ["Education", "Research", "Streetwise"],
    "Marksmanship": ["Bows", "Crossbows", "Siege", "Thrown"],
    "Persuasion": ["Bargain", "Charm", "Convince", "Incite", "Intimidate", "Seduce", "Taunt"],
    "Status": ["Breeding", "Reputation", "Stewardship", "Tournaments"],
    "Stealth": ["Blend_In", "Sneak"],
    "Survival": ["Forage", "Hunt", "Orientation", "Track"],
    "Thievery": ["Pick_Lock", "Sleight_of_Hand", "Steal"],
    "Warfare": ["Command", "Strategy", "Tactics"],
    "Will": ["Concentrate", "Coordinate", "Dedication"],
    "Language": ["Native_language"],
    1:["Agility", "Acrobatics", "Balance", "Contortions", "Dodge", "Quickness"],
    2:["Animal Handling", "Charm", "Drive", "Ride", "Train"],
    3:["Athletics", "Climb", "Jump", "Run - every 2 points adds a yard to base move but can also be tested to sprint or endure a long distance run", "Strength - adds to damage with powerful weapons", "Swim", "Throw"],
    4:["Awareness", "Empathy", "Notice"],
    5:["Cunning", "Decipher", "Logic", "Memory"],
    6:["Deception", "Act", "Bluff", "Cheat", "Disguise"],
    7:["Endurance", "Resilience - Poison/Disease/Etc", "Stamina - Recovery from Wounds/Injuries"],
    8:["Fighting", "Axes", "Bludgeons", "Brawling", "Fencing", "Long Blades", "Pole-Arms", "Short Blades", "Shields", "Spears"],
    9:["Healing", "Diagnose", "Treat Ailment", "Treat Injury"],
    10:["Language"],
    11:["Knowledge", "Education", "Research", "Streetwise"],
    12:["Marksmanship", "Bows", "Crossbows", "Siege", "Thrown"],
    13:["Persuasion", "Bargain", "Charm", "Convince", "Incite", "Intimidate", "Seduce", "Taunt"],
    14:["Status", "Breeding", "Reputation", "Stewardship", "Tournaments - tested when hosting one"],
    15:["Stealth", "Blend In", "Sneak"],
    16:["Survival", "Forage", "Hunt", "Orientation", "Track"],
    17:["Thievery", "Pick Lock", "Sleight of Hand", "Steal"],
    18:["Warfare","Command", "Strategy - initiative in large scale battles", "Tactics - help others with their intitiave in small scale battle"],
    19:["Will","Concentrate", "Coordinate", "Dedication"]
}

//list abilities with available specialities
export function abilitiesAndSpecialities(ability = 1){
  let stat = abilities.abilityList[ability];
  console.log(stat.toUpperCase());
  let number_specialities = abilities[stat].length;
  console.log("Number of specialities: "+ number_specialities)
  console.log("---------")
  for (let i = 0; i < number_specialities; i++ ){
      console.log(abilities[stat][i])
  }
  console.log("---------")
}


//rollAndKeep
export function rollAndKeep(ability, stat = 2, spec = 0, bonus = 0, mod = 0, dX = 6){
  stat = parseInt(stat); //number of dice from stat
  spec = parseInt(spec); //number of dice from speciality
  bonus = parseInt(bonus); //number of bonus dice
  mod = parseInt(mod); //modifier to the final result
  dX = parseInt(dX); //which type of die to roll
  //window.alert(spec)
  let roll_times = 0;
  let rolls = [];
  let highestRolls = [];
  let discardedRoll = [];

  let result_area = document.getElementById("roll_result");
  let result_string = ""+ability+"\n";
  if (spec + bonus < stat){
    roll_times = stat + spec + bonus;
    //window.alert(roll);
  }
  else{
    roll_times = stat + stat;
  }
  
  console.log(`Roll ${roll_times}d${dX} and keep ${stat}.`);
  console.log("Let\'s do it: "+roll_times+"d"+dX+" keep the best "+stat+" rolls.");
  result_string += "roll "+roll_times+"d"+dX+" keep "+stat+"\n";
  for (let i = 1; i <= roll_times; i++) {
      let roll = Math.floor(Math.random() * dX) + 1;
      //console.log(roll);
      rolls.push(roll);
  }
    
    rolls.sort((a, b) => b - a);
    //console.log("Rolls:"+rolls.length)
    //console.log("Sorted rolls: "+rolls)
    for (let i = 0; i < rolls.length; i++) {
      if (i < stat){
        highestRolls.push(rolls[i]);
      }
      else {
        discardedRoll.push(rolls[i]);  
      }
      //console.log("Pushing: "+rolls[i])
      //console.log("Roll number: "+ i+" : "+ rolls[i]);
    }
    
    console.log("Kept rolls:", highestRolls);
    result_string += "kept: " + highestRolls;
    if (discardedRoll != 0){
      result_string += " discarded: "+ discardedRoll;
    }
    
    result_string += " ==> " + highestRolls.reduce((a, b) => a + b);
    result_area.innerText = result_string;
    console.log("Sum of kept rolls:", highestRolls.reduce((a, b) => a + b));
    if (discardedRoll.length > 0) {
      console.log("Discarded roll(s):", discardedRoll);
      console.log("Sum of discared rolls:", discardedRoll.reduce((a, b) => a + b));
    }
    return highestRolls.reduce((a, b) => a + b);
}

export function diceConverter(inputString) {
  const regex =  /([+\-]?\d+)/g; //stores only +/- numbers
  //const regex =  /([+\-]?\d+)|([a-zA-Z]+)/g;
  //  separates numbers, letters, operators: /([+\-]?\d+)|([a-zA-Z]+)|([+\-*/])/g;
  const matches = inputString.match(regex);

if (matches) {
  // Filter out any undefined values from the matches array
  const separatedValues = matches.filter(value => value !== undefined);
  return separatedValues;
}

return [];
}

//returned value [0,1,2,3,4,5,6,7] must be converted to [ [0,1,2], [3,4,5], [6,7,X] ] --> x,dX,mod
/* 

deconstructing strings, arrays and objects

take returned value
check its length = n
check 1st post if it is a number, store it in A [ [A][][] ,[][][],  ]
check if number --> store value 
check if letter --> go to next position
check if + or -  then check if next is number then check if next IS NOT letter -->
                    multiply by +/-1 --> store value
                if LETTER --> ADD "0" to C and start over with new Group


*/
const inputString = "12times   6+ - -12"; //[x=0, dX=1, mod=0] (default values)
const separatedValues = diceConverter(inputString);
console.log(parseInt(separatedValues[0])+"d"+parseInt(separatedValues[1])+"+"+parseInt(separatedValues[2]));
console.log(71%10)