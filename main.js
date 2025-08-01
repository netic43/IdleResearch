var player = {
    knowledge: 0,
    totalRate: 0
}

function study() {
    player.knowledge++;
    $("#knowledge").html(player.knowledge);
}

function purchase(id) {0x4c3483F3200904E190B47bF4Dd9d70529049Cf07
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

$(function() {
    setInterval(autoKnowledge,100);
});
