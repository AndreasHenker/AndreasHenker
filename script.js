
import {abilities} from "./constants.js";
import {rollAndKeep} from "./constants.js";
import {player_Grim, player_Erling, player_Bjorn, player_Ulv} from "./rpg_party.js";

let party = [player_Bjorn,player_Erling,player_Grim,player_Ulv];
let current_pc = party[0];

function main(current_player)
{

  function create_ability_sheet (ability, player){
    let char_sheet = document.getElementById("ability_sheet");
    let ability_class_str = "."+ability;
    let currentAbility ="";
/*
    currentAbility +=  `<div><details><summary>
    <button id="${ability}" type='roll' class='sheet-ability' style="width:210px;" value='2'>${ability}</button>
    </summary>`;
    let i = 0;
    abilities[ability].forEach(element => {
      currentAbility += `<button id = "${element}" type='roll' class='sheet-ability speciality ${ability}' style="width:150px;" value='${player[ability][i]}'>${element}</button>`;
      currentAbility +=  `</details></div>`;
    
*/   

    currentAbility +=  `<div class="ab-wrap">
    <button id="${ability}" type='roll' class='sheet-ability base-ability' style="width:210px;" value='2'>${ability}</button>`;
    let i = 0;
    abilities[ability].forEach(element => {
      currentAbility += `<button id ="${element}" type='roll' class='sheet-ability speciality ${ability}' style="width:150px;" value='${player[ability][i]}'>${element}</button>`;
      i += 1;      
    });
    
    char_sheet.innerHTML +=  `</div>${currentAbility}`;

  }

  function add_listener_by_ability (ability){
    let ability_class_str = "."+ability; 
    let rollAbilityEl = document.getElementById(ability);
    
    rollAbilityEl.addEventListener("click", function(){rollAndKeep(this.id, ability, rollAbilityEl.value);});
    document.querySelectorAll(ability_class_str).forEach(item => {
        item.addEventListener("click", event => {
          {rollAndKeep(item.id, document.getElementById(ability).id, document.getElementById(ability).value, item.value);}
        })
      })
    }

  document.getElementById("ability_sheet").innerHTML ="";
  abilities.abilityList.forEach(element => {
      create_ability_sheet(element, current_player);
      let i = abilities.abilityList.indexOf(element);
      document.getElementById(element).value = current_player.abilityList[i];
      if (Math.max(...current_player[element]) > 0){document.getElementById(element).style.color = "lightgray";}
  });

  abilities.abilityList.forEach(element => {
      add_listener_by_ability(element);
  });

  let name_tag = document.getElementById("name_pc");
  name_tag.innerText = `${current_player.name} (${current_player.age}) från ${current_player.house}`;
  name_tag.innerHTML += 
  `<div style="display: flex; justify-content: space-around;">
    <h6>Health: ${(current_player.abilityList[6]*3)} </h6>
    <h6>${current_player.armor} (AR: ${current_player.armor_rating})</h6>
    <h6>Combat Defense: ${(current_player.abilityList[0] + current_player.abilityList[2] +current_player.abilityList[3])} (+${current_player.shield}) </h6>
    <h6>Movement ${(current_player.mv - current_player.armor_bulk)}</h6>
  </div>`

  function populateButtons(type = ".speciality"){
    
    let total_abilities = document.querySelectorAll(type);

    total_abilities.forEach(element => { 
        let current = document.getElementById(element.id);
        current.innerHTML += ` (${element.value})`;
        if (element.value == "0"){
            current.style.display = "none";
          }
    });
  }
  populateButtons(".base-ability");
  populateButtons(".speciality");

}

function start(y){
  let current_pc = party[y];
  main(current_pc);
}

//start(2);

for (let i=0; i < party.length; i++){
  let pc_btn = document.getElementById(i)
  pc_btn.innerHTML = party[i].player;
  pc_btn.addEventListener("click", event => {
      start(i)}
    )
}