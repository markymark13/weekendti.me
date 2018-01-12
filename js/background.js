window.onload=function(){
var today = new Date();
var countdownDisplay =  document.getElementsByClassName("countdown")[0];
var countingDown = false;
var showingWeekend = false;

//
//  Returns Date object for next Day (0-6, Sun-Sat)
//  Sets the time on friday to the parameters (optional)
//  5pm default (except for Monday midnight)
//
function nextDay(day, hours, minutes, seconds, milliseconds) {
    if(day === 1) {
        hours = typeof hours !== 'undefined' ? hours : 0;
    } else {
        hours = typeof hours !== 'undefined' ? hours : 17;
    }
    minutes = typeof minutes !== 'undefined' ? minutes : 0;
    seconds = typeof seconds !== 'undefined' ? seconds : 0;
    milliseconds = typeof milliseconds !== 'undefined' ? milliseconds : 0;
    
    var D = new Date();
    D.setDate(today.getDate() + (7 + day - today.getDay()) % 7);
    D.setHours(hours);
    D.setMinutes(minutes);
    D.setSeconds(seconds);
    D.setMilliseconds(milliseconds);
    
    return D;
};


//
// Returns number of milliseconds until Friday
//
function millisecondsUntilNextDay(day) {
    return nextDay(day) - today;
};

//
// Convert milliseconds to days, hours, minutes, seconds
// Formats string for output
//
function millisecondsToString(ms) {
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / (60000)) % 60);
    var hours = Math.floor((ms / (3600000)) % 24);
    var days = Math.floor((ms / (86400000)) % 365);
    
    var secondsUnit = seconds === 1 ? " second" : " seconds";
    var minutesUnit = minutes === 1 ? " minute, " : " minutes, ";
    var hoursUnit = hours === 1 ? " hour, " : " hours, ";
    var daysUnit = days === 1 ? " day, " : " days, ";
    
    if (days === 0) {
        if (hours === 0) {
            if (minutes === 0) {
                return seconds + secondsUnit;
            }
            return minutes + minutesUnit + seconds + secondsUnit;
        }
        return hours + hoursUnit + minutes + minutesUnit + seconds + secondsUnit;
    }
    return days + daysUnit + hours + hoursUnit + minutes + minutesUnit + seconds + secondsUnit;
}

var weekendCountdownInterval = setInterval(function(){
    
    // if it's Saturday or Sunday or Friday after 5pm, display the weekend message
    if( (today.getDay() === 6 || today.getDay() === 0) || 
        (today.getDay() === 5 && today.getHours() >= 17)){
        if (!showingWeekend) {
            countingDown = false;
            showingWeekend = true;
            
            countdownDisplay.textContent = "YO, IT'S THE WEEKEND!";
        }
    } else if (!countingDown) { // start countdown
        showingWeekend = false;
        countingDown = true;
        
        var msToFriday = millisecondsUntilNextDay(5);
        countdownDisplay.textContent = millisecondsToString(msToFriday) + " until the weekend!";
        
        var countdownInterval = setInterval(function(){
            msToFriday -= 1000;
            if(msToFriday < 1000) {
                countdownDisplay.textContent = "YO, IT'S THE WEEKEND!";
                window.clearInterval(countdownInterval);
            }
            countdownDisplay.textContent = millisecondsToString(msToFriday) + " until the weekend!";
        },1000);
    }
    
}, 1000);
}