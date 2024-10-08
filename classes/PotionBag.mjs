

class PotionBag {

    constructor(potions) {
        this.potions = potions;
    }

    static create(ingredients, cauldron) {

        // Array of potions created with the mix of all the ingredients of the bag.
        let returnPotions = [];
        
        // Used ingredients will be pushed to this array to not repeat.
        let usedIngredients = [];
        
        // For each ingredient possible mixes, we create the posion and push to the returnPotions array.
        ingredients.forEach(mainIngredient => {
            
            usedIngredients.push(mainIngredient);
            
            for (let secondaryIngredient of ingredients)
            {
                // If the second ingredient is the same as the first, we jump to the next iteration becuase they are the same ingredient.
                // If the second ingredient is already in usedIngredients it means that, that combination has already been done, so we jump to the next iteration.
                if (secondaryIngredient === mainIngredient || usedIngredients.includes(secondaryIngredient)) continue

                let newPotion = cauldron.createPotion(mainIngredient, secondaryIngredient);
                returnPotions.push(newPotion);
            }
                
        });
        
        // ingredients example
        // red_pouch: 
        // ["Elves Ear", "Ectoplasm", "Deathbell", "Crimson Nirnroot"]
        
        return new PotionBag(returnPotions);

    }


}

export default PotionBag;