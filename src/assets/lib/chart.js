var doughnutData = [{
  value: 70,
  color: "#FF6B6B"
},
{
  value: 30,
  color: "#fdfdfd"
}
];
var myDoughnut = new Chart(document.getElementById("serverstatus01").getContext("2d")).Doughnut(doughnutData);

var doughnutData = [{
  value: 60,
  color: "#1c9ca7"
},
{
  value: 40,
  color: "#f68275"
}
];
var myDoughnut = new Chart(document.getElementById("serverstatus02").getContext("2d")).Doughnut(doughnutData);

var doughnutData = [{
  value: 60,
  color: "#2b2b2b"
},
{
  value: 40,
  color: "#fffffd"
}
];
var myDoughnut = new Chart(document.getElementById("serverstatus03").getContext("2d")).Doughnut(doughnutData);

var doughnutData = [{
  value: 70,
  color: "#4ECDC4"
},
{
  value: 30,
  color: "#fdfdfd"
}
];
var myDoughnut = new Chart(document.getElementById("newchart").getContext("2d")).Doughnut(doughnutData);
