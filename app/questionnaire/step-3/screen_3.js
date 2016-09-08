questionnaire.directive('thirdScreen', thirdScreen);

function thirdScreen() {
  return {
    restrict: 'E'
    , templateUrl: 'app/questionnaire/step-3/template_screen_3.html'
    , link: function (scope, el, attrs) {

      scope.clear = function(index){
        scope.data.networks[index].url = '';
      };
      scope.showWhen = function (mod, val) {
        var result;
        if (!mod) {
          result = false;
          val = '';
        } else {
          result = true;
          val = '';
        };

        return result;
      };

      var watchers = [];
      for (var i = 0; i < scope.data.networks.length; i++) {
        watchers.push('data.networks[' + i + '].url', 'data.networks[' + i + '].model');
      };


      scope.$watchGroup(watchers, function () {
        var values = []
          , disabled = []
        for (var i = 0; i < scope.data.networks.length; i++) {

          if (!scope.data.networks[i].model) {
            disabled.push(false);
          } else disabled.push(true);
          if (!!!scope.data.networks[i].url) {
            values.push(false);
          } else values.push(true);
        };


        var ret_arr = [];
        for (var i = 0; i < values.length; i++) {
          if (values[i] == false && disabled[i] == false) {
            ret_arr.push(true);
          } else if (values[i] == true && disabled[i] == true) {
            ret_arr.push(true);
          } else {
            ret_arr.push(false);
          };
        };

        for (var i = 0; i < ret_arr.length; i++) {
          if (ret_arr[i] == false) {
            scope.config.filled_screens[scope.config.screen_index] = false;
            break;
          } else {
            for (var j = 0; j < scope.data.networks.length; j++) {
              if (scope.data.networks[j].model) {
                if (scope.data.networks[j].url == undefined || scope.data.networks[j].url == "") {
                  scope.config.filled_screens[scope.config.screen_index] = false;
                  break;
                } else scope.config.filled_screens[scope.config.screen_index] = true;
              };
            }
          }
        };
      });
    }
  };
};