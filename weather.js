$(document).ready(function() {
    console.log("rock and roll");
var searchBtn = document.getElementById("search");

//if there's nothing in local storage set an empty array, if there is something in local storage then grab it //
let cityList = !localStorage.getItem('city list') ? [] : JSON.parse(localStorage.getItem('city list'));

//setting up local storage to make a list for each area inputted //
const renderList = () => {
    cityList.map(city => {
        const cityBtn = $('<li class="city-btn">')
        $('.city-list').prepend(cityBtn.text(city))
    })
}
renderList();
var getSearch;
var apiKey = "08b42de4b22b623511bd55d7959c6438"




//main course //
searchBtn.addEventListener("click", citySearch);
function citySearch(city) {
    
    
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

        //function to check temp and if temp add image //
        function invokeTemp(temp) {
            if (mainTemp > 80) {
                console.log("successful");
                tempPic.classList.add('fa-sun');
            } else if (mainTemp < 79 && mainTemp > 65) {
                tempPic.classList.add('fa-cloud-sun')
            } else if (mainTemp < 65 && mainTemp > 50) {
                tempPic.classList.add('fa-cloud-moon');
            }

        }
        // if (mainTemp < 80) {
        //     console.log("result 1")
        //     tempPic.classList.add('fas fa-sun')
        // }
        invokeTemp(everything.current.temp)

        console.log(everything.current.weather);
       
        $('#windSpeed').text(`${everything.current.wind_speed} MPH`);
        $('#humidity').text(`${everything.current.humidity}%`);
        uvColor.innerHTML = `${everything.current.uvi}`;
        if(currentUV <= 2) {
                uvColor.classList.add('safe')
        } 
        else if (5 > currentUV < 2) {
                uvColor.classList.add('moderate')
        } else if ( 6 > currentUV < 2) {
                uvColor.classList.add('very-high')
        } else if (10 > currentUV < 8) {
                uvColor.classList.add('high') 
        } else if ( currentUV > 11) {
                uvColor.classList.add('extreme');
        }
        

        var day1Time = document.getElementById('day1')
        day1Time.innerHTML = moment.unix(everything.daily[1].dt).format("MM/DD/YYYY");
        console.log(day1Time)
        $('#temp1').text(`${everything.daily[1].temp.day} Fahrenheit`)
        $('#humidity1').text(`${everything.daily[1].humidity}%`)
        
        var day2Time = document.getElementById('day2')
        day2Time.innerHTML = moment.unix(everything.daily[2].dt).format("MM/DD/YYYY");
        console.log(day2Time)
        $('#temp2').text(`${everything.daily[2].temp.day} Fahrenheit`)
        $('#humidity2').text(`${everything.daily[2].humidity}%`)

        var day3Time = document.getElementById('day3')
        day3Time.innerHTML = moment.unix(everything.daily[3].dt).format("MM/DD/YYYY");
        console.log(day3Time)
        $('#temp3').text(`${everything.daily[3].temp.day} Fahrenheit`)
        $('#humidity3').text(`${everything.daily[3].humidity}%`)

        var day4Time = document.getElementById('day4')
        day4Time.innerHTML = moment.unix(everything.daily[4].dt).format("MM/DD/YYYY");
        console.log(day4Time)
        $('#temp4').text(`${everything.daily[4].temp.day} Fahrenheit`)
        $('#humidity4').text(`${everything.daily[4].humidity}%`)

        var day5Time = document.getElementById('day5')
        day5Time.innerHTML = moment.unix(everything.daily[5].dt).format("MM/DD/YYYY");
        console.log(day5Time)
        $('#temp5').text(`${everything.daily[5].temp.day} Fahrenheit`)
        $('#humidity5').text(`${everything.daily[5].humidity}%`)

       

    })
})


 


}

}
);