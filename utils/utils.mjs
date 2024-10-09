
const separator = "------------------------------";

function printTitle(title, header=false)
{
    console.log("\n");

    header && console.log("========================================\n");

    // Dark blue, bold and underlined.
    console.log('\x1b[34m\x1b[1m\x1b[4m%s\x1b[0m', title);
}

// Rounds the given number to 2 decimals.
function round(num) {
    return Math.round(num * 100) / 100;
}

function printUnderlined(text)
{
    console.log('\x1b[4m%s\x1b[0m', text);
}

function printColor(text, color)
{
    const colors = {
        green: '\x1b[32m%s\x1b[0m',
        red: '\x1b[41m%s\x1b[0m',
    }
    
    if (Object.keys(colors).includes(color)) {
        console.log(colors[color], text);
    } else {
        console.log(text);
    }
}

export {separator, printTitle, round, printUnderlined, printColor}