var graduation = new Date('06/4/2022 3:1 PM');
    
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    var now = new Date();
    var distance = graduation - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('countdown').innerHTML = "Graduation - " + days + ' days ';
    document.getElementById('countdown').innerHTML += hours + 'hrs ';
    document.getElementById('countdown').innerHTML += minutes + 'mins ';
    document.getElementById('countdown').innerHTML += seconds + 'secs';
}

timer = setInterval(showRemaining, 1000);

var birthday = new Date('10/20/2022 3:1 PM');
    
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var tim;

function showRemainin() {
    var now = new Date();
    var distance = birthday - now;
    if (distance < 0) {

        clearInterval(tim);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('birthday').innerHTML = "Birthday - " + days + ' days ';
    document.getElementById('birthday').innerHTML += hours + 'hrs ';
    document.getElementById('birthday').innerHTML += minutes + 'mins ';
    document.getElementById('birthday').innerHTML += seconds + 'secs';
}

tim = setInterval(showRemainin, 1000);