import Potion from './classes/Potion.mjs'

class Cauldron {

    constructor(ingredients) {
        this.ingredients = ingredients;
    }

    createPotion(ingredient_name1, ingredient_name2) {
        const ingredient1 = this.ingredients.find(ingredient_name1);
        const ingredient2 = this.ingredients.find(ingredient_name2);

        const common_effects = ingredient1.findCommonEffects(ingredient2);

        // If two ingredients have no effects in common the result is a failed potion.
        if (common_effects.length === 0) return Potion.failed();    

        // If the mix of both potions is the sanity potion we return it.
        if (isPotionOfSanity(ingredient1, ingredient2)) return Potion.sanity();
        
        return Potion.with(
            common_effects[0],
            ingredient1.weight + ingredient2.weight,
            ingredient1.value + ingredient2.value
        );
    }
}

const isPotionOfSanity = (i1, i2) => {
    return i1.name === "Nightshade" && i2.name === "Ectoplasm" ||
           i2.name === "Nightshade" && i1.name === "Ectoplasm";
}

export default Cauldron;