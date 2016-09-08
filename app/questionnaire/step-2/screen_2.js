questionnaire.directive('secondScreen', secondScreen);

function secondScreen(getList) {
  return {
    restrict: 'E',
    templateUrl: 'app/questionnaire/step-2/template_screen_2.html',
    link: function (scope, elem, attrs) {

      scope.$watch('questinnare_qantity', function () {
          scope.countries_filter = '';
          scope.cities_filter = '';
      });

      scope.visible_country_dropdown == false;
      scope.visible_city_dropdown == false;

      getList.countries().then(function (data) {
        scope.countries_list = data;
      });


      function dropdownMenu(field, true_value, state) {
        return function () {
          var new_field, clear_country;

          if (!!field) {
            if (field.length > 0 && true_value == field) {
              new_field = '';
              clear_country = '-';
              state = true;
            } else if (field.length > 0 && true_value != field) {
              new_field = '';
              state = false;
            }
          } else {
            !!state == true ? state = false : state = true;
          };
          return {
            field: new_field,
            true_value: clear_country,
            state: state,
          }
        };
      };




      scope.countriesDropdown = function (field) {
        scope.visible_city_dropdown = false;
        var countries_dropdown = dropdownMenu(field, scope.true_country, scope.visible_country_dropdown);

        scope.country_st = countries_dropdown();
        scope.visible_country_dropdown = scope.country_st.state;
        scope.countries_filter = scope.country_st.field;
        scope.true_country = '-';

      };

      scope.citiesDropdown = function (field) {

        var cities_dropdown = dropdownMenu(field, scope.true_city, scope.visible_city_dropdown);

        scope.city_st = cities_dropdown();
        scope.visible_city_dropdown = scope.city_st.state;
        scope.cities_filter = scope.city_st.field;
        scope.true_city = '-';

      };

      function watchFields(field, prop, arr, status, true_) {
        return function () {
          if (!!field) {
            if (field.length != 0) {
              status = true;
              for (var i in arr) {
                if (field == arr[i][prop]) {
                  status = false;
                  true_ = scope.countries_list[i].title;
                  var id = scope.countries_list[i].id;
                  break;
                }
              };
            }
          } else if (!!!field && true_ == '-') {
            status = true;
          } else if (!!!field && true_ != '-') {
            status = false;
          }
          return {
            sc: status,
            true_country: true_,
            id: id
          }
        };
      };

      scope.$watch('country_id', function () {
        if (!!scope.country_id) {
          getList.cities(scope.country_id).then(function (data) {
            scope.cities_list = data;
          });
        };
      });

      scope.$watch('countries_filter', function () {

        var countries_field = watchFields(scope.countries_filter, 'title', scope.countries_list, false, scope.true_country);

        scope.country_ = countries_field();

        scope.visible_country_dropdown = scope.country_.sc;
        scope.true_country = scope.country_.true_city;
        scope.country_id = scope.country_.id;

        var data_country = isInArray(scope.countries_filter, scope.countries_list, 'title');

        scope.data.country = data_country();



      });

      scope.$watch('cities_filter', function () {

        var cities_field = watchFields(scope.cities_filter, 'name', scope.cities_list, false, scope.true_city);

        scope.city_ = cities_field();

        scope.visible_city_dropdown = scope.city_.sc;
        scope.true_city = scope.city_.true_city;

        var data_city = isInArray(scope.cities_filter, scope.cities_list, 'name');

        scope.data.city = data_city();

      });


      scope.findCity = function (id, title) {


        getList.cities(id).then(function (data) {
          scope.countries_filter = title;
          scope.true_country = title;
          scope.cities_list = data;
        });
      };

      scope.pickCity = function (title) {



        scope.cities_filter = title;
        scope.data.city = scope.cities_filter;
        scope.visible_city_dropdown = false;

      };

      function isInArray(item, arr, type) {
        return function () {
          if (arr != undefined) {
            var result = '';
            for (var i = 0; i < arr.length; i++) {
              if (item == arr[i][type]) {
                result = item;
              };
            };
            return result;
          };
        }
      };

      scope.$watchGroup(['countries_filter', 'cities_filter'], function () {

        scope.config.filled_screens[scope.config.screen_index] = !!scope.data.country && !!scope.data.city;
      });

    }
  };
};