
const positive_effects_tokens = ["Fortify", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"]

class Effect {

    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    static from(name) {
        return new Effect(
            name,
            positive_effects_tokens.some(token => name.includes(token)) ? 'beneficial' : 'harmful'
        )
    }

}

export default Effect