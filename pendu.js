letters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

document.addEventListener('keypress', (e) => {
    console.log( e.key );
    if(e.key=="Enter"){
        newGame();
    }
    else {
        majLetter(e.key);
    }
});

place = document.getElementById("lettersButtons");
for (var i=0; i<letters.length; i++){
    btn = document.createElement("input");
    btn.id=String.fromCharCode(65+i);
    btn.type="button";
    btn.onclick= function () {
        checkLetter(this.id);
    }
    btn.value=btn.id;
    btn.className="letterBtn";
    place.appendChild(btn);
}

window.onload = newGame();

function reset() {
    status="start";
    fails = 0;
    world =[];
    lenght=0;
    showWorld=[];
    worldTab=[];
    good=0;
    lettersDone=[];
    var buttons = document.getElementsByClassName("letterBtn");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    document.getElementById("result").innerText="";
}

function randomWorld(){
    worldsList =["PIKACHU","EVOLI","POKEDEX","DRACOLOSSE","PHYLLALI","MEW","RESHIRAM","ABSOL","EVOLUTION","MEWTWO","SUICUNE","ZACIAN","ZAMAZENTA","CHEN","BALL","DRACAUFEU","GIRATINA","PALKIA","DIALGA","ZEKROM","KELDEO","SULFURA","SABELETTE","FEUNARD","LEVIATOR","SALAMECHE","CARAPUCE","BULBIZARRE","SALARSEN","GALOPA","GALAR","DYNAMAX","GIGAMAX","LEGENDAIRES","ALOLA","TOXIZAP","FLAMBINO","OUISTEMPO","LARMELEON","TORTANK","SHINY","BAIES","KETELEERIA","SACHA","EUPHORBE","CHAMPION","ONDINE","FLORA","BARPAUD","BRASIGALI","RONDOUDOU","GROUDON","KYOGRE","JUNGKO","MIAOUSS","QULBUTOKE","CRABOMINABLE","CORVAILLUS"];
    worldsCount=worldsList.length;
    console.log(worldsCount);
    var ran = Math.random();
    ran= ran*worldsCount;
    ran = Math.ceil(ran)-1;
    world=worldsList[ran];
    worldTab=Array.from(world);
    return worldTab
}

function newGame() {
    reset();
    status="start";
    var x =document.getElementById("failsList").childElementCount;
    for (i=0; i<x; i++){
        document.getElementById("failsList").lastChild.remove();
    }
    world=randomWorld();
    console.log(world);
    showHiddenWorld();
}

function showHiddenWorld() {
    lenght=world.length;
    showWorld=[world[0]];
    for (var i=1; i<lenght-1; i++){
        showWorld.push("_");
    }
    showWorld.push(world[lenght-1]);
    checkLetter(world[0])
    checkLetter(world[lenght-1]);
    document.getElementById("world").innerText=showWorld.join("");
}

function majLetter(ltr) {
    ltr=ltr.toUpperCase();
    if(letters.includes(ltr)){
        checkLetter(ltr);
    }
}

function checkLetter(letter){
    document.getElementById(letter).disabled=true;
    if(!lettersDone.includes(letter)){

        if(fails<6 && status=="start"){
            if(!worldTab.includes(letter)){
                fails++;
                var addFail = document.createElement("input");
                addFail.type="checkbox";
                addFail.readOnly=true;
                addFail.value=fails+" Erreur";
                addFail.disabled="disabled";
                addFail.checked="checked";
                document.getElementById("failsList").appendChild(addFail);
                if(fails==6){
                    status="loose";
                    document.getElementById("result").innerText="TROP NUL, MÊME AVEC UNE MASTER BALL TU ÉCHOUES";
                    document.getElementById("world").innerText=world.join("");
                }
            }
            else {
                for(var y in worldTab){
                    if (worldTab[y]==letter){
                        showWorld[y]=letter;
                        good++;
                    }
                    document.getElementById("world").innerText=showWorld.join("");
                }
                if(good==lenght){
                    document.getElementById("result").innerText="ATTRAPEZ LES TOUS !";
                    status="win"
                }
            }
        }
        lettersDone.push(letter);
    }
}