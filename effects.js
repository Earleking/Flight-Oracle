/**
 * Created by Andy on 11/18/2017.
 */

var vid = document.getElementById("bgvid");


// Get the <datalist> and <input> elements.
var input = document.getElementById('ajax');

// Create a new XMLHttpRequest.
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        //console.log(myObj[0].country);
        for(i = 0; i < myObj.length;i++){
                // Create a new <option> element.
            var dataList = document.getElementById('json-datalist');
            var option = document.createElement('option');
                // Set the value using the item in the JSON array.
                option.label = (myObj[i].code + ", " + myObj[i].name + ", " + myObj[i].city).toString();
                option.value = (myObj[i].city + ", " + myObj[i].code).toString();
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);

        }

        //document.getElementById("ajax").innerHTML = myObj[0].country;

    }

}
xmlhttp.open("GET", "out.json", true);
xmlhttp.send();


if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute("autoplay");
}

function vidFade() {
    vid.classList.add("stopfade");
}

function getData() {
    var a = document.getElementById("month");
    var strm = a.options[a.selectedIndex].value;
    var b = document.getElementById("day");
    var strd = b.options[b.selectedIndex].value;
    var strma = (strm + "-" + strd).toString();
    var c = document.getElementById("hour");
    var strt = c.options[c.selectedIndex].value;
    var strc = document.myForm.myInput.value;


    // variable strm is month, strd is city,strma is month-day, strt is hour, strc is city, you can return here

    console.log(strma);
    var socket = io.connect('http://localhost:8080');
    socket.emit('dataRecieved', { city: strc, date: strma, time: strc});
    socket.on('showData', function(data) {
        console.log(data.percent);
        output(data.percent, data.time);
    });


}

function printPercentage(percentage){
    return percentage;
}

function printTime(time){
    return time;
}

function output(percentage, time){
    if(percentage <= 10 ) {
        document.getElementById("output").innerHTML= "It is very unlikely that there will be any delays";
        return;
    }
    document.getElementById("output").innerHTML= "There is a "+ percentage +"% chance your flight will be delayed. The average flight delay for these expected weather conditions is "+ time +" mins.";
}

function rightwrong() {
    var a = document.getElementById("month");
    var b = document.getElementById("day");
    var c = document.getElementById("hour");
    var strm = a.options[a.selectedIndex].value;
    var strd = b.options[b.selectedIndex].value;
    var strt = c.options[c.selectedIndex].value;
    n=new Date();
    y=n.getFullYear();
    m=n.getMonth()+1;
    d=n.getDate();

    if (document.myForm.myInput.value == ""){
        alert("Invalid Input! Try Again Please");
    }
    if(a.options[a.selectedIndex].defaultSelected){
        alert("Invalid Input! Try Again Please");
    }
    if(b.options[b.selectedIndex].defaultSelected){
        alert("Invalid Input! Try Again Please");
    }
    if(c.options[c.selectedIndex].defaultSelected){
        alert("Invalid Input! Try Again Please");
    }
    if(m>a.options[a.selectedIndex].value){
        alert("Invalid Date Entered, selected date has already passed! Try Again Please");
    }
    if((m==a.options[a.selectedIndex].value)&&(d>b.options[b.selectedIndex].value)){
        alert("Invalid Date Entered, selected date has already passed! Try Again Please");
    }

    else {
        getData();
    }
}

function disabler(){
    n=new Date();
    y=n.getFullYear();
    m=n.getMonth()+1;
    d=n.getDate();
    var a = document.getElementById("month");
    var strm = a.options[a.selectedIndex].value;
    var b = document.getElementById("day");
    var strd = b.options[b.selectedIndex].value;

    if((a.options[a.selectedIndex].value==02)){
        if(((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0)){
            b.options[30].disabled=true;
            b.options[31].disabled=true;
        }
        else {
            b.options[29].disabled=true;
            b.options[30].disabled=true;
            b.options[31].disabled=true;
        }

    }
    if ((a.options[a.selectedIndex].value==04)||((a.options[a.selectedIndex].value==06))||((a.options[a.selectedIndex].value==09))||((a.options[a.selectedIndex].value==11))){
        b.options[29].disabled=false;
        b.options[30].disabled=false;
        b.options[31].disabled=false;
        b.options[31].disabled=true;
    }
    if ((a.options[a.selectedIndex].value==01)||((a.options[a.selectedIndex].value==03))||((a.options[a.selectedIndex].value==05))||((a.options[a.selectedIndex].value==07))||((a.options[a.selectedIndex].value==08))||((a.options[a.selectedIndex].value==10))||((a.options[a.selectedIndex].value==12))){
        b.options[29].disabled=false;
        b.options[30].disabled=false;
        b.options[31].disabled=false;
    }
}






