$(document).ready(function() {
    console.log("rock and roll");
var searchBtn = document.getElementById("search");

var getSearch;
var apiKey = "08b42de4b22b623511bd55d7959c6438"

searchBtn.addEventListener("click", citySearch);
function citySearch(city) {
    city.preventDefault();
    console.log("testing searchBtn func");
    var searchValue = $('#city-input').val();
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

        $('#temp').text(`${everything.current.temp}  Fahrenheit `);
        $('#windSpeed').text(`${everything.current.wind_speed} Mph`);
        $('#humidity').text(`${everything.current.humidity}%`);
        $('#uvIndex').text(`${everything.current.uvi}`)
    })
})


 


}

}
);