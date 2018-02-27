var app = angular.module('App',[]);

var controller = function($scope,$http,$location){
  $scope.countries = [];
  $scope.cities = [];
  $scope.cityList = [];

  $scope.input_occ_pattern = "[^a-zA-Z]{1,20}";
  $scope.input_area_pattern = "[^a-zA-Z]{1,10}";

    //Scoate tarile din baza de date
    $scope.getInitialData = function(){
      $http.get('/get_data').then(function(response){
          //Get countries
          $scope.countries = response.data.countries;
        });
      }
    //Trimite datele la baza de date
    $scope.submitData = function(){
      var data = {};
      data.country = $scope.input_country;
      data.city = $scope.input_city;
      data.occ = $scope.input_occ;
      data.area = $scope.input_area;
      $http.post('/submit',data).then(function(response){
        if(response.status != 200){
          alert("Error:\t"+response.statusText);
        }else{
          alert("Record succesfully inserted!");
          $location.path("/");
        }
      })

    }
    //Urmareste schimbarile de valoare din input_country
    //pentru a stii de ce orase este nevoie in pagina
    $scope.$watch('input_country',function(){
      if($scope.input_country !== undefined){
        $http.get('/get_cities/'+$scope.input_country).then(function(response){
          $scope.cities = response.data;
        })
      }
    })
    $scope.getInitialData();
  }

app.controller('Controller',controller);
