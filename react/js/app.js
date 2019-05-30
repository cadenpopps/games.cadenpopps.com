
var timeCounter;
var timeHistory = [];

$(document).ready(function () {
    $(document).click(function () {
        start();
    });
    $("body").css("cursor", "pointer");
});

function start() {
    $("#start").removeClass("active");
    $("#wait").addClass("active");
    $(document).off('click');
    wait();
}

function reset() {
    $(".active").removeClass("active");
    $("#start").addClass("active");
    $(document).off('click');
    $("body").css("cursor", "pointer");
    $(document).click(function () {
        start();
    });
}

function wait() {
    $("body").css("cursor", "not-allowed");
    let t = random(1000, 2000);
    console.log(t);
    $(document).click(function () {
        fast();
    });
    waiting = setTimeout(() => {
        click();
    }, t);
}

function click() {
    $("body").css("cursor", "pointer");
    $("#wait").removeClass("active");
    $("#click").addClass("active");
    $(document).off('click');
    timeCounter = millis();
    setTimeout(() => {
        $(document).click(function () {
            time();
        });
    }, 80);
}

function time() {
    $(document).off('click');
    let time = millis() - timeCounter;
    $("#yourTime>#timeSpan").html(time);
    timeHistory.push(time);
    $("#click").removeClass("active");
    $("#time").addClass("active");
    updateHistory();
    alignHistory();

    setTimeout(() => {
        $("body").css("cursor", "pointer");
        $(document).click(function () {
            reset();
        });
    }, 300);
}

function alignHistory() {
    let off = $("#yourTime>#timeSpan").offset();
    let l = off.left + ($("#yourTime>#timeSpan").width() / 2) - ($("#timeHistory").width() / 2);
    let t = off.top + $("#yourTime>#timeSpan").height();
    $("#timeHistory").offset({ top: t, left: l });
}

function updateHistory() {
    $("#timeHistory>ul").html("");
    for (let i = 0; i < timeHistory.length - 1; i++) {
        $("#timeHistory>ul").html("<li>" + timeHistory[i] + "</li>" + $("#timeHistory>ul").html());
        // inv = timeHistory.length - (i + 1);
        scale = timeHistory.length - i - 2;
        $($("#timeHistory>ul").children()[0]).css('font-size', Math.pow(.9, scale) + "em");
        $($("#timeHistory>ul").children()[0]).css('opacity', Math.pow(.9, scale));
    }
}

function fast() {
    clearTimeout(waiting);
    $(".active").removeClass("active");
    $("#fast").addClass("active");
    $("body").css("cursor", "not-allowed");
    $(document).off('click');
    setTimeout(() => {
        reset();
    }, 2500);
}