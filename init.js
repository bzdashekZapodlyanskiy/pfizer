


setTimeout(function(){
    $('#pervostol').addClass('slowLeft');
},550);

setTimeout(function(){
    $('#whiteCloud').addClass('expandOpen');
},1050);

setTimeout(function(){
    $('#greenCloud').addClass('expandOpen');
},1550);

setTimeout(function(){
    $('.auth-form').addClass('fadeIn');
},2050);

setTimeout(function(){
    $('#think').addClass('fadeIn');
},2550);

setTimeout(function(){
    $('#line').addClass('stretchRight');
},3050);

setTimeout(function(){
    $('.auth h3').addClass('fadeIn');
},3050);

setTimeout(function(){
    $('#arrow').addClass('bigEntrance');
},3250);




$(function($) {

    //iPAD Support
    (function ($) {


        $.fn.addTouch = function () {
            this.each(function (i, el) {
                $(el).bind('touchstart touchmove touchend touchcancel', function () {
                    //we pass the original event object because the jQuery event
                    //object is normalized to w3c specs and does not provide the TouchList
                    handleTouch(event);
                });
            });

            var handleTouch = function (event) {
                var touches = event.changedTouches,
                    first = touches[0],
                    type = '';

                switch (event.type) {
                    case 'touchstart':
                        type = 'mousedown';
                        break;

                    case 'touchmove':
                        type = 'mousemove';
                        event.preventDefault();
                        break;

                    case 'touchend':
                        type = 'mouseup';
                        break;

                    default:
                        return;
                }

                var simulatedEvent = document.createEvent('MouseEvent');
                simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
                first.target.dispatchEvent(simulatedEvent);
            };
        };

    })(jQuery);


    $('.draggable').addTouch();



})

$(document).ready(function() {

    $(".beep-load").click( function() {
        beeped();
        $(this).addClass("magic")
        $(".modal-sound").removeClass("modal-sound");
        console.log("beeped here");

    });

    var links = []

    /*Последовательность переходов*/
    var links = [];
    links[0] = false;
    links[1] = false;
    links[2] = false;
    links[3] = false;
    links[4] = false;
    links[5] = false;
    var linksString = links.join(' ');
    console.log("JSON", linksString);




    /*local_storage*/
    var now = new Date();
    var startTimeN = now.getTime();



    if ( (sessionStorage.time == undefined) || (sessionStorage.links == undefined) ) {
        sessionStorage.time = startTimeN.toString();
        sessionStorage.links = linksString;
    }

    dataHours = sessionStorage.time;
    console.log("data LOCALSTORAGE", dataHours);
    var savedLinks = sessionStorage.links.split(" ");
    console.log("JSON", linksString, savedLinks);
    var arrLinks = $(".link");
    for (var j = 0; j<= savedLinks.length; j++) {
        if (savedLinks[j]=="true") {
            $(arrLinks[j]).addClass("visited");
            console.log("ARRLINKS", savedLinks[j]);
        }
    }

/*ПЕРЕХОДЫ ПО ССЫЛКАМ*/
    $(".submit").click( function () {

        var num = $(this).attr("data-link");
        setTimeout(function() {
            $(".link-" + num).addClass("visited");

        }, 1000);
        savedLinks[num] = true;
        linksString = savedLinks.join(' ');
        sessionStorage.links = linksString;
        if (num == 5)
        {
            localStorage.removeItem(links);
        }
    });

    $(arrLinks).click( function() {
        var num = $(this).attr("id");
        var prevElemIsVisited = $("#" + (num-1)).hasClass("visited");
        if ( prevElemIsVisited || (num == 0)) {
            return true;
        } else {
            return false;
        }
    });


    /*AJAX*/
    $('#submit_5').click(function(){


        // finishTime - Время завершения
        var finishTime =  document.clockform.clock.value;
        console.log("finishTime", finishTime);
        document.clockform.clock.value='00:00:00.00';
        localStorage.clear();
        sessionStorage.clear();

        $(".result").addClass("modal_total");
        $("#totalTime").addClass("totalTime");


        setTimeout(function(){
            $("#totalTime").html(finishTime);
        },550);


        $.post(
            "/ajaxtest.php",
            {
                finishTime: finishTime,
                finish: true
            },
            onAjaxSuccess
        );

        function onAjaxSuccess(data)
        {
            // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
            console.log(data);
        }
    })









})

function trim(string) { return string.replace (/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }

var startDate;
var clocktimer;

function clearFields() {

    clearTimeout(clocktimer);
    document.clockform.clock.value='00:00:00.00';
    document.clockform.label.value='';
}

function clearALL() {
    clearFields();
    document.getElementById('marker').innerHTML = '';
}

function startTIME() {

    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();


    var ms = t%1000; t-=ms; ms=Math.floor(ms/10);
    t = Math.floor (t/1000);
    var s = t%60; t-=s;
    t = Math.floor (t/60);
    var m = t%60; t-=m;
    t = Math.floor (t/60);

    if (m<10) m='0'+m;
    if (s<10) s='0'+s;
    document.clockform.clock.value = m + ' ' + s;
    var timeNow = document.clockform.clock.value

    clocktimer = setTimeout("startTIME()",10);

}

function findTIME() {

    /*new Date(parseInt("dataHours"))*/
    startDate = new Date(parseInt(dataHours));

    startTIME();
    init=1;

};
findTIME();


