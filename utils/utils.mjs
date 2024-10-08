
const separator = "-------------------------";

function printTitle(title)
{
    console.log("\n\n=========================================\n");

    // Dark blue, bold and underlined.
    console.log('\x1b[34m\x1b[1m\x1b[4m%s\x1b[0m', title);
}

// Rounds the given number to 2 decimals.
function round(num) {
    return Math.round(num * 100) / 100;
}

function printUnderlined(text)
{
    // TODO
    console.log('"\x1b[4m"\x1b[0m', title);
}

export {separator, printTitle, round, printUnderlined}