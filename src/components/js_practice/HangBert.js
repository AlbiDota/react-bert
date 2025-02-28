//HangBert.java, men i javascript

//ordliste som inneholder ordene som skal gjettes
let ordliste = [
        "Ringnes","Hansa","Tuborg","Heineken",
        "Guinness","Corona","Carlsberg","Aass",
        "Grans","Seidel","Dahls"];

//velger tilfeldig ord fra ordlista
function tilfeldigOrd() {
    abc = Math.floor(Math.random() * ordliste.length);
    //console.log(abc);
    //console.log(ordliste[abc]);
    let ord0 = ordliste[abc];
    let ord1 = ord0.toUpperCase().replaceAll(/[A-Z]/g,"_");
    return [ord0, ord1];
}

let [ord0,ord1] = tilfeldigOrd();
//console.log(ord0); //originalen
//console.log(ord1); //caps lock

main = () => { //arrow function hype !!!!!
    console.log("Velkommen til HangBert!");
    console.log("Spillet er 'Hangman'\nog temaet er 'öl i butikk'");
    let count = 0;
    while (count < 7 && ord1.includes("_")) {
        console.log("\n" + ord1);
        console.log("Gjett en bokstav: ");

        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Gjett en bokstav: ", (input) => {
            //hangman(input);
            console.log(input);
            readline.close();
        });
        count++;
    }
}
main();