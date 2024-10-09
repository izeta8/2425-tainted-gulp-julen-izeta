import { printTitle, separator, printColor } from "../utils/utils.mjs";

class Character {

    constructor(fullName, health, magick, stamina, potions) {
        this.fullName = fullName;
        this.health = health;
        this.magick = magick;
        this.stamina = stamina;
        this.potions = potions;  
        this.gameHasEnded = false; // 
    }

    static from(playerData, potions) {
        let {name, health, magick, stamina} = playerData;
        let characterClass = playerData.class;   

        const fullName = `${name} the ${characterClass}`;

        return new Character(fullName, health, magick, stamina, potions);
    }

    printAttributes()
    {
        console.log(`Health: ${this.health}`);
        console.log(`Magick: ${this.magick}`);
        console.log(`Stamina: ${this.stamina}`);
    }

    checkGameHasEnded(drinkedPotionIndex)
    {
        // The potion of sanity has been drunk: the main objective of the game has been achieved and there is no point in continuing.
        if (this.potions[drinkedPotionIndex].constructor.name === "PotionOfSanity")
        {
            printColor(`\n${this.fullName} has found the Potion of Sanity. His mind is healed. Well done!!`, "green");
            this.gameHasEnded = true;
        }

        // The health attribute is less or equal to 0: Joseph has died.
        if (this.health <= 0) {
            printColor(`\n${this.fullName} has died`, "red");
            this.gameHasEnded = true;
        }

        // The magick attribute is less or equal to 0: Joseph has been drained of all his magic and X.G's chaos spell finishes him off.
        if (this.magick <= 0) {
            printColor(`\n${this.fullName} has been drained of all his magic and X.G's chaos spell finishes him off.`, "red");
            this.gameHasEnded = true;
        }

        // The stamina attribute is less than or equal to 0: Joseph is completely exhausted and can no longer move.
        if (this.stamina <= 0) {
            printColor(`\n${this.fullName} has lost all his stamina. He feels completely exhausted.`, "red");
            this.gameHasEnded = true;
        }

        // If all the potions on the list are drunk, and none of the above is true, the game is over.
        if (drinkedPotionIndex === this.potions.length-1)
        {
            printColor(`\n${this.fullName} has drunk all the potions of the bag. He has won!`, "green");
            this.gameHasEnded = true;
        }
    }

    drinkEmAll() {

        // Reset flag
        this.gameHasEnded = false;
        
        printTitle(`D. Joseph's Sip\n`)

        // Loop for each potion that the user has to apply each effect.
        this.potions.forEach((potion, index) => {
            
            if (!this.gameHasEnded)
            {
                console.log(separator);

                // Save what effects are applied to the player to show in console. 
                let appliedEffect;

                // If the potion is an instance of Potion class, and not FailedPotion or PotionOfSanity means that is a instace of class Potion (so is a Potion or Poison).
                if (potion.constructor.name === "Potion")
                {
                    // If potion is a Poison we have to rest the value, so we multiply by -1 to get the negative value. 
                    const poisonCoefficent = potion.name.toLowerCase().includes("poison") ? -1 : 1;
                    
                    if (potion.name.toLowerCase().includes("health")) { // Health potion
                        this.health += potion.value * poisonCoefficent;
                        appliedEffect = "health";
                    } else if (potion.name.toLowerCase().includes("magicka")) { // Magick potion
                        this.magick += potion.value * poisonCoefficent;
                        appliedEffect = "magick";
                    } else if (potion.name.toLowerCase().includes("stamina")) { // Stamina potion
                        this.stamina += potion.value * poisonCoefficent;
                        appliedEffect = "stamina";
                    } else {
                        // If is no one of the conditions above is fulfilled, sum 1 point to each attribute.
                        this.health += poisonCoefficent;
                        this.magick += poisonCoefficent;
                        this.stamina += poisonCoefficent;
                        appliedEffect = "heatlh, magick & stamina";
                    }

                    const effectTypeText = potion.name.toLowerCase().includes("poison") ? 'loses' : 'gains';

                    let gainedPonits = appliedEffect === "heatlh, magick & stamina" ? 1 : potion.value;

                    // -- Print console -- //
                    console.log(`${this.fullName} drinks ${potion.name} and ${effectTypeText} ${gainedPonits} points of ${appliedEffect} \n`);
                    
                    this.printAttributes();
                }

                // If is a Potion of Sanity
                if (potion.constructor.name === "PotionOfSanity")
                {
                    this.health += potion.value;
                    this.magick += potion.value;
                    this.stamina += potion.value;
                    
                    // -- Print console -- //
                    console.log(`${this.fullName} drinks Potion of Sanity and gains 1000 points of health, magick & stamina\n`);
                    
                    this.printAttributes();
                }

                // If is a Failed Potion
                if (potion.constructor.name === "FailedPotion")
                {
                    // -- Print console -- //
                    console.log(`Failed Potion. ${this.fullName} cannot drink\n`);
                    
                    this.printAttributes();
                }
                    
                this.checkGameHasEnded(index);
            }
            
        });

    }

}



export default Character