/* Cube Style With Animate */
$('.search-button2').click(function($scope, $http) {

  $('.arrow').hide();

  $(this).stop().animate({
    'width': '300px'
  }, 500, function() {

    $('.content-wrapper2').addClass('switch-show');
    $('.search-box2').addClass('show-search-box');

    setTimeout(function() {

      $('.content-wrapper2').removeClass('switch-show');
      $('.search-button2').removeClass('show-search-button').addClass('hide-search-button');
      $('.search-box2').addClass('showed-search-box');

    }, 480);

  });
});

$('.search-box2 img').click(function() {

  $('.search-button2').removeClass('hide-search-button');
  $('.search-box2').addClass('hidden-search-box');
  $('.content-wrapper2').addClass('switch-hide');

  $('.search-button2').addClass('show-search-button').stop().delay(500).animate({
    'width': '50px'
  }, 500, function() {

    $('.content-wrapper2').removeClass('switch-hide');
    $('.search-button2').removeClass('show-search-button');
    $('.search-box2').removeClass('show-search-box showed-search-box hidden-search-box');

    $('.arrow').show();

  });
});

var app = angular.module('viewer', ['ngAnimate']);
app.controller('mainCtrl', function($scope, $http) {
  var input = $('input');
  var search = $("#search");
  $scope.results = [];
  $scope.search = function() {
    $scope.results = [];
    var title = input.val();
    /*Gets a query of 10 pages each with titles and a 1 sentence excerpt*/
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + cb)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v,k)  {
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
    });
  }
});