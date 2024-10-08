import Ingredient from "./Ingredient.mjs"

class Ingredients {

    constructor (ingredients) {
        this.ingredients = ingredients;
    }

    static load(data) {
        return new Ingredients(data.ingredients.map(Ingredient.from));
    }

    find(name) {
        
        const ingredient = this.ingredients.find(ingredient => ingredient.hasName(name));
        
        // If the ingredient is not found in the ingredients array throw exception.
        if (ingredient === undefined) throw new Error(`Unknown ingredient ${name}`);
    
        return ingredient;

    }

}

export default Ingredients