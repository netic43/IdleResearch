var player = {
    knowledge: 0,
    totalRate: 0,
    cash: 0,
    gainMult: 0.1,
    prestigeCost: 2
}

function study() {
    player.knowledge++;
}

function purchase(id) {
    for(res of workers) {
        if(res.id == id)
            if(player.cash >= res.cost) {
                player.cash-=res.cost;
                res.num++;
                res.cost = Math.ceil(res.cost * 1.75);
                player.totalRate += res.rate;
                updateRes(res);
                $("#cash").html(Math.floor(player.cash));
                $("#totalRate").html(player.totalRate);
            }
    }
}

function sellKnowledge() {
    player.cash += Math.floor(player.knowledge*player.gainMult);
    player.knowledge = 0;
    $("#knowledge").html(Math.floor(player.knowledge));
    $('#cash').html(Math.floor(player.cash));
}

function updateRes(obj) {
    $("#resNum"+obj.id).html(obj.num);
    $("#resCost"+obj.id).html(obj.cost);
}

function autoKnowledge() {
    player.knowledge += (player.totalRate/10);
    $("#knowledge").html(Math.floor(player.knowledge));
    $('#cashGain').html(Math.floor(player.knowledge*player.gainMult));
}

function prestige() {
    if(workers[8].num >= player.prestigeCost) {
        for(res of workers) {
            for(base of baseWorkers) {
                if(res.id == base.id) {
                    res.num = base.num;
                    res.cost = base.cost;
                    $("#resNum"+res.id).html(res.num);
                    $("#resCost"+res.id).html(res.cost);
                }
            }
        }
        player.knowledge = 0;
        player.totalRate = 0;
        player.cash = 0;
        player.gainMult*=2;
        player.prestigeCost = Math.ceil(player.prestigeCost*2.5);
        $("#knowledge").html(Math.floor(player.knowledge));
        $("#totalRate").html(player.totalRate);
        $("#cash").html(Math.floor(player.cash));
        $("#gainMult").html(player.gainMult);
        $('#prestigeCost').html(player.prestigeCost);
    } else {
        console.log("Not enough PRAs!");
    }
}

function saveTheGame() {
    var save = {
        knowledge: player.knowledge,
        totalRate: player.totalRate,
        cash: player.cash,
        gainMult: player.gainMult,
        prestigeCost: player.prestigeCost,
        workers: workers
    }
    localStorage.setItem("save", JSON.stringify(save));
    //console.log("game saved");
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));

    if(typeof savegame !== "undefined") player.knowledge = savegame.knowledge;
    if(typeof savegame !== "undefined") player.totalRate = savegame.totalRate;
    if(typeof savegame !== "undefined") player.cash = savegame.cash;
    if(typeof savegame !== "undefined") player.gainMult = savegame.gainMult;
    if(typeof savegame !== "undefined") player.prestigeCost = savegame.prestigeCost;
    if(typeof savegame !== "undefined") workers = savegame.workers;

    for(res of workers) { 
        updateRes(res);
    }
    $("#cash").html(player.cash);
    $('#prestigeCost').html(player.prestigeCost);
    $("#totalRate").html(player.totalRate);
}

$(function() {
    if(localStorage.getItem("save")) {
        //console.log("there is a savegame")
        load();
    }
    $('#prestigeCost').html(player.prestigeCost);
    $('#gainMult').html(player.gainMult);
    setInterval(autoKnowledge,100);
});