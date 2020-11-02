$(document).ready(function() {
    console.log("rock and roll");
var searchBtn = document.getElementById("search");
var hideAndShow = document.getElementById('hideAndShow')
hideAndShow.setAttribute("style", "display:none;");
//if there's nothing in local storage set an empty array, if there is something in local storage then grab it //
let cityList = !localStorage.getItem('city list') ? [] : JSON.parse(localStorage.getItem('city list'));

//setting up local storage to make a list for each area inputted //
const renderList = () => {
    cityList.map(city => {
        const cityBtn = $('<tr><td class="city-btn></td></tr>')
        $('.city-list').prepend(cityBtn.text(city))
    })
}
renderList();
var apiKey = "08b42de4b22b623511bd55d7959c6438"

var table = document.getElementById('table');
var wipeBtn = document.getElementById('clearStorage');
wipeBtn.addEventListener("click", wipeHistory);
//clear the history and local storage with a click of a button //
function wipeHistory() {
    //table.removeChild(table.childNodes[2])//
    var emptyCities = document.getElementById('tableRow')
    emptyCities.innerHTML = " ";
    localStorage.clear();

}
//main course //
searchBtn.addEventListener("click", citySearch);
function citySearch(city) {
    var hideAndShow = document.getElementById('hideAndShow')
    hideAndShow.setAttribute("style", "display:block;");
    
    city.preventDefault();
    
    console.log("testing searchBtn func");
    var searchValue = $('#city-input').val();
    cityList.push(searchValue);
    localStorage.setItem('city list', JSON.stringify(cityList));

    // refresh list after each search
    $('.city-list').empty();
    renderList();
    //empty the search box...jQuery is aweseome //
    $('#city-input').val('');
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue +"&appid="+ apiKey;
$. ajax({
    url: queryURL,
    method: "GET" })
    .then(function (response) {
    console.log(response);

    var allInOneApiLOL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ response.coord.lat +"&lon=" +response.coord.lon+"&appid="+apiKey+"&units=imperial";
    //second ajax to get the good stuff //

$. ajax({
    url: allInOneApiLOL,
    method: "GET" })
    .then(function(everything) {
        console.log(everything);
        const currentUV = everything.current.uvi;
        console.log(currentUV);
        let uvColor = document.getElementById('uvIndex');
        console.log(uvColor);
        let tempPic = document.getElementById('tempPic');
        const mainTemp = everything.current.temp
        JSON.stringify(mainTemp);


        var temperature = document.getElementById('temp');

        temperature.innerHTML = `${everything.current.temp} Fahrenheit`
        //$('#temp').text(`${everything.current.temp}  Fahrenheit `);//
        
        console.log("maintemp is: " + mainTemp);
        console.log("temppic is: " + tempPic);


        console.log("this will be the demo" + moment.unix(everything.current.dt).format("kkmm"));
        //function to check temp and if temp add image //
        function invokeTemp(temp) {
            if (moment.unix(everything.current.dt).format("kkmm") > 1800) {
                tempPic.classList.add('fa-moon');
            }
            else if (mainTemp > 80) {
                console.log("successful");
                tempPic.classList.add('fa-sun');
            } else if (mainTemp < 80 && mainTemp > 65) {
                tempPic.classList.add('fa-cloud-sun')
            } else if (mainTemp < 65 && mainTemp > 50) {
                tempPic.classList.add('fa-cloud-moon');
            }
        }
        function invokeTime(time) {
            if (moment.unix(everything.current.dt).format("kkmm") > 1600) {
                console.log("testing time function it works!");
                // going to do more cool stuff with this in the future //
            }
        }
        // if (mainTemp < 80) {
        //     console.log("result 1")
        //     tempPic.classList.add('fas fa-sun')
        // }
        invokeTemp(everything.current.temp)

        console.log(everything.current.weather);
        invokeTime(moment.unix(everything.current.dt).format("kkmm"));
        $('#windSpeed').text(`${everything.current.wind_speed} MPH`);
        $('#humidity').text(`${everything.current.humidity}%`);
        uvColor.innerHTML = `${everything.current.uvi}`;
        if(currentUV <= 2) {
                uvColor.classList.add('safe')
        } 
        else if (5 > currentUV < 2) {
                uvColor.classList.add('moderate');
        } else if ( 6 > currentUV < 2) {
                uvColor.classList.add('very-high');
        } else if (10 > currentUV < 8) {
                uvColor.classList.add('high') ;
        } else if ( currentUV > 11) {
                uvColor.classList.add('extreme');
        }
        

        var day1Time = document.getElementById('day1')
        //this is important. unix must be used in order to calculate anything time related in the response //
        day1Time.innerHTML = moment.unix(everything.daily[1].dt).format("dddd[,] MMMM Do YYYY [---] MM/DD/YYYY");
        console.log(day1Time)
        $('#temp1').text(`${everything.daily[1].temp.day} °F`);
        $('#humidity1').text(`${everything.daily[1].humidity}%`);
        console.log(everything.daily[1].sunrise);
        //adding the sunset and sunrise because who wouldn't want that? //
        var sunrise1 = document.getElementById('sunrise1');
        var sunset1 = document.getElementById('sunset1');
        $(".right").addClass('fa-sun');
        $(".left").addClass('fa-sun');
        //when we're formatting in moment, they have a neat little thing where you can put strings in brackets //
        sunrise1.innerHTML = moment.unix(everything.daily[1].sunrise).format("h[:]mA");
        sunset1.innerHTML = moment.unix(everything.daily[1].sunset).format("h[:]mA");



        var day2Time = document.getElementById('day2');
        day2Time.innerHTML = moment.unix(everything.daily[2].dt).format("dddd[,] MMMM Do YYYY [---] MM/DD/YYYY");
        console.log(day2Time)
        $('#temp2').text(`${everything.daily[2].temp.day} °F`);
        $('#humidity2').text(`${everything.daily[2].humidity}%`);
        var sunrise2 = document.getElementById('sunrise2');
        var sunset2 = document.getElementById('sunset2');
        sunrise2.innerHTML = moment.unix(everything.daily[2].sunrise).format("h[:]mA");
        sunset2.innerHTML = moment.unix(everything.daily[2].sunrise).format("h[:]mA");

        var day3Time = document.getElementById('day3')
        day3Time.innerHTML = moment.unix(everything.daily[3].dt).format("dddd[,] MMMM Do YYYY [---] MM/DD/YYYY");
        console.log(day3Time)
        $('#temp3').text(`${everything.daily[3].temp.day} °F`)
        $('#humidity3').text(`${everything.daily[3].humidity}%`)
        var sunrise3 = document.getElementById('sunrise3');
        var sunset3 = document.getElementById('sunset3');
        sunrise3.innerHTML = moment.unix(everything.daily[3].sunrise).format("h[:]mA");
        sunset3.innerHTML = moment.unix(everything.daily[3].sunrise).format("h[:]mA");

        var day4Time = document.getElementById('day4')
        day4Time.innerHTML = moment.unix(everything.daily[4].dt).format("dddd[,] MMMM Do YYYY [---] MM/DD/YYYY");
        console.log(day4Time)
        $('#temp4').text(`${everything.daily[4].temp.day} °F`)
        $('#humidity4').text(`${everything.daily[4].humidity}%`)
        var sunrise4 = document.getElementById('sunrise4');
        var sunset4 = document.getElementById('sunset4');
        sunrise4.innerHTML = moment.unix(everything.daily[4].sunrise).format("h[:]mA");
        
        sunset4.innerHTML = moment.unix(everything.daily[4].sunrise).format("h[:]mA");

        var day5Time = document.getElementById('day5')
        day5Time.innerHTML = moment.unix(everything.daily[5].dt).format("dddd[,] MMMM Do YYYY [---] MM/DD/YYYY");
        console.log(day5Time)
        $('#temp5').text(`${everything.daily[5].temp.day} °F`)
        $('#humidity5').text(`${everything.daily[5].humidity}%`)
        var sunrise5 = document.getElementById('sunrise5');
        var sunset5 = document.getElementById('sunset5');
        sunrise5.innerHTML = moment.unix(everything.daily[5].sunrise).format("h[:]mA");
        sunset5.innerHTML = moment.unix(everything.daily[5].sunrise).format("h[:]mA");

       

    })
})
}
}
);