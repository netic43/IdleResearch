var player = {
    knowledge: 0,
    totalRate: 0
}

function study() {
    player.knowledge++;
}

function purchase(id) {
    for(res of workers) {
        if(res.id == id)
            if(player.knowledge >= res.cost) {
                player.knowledge-=res.cost;
                res.num++;
                res.cost = Math.ceil(res.cost * 1.75);
                player.totalRate += res.rate;
                updateRes(res);
                $("#knowledge").html(Math.floor(player.knowledge));
                $("#totalRate").html(player.totalRate + " knowledge per second");
            }
    }
}

function updateRes(obj) {
    $("#resNum"+obj.id).html(obj.num);
    $("#resCost"+obj.id).html(obj.cost);
}

function autoKnowledge() {
    player.knowledge += (player.totalRate/10);
    $("#knowledge").html(Math.floor(player.knowledge));
}

function saveTheGame() {
    var save = {
        knowledge: player.knowledge,
        totalRate: player.totalRate,
        workers: workers
    }
    localStorage.setItem("save", JSON.stringify(save));
    //console.log("game saved");
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));

    if(typeof savegame !== "undefined") player.knowledge = savegame.knowledge;
    if(typeof savegame !== "undefined") player.totalRate = savegame.totalRate;
    if(typeof savegame !== "undefined") workers = savegame.workers;

    for(res of workers) { 
        updateRes(res);
    }
    $("#totalRate").html(player.totalRate + " knowledge per second");
}

$(function() {
    if(localStorage.getItem("save")) {
        //console.log("there is a savegame")
        load();
    }

    setInterval(autoKnowledge,100);
});