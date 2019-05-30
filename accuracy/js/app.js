
$(document).ready(function () {
    $("#goButton").click(function () {
        init();
    });

});

function start() {
    $("#start").css('display', 'none');
    $("#score").css('display', 'block');
    $("body").css('cursor', 'none');
    $(document).off('click');
}

function final() {
    $("#score").css('display', 'none');
    $("#finalScore").css('display', 'block');
    $("#scoreSpan").html(player.getScore());
    $("body").css('cursor', 'initial');
    $(document).click(function () {
        restart();
    });
}

function restart() {
    $("#start").css('display', 'block');
    $("#finalScore").css('display', 'none');
    circle = new Circle();
    gameover = false;
    player.resetScore();
    $("#goButton").click(function () {
        init();
    });
}