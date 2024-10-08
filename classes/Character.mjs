
class Character {
    constructor(fullName, health, magick, stamina, potions) {
        this.fullName = fullName;
        this.health = health;
        this.magick = magick;
        this.stamina = stamina;
        this.potions = potions;  
    }

    static from(playerData, potions) {
        let {name, health, magick, stamina} = playerData;
        let characterClass = playerData.class;   

        const fullName = `${name} the ${characterClass}`;

        return new Character(fullName, health, magick, stamina, potions);
    }
}

export default Character