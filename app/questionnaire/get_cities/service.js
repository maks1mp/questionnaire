questionnaire.factory('getList', function ($http) {
  return {
    cities: function (id) {
      return $http.get('/app/questionnaire/step-2/data/cities.json').then(function (res) {
        var cities = [];
        for (var i in res.data) {
          if (res.data[i].country == id) {
            cities.push(res.data[i]);
          };
        };
        return cities;
      });
    },
    countries: function () {
      return $http.get('/app/questionnaire/step-2/data/countries.json').then(function (res) {
        var result = [];
        for (var i in res.data) {
          result.push({
            id: i,
            title: res.data[i],
          });
        };
        return result;
      }).catch(function () {
        console.log('Cant get data')
      });
    },
  }
});