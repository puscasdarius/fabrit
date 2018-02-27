var app = angular.module("App",[]);

var controller = function($scope,$http){

$scope.data = [];
$scope.data_table_1 = [];
$scope.data_table_2 = [];
$scope.data_chart = [];

$scope.activate_table_1 = false;
$scope.activate_table_2 = false;
$scope.activate_chart = false;



  $scope.getInitialData = function(){
    $http.get('/get_data_statistics').then(function(response){
      $scope.data = response.data;
    })
  }

  $scope.switchContent = function(content_no){
    if(content_no == 1){
      $scope.activate_table_1 = true;
      $scope.activate_table_2 = false;
      $scope.activate_chart = false;
      $scope.compute_data_table_1($scope.data);
    }
    if(content_no == 2){
      $scope.activate_table_1 = false;
      $scope.activate_table_2 = true;
      $scope.activate_chart = false;
      $scope.compute_data_table_2($scope.data);
    }
    if(content_no == 3){
      $scope.activate_table_1 = false;
      $scope.activate_table_2 = false;
      $scope.activate_chart = true;
      $scope.compute_data_chart($scope.data);
      $scope.generateChart();
    }
  }


  $scope.compute_data_table_1 = function(data){
    $scope.data_table_1 = [];
    var countries = data.countries;
    var cities = data.cities;
    var elem = {};

    for(var i = 0;i<countries.length;i++){
      for(var j = 0;j<cities.length;j++){
        if(""+countries[i]._id == ""+cities[j].parent_id){
          elem={};
          elem.country = countries[i].name;
          elem.city = cities[j].name;
          elem.population = cities[j].occ;
          elem.area = cities[j].area;
          elem.density = elem.population/elem.area;
          $scope.data_table_1.push(elem);
        }
      }
    }
    console.log($scope.data_table_1);
  }

  $scope.compute_data_table_2  = function(data){
    $scope.data_table_2 = [];
    var countries = data.countries;
    var cities = data.cities;
    var population = 0;
    var area = 0;
    var elem = {};

    for(var i = 0;i<countries.length;i++){
      elem ={};
      area=0;
      population=0;
      elem.country = countries[i].name;
      for(var j = 0;j<cities.length;j++){
        if(""+countries[i]._id == ""+cities[j].parent_id){
          if(cities[j].occ !== '')
            population += parseInt(cities[j].occ);
          if(cities[j].area !== '')
            area +=  parseInt(cities[j].area);
        }
      }
      elem.population = population;
      elem.avg_pop = population/cities.length;
      elem.density = elem.population/area;
      $scope.data_table_2.push(elem);
    }
  }

  $scope.compute_data_chart = function(data){
    $scope.data_chart = [];
    var countries = data.countries;
    var cities = data.cities;
    var population = 0;
    var area = 0;
    var elem = {};

    for(var i = 0;i<countries.length;i++){
      elem ={};
      area=0;
      population=0;
      elem.country = countries[i].name;
      for(var j = 0;j<cities.length;j++){
        if(""+countries[i]._id == ""+cities[j].parent_id){
          if(cities[j].occ !== '')
            population += parseInt(cities[j].occ);
          if(cities[j].area !== '')
            area +=  parseInt(cities[j].area);
        }
      }
      elem.population = population;
      elem.density = elem.population/area;
      $scope.data_chart.push(elem);
    }
  }

  $scope.generateChart = function(){
    var labels = [];
    var data = [];

    for(var i = 0;i<$scope.data_chart.length;i++){
      labels[i] = $scope.data_chart[i].country;
      data[i] = parseInt($scope.data_chart[i].density);
    }

    var ctx = document.getElementById('canvas').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

          // The data for our dataset
      data: {
          labels: labels,
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132),rgb(255,0,255)',
              borderColor: 'rgb(255, 99, 132)',
              data: data,
          }]
      },

      // Configuration options go here
      options: {}
    });
  }


  $scope.getInitialData();

}

app.controller("Controller",controller);
