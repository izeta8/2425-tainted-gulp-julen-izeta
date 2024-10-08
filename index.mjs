// -- API -- // 
import {getIngredients, getPlayerData} from './services/services.mjs'

// -- UTILITIES -- //
import {separator, printTitle, round, printUnderlined} from './utils/utils.mjs'

// -- Classes -- //
import Ingredients from './classes/Ingredients.mjs'
import Cauldron from './classes/Cauldron.mjs'
import PotionBag from './classes/PotionBag.mjs';
import Character from './classes/Character.mjs';

const execute = async() => {

    // Fetch data from API.
    const playerData = await getPlayerData();
    const ingredientsData = await getIngredients();

    // Create the ingredients object
    const ingredients = Ingredients.load(ingredientsData);

    // Create the cauldron object
    const cauldron = new Cauldron(ingredients);

    // Create potion bag
    
    // Validate fetched data.
    const player = playerData?.players[0]; 

    if (!player) throw new Error("There has been an error fetching playerData. No players found.");

    let red_pouch = player.pouch_red;

    const potionBag = PotionBag.create(red_pouch, cauldron);
    
    // Show the potions inside potionsBag instance.
    showPotions(potionBag);

    // ------------------ //

    // Create the character
    const joseph = Character.from(player, potionBag.potions);
    showCharacter(joseph);

}

execute();

const showCharacter = (character) => {
 
    console.log('\n')
    console.log(character.fullName)
    console.log('---------------------------------');

    console.log(`Health:       ${round(character.health)}`)
    console.log(`Magick:       ${round(character.magick)}`)
    console.log(`Stamina:      ${round(character.stamina)}`)

    let {potions} = character;

    potions.forEach((potion, index) => {

        console.log(`Potion ${index+1}: ${potion.name}`)
    });

    console.log("\n")
    
}

const showPotions = (potionBag) => {
    
    let {potions} = potionBag;

    potions.forEach(potion => {

        console.log(potion.name)
        console.log(`Value:       ${round(potion.value)}`)
        console.log(`Weight:      ${round(potion.weight)}`)
        console.log(`Time:        ${round(potion.time)}`)
        console.log('------------------------------');
    });

}

const potion_debugger = async () => {

    try {
        
        const data = await getIngredients();
        
        // Create ingredients
        const ingredients = Ingredients.load(data);
        
        // Show ingredients in console
        showIngredients(ingredients);

        // Create the cauldron
        const cauldron = new Cauldron(ingredients);
        
        // Create and show the potions in console

        printTitle("These are the created potions: \n");

        const potion1 = cauldron.createPotion("Elves Ear", "Ectoplasm");
        showPotion(potion1);

        const potion2 = cauldron.createPotion("Elves Ear", "Deathbell");
        showPotion(potion2);

        const potion3 = cauldron.createPotion("Elves Ear", "Crimson Nirnroot");
        showPotion(potion3);

        const potion4 = cauldron.createPotion("Ectoplasm", "Deathbell");
        showPotion(potion4);
        
        const potion5 = cauldron.createPotion("Ectoplasm", "Crimson Nirnroot");
        showPotion(potion5);
        
        const potion6 = cauldron.createPotion("Deathbell", "Crimson Nirnroot");
        showPotion(potion6);

    } catch (error) {
        console.log('There has been an error in execute(): ', error);
    }

}

// potion_debugger();

// const execute = async () => {
    
//     try {
        
//         const data = await getIngredients();
        
//         // Create ingredients
//         const ingredients = Ingredients.load(data);
        
//         // Show ingredients in console
//         showIngredients(ingredients);

//         // Create the cauldron
//         const cauldron = new Cauldron(ingredients);
        
//         // Create and show the potions in console

//         printTitle("These are the created potions: \n");

//         const potion1 = cauldron.createPotion("Bear Claws", "Bee");
//         showPotion(potion1);

//         const potion2 = cauldron.createPotion("Chicken's Egg", "Chaurus Eggs");
//         showPotion(potion2);

//         const potion3 = cauldron.createPotion("Chaurus Eggs", "Bleeding Crown");
//         showPotion(potion3);

//         const potion4 = cauldron.createPotion("Nightshade", "Ectoplasm");
//         showPotion(potion4);

//     } catch (error) {
//         console.log('There has been an error in execute(): ', error);
//     }
    
// }

// function showPotion(potion) {
//     console.log(`${potion.name}`);
//     console.log(`Value: ${potion.value}`);
//     console.log(`Weight: ${potion.weight}`);
//     console.log(`Time: ${potion.time}`);
//     console.log(separator);
// }

// // TASK: Create the function 'showIngredients()' that shows all the ingredients with each effects.
// const showIngredients = (ingredients) => {
    
//     try {
        
//         printTitle("TASK: Create the function 'showIngredients()' that shows all the ingredients with each effects.");

//         ingredients.ingredients.forEach(ingredient => {

//             console.log("\nIngredient:", ingredient.name)
            
//             console.log("\nEffects: ")
//             ingredient.effects.forEach(effect => {
//                 console.log(` -> ${effect.name}`);
//             });
//             console.log(`\n${separator}`);
//         });

//     } catch (error) {
//         console.log('There has been an error in showIngredients(): ', error);
//     }

// }



// execute();

