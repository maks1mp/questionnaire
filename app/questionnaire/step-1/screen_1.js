questionnaire.directive('firstScreen', firstScreen);

function firstScreen() {
  return {
    restrict: 'E',
    templateUrl: 'app/questionnaire/step-1/template_screen_1.html',
    link: function (scope, el, attrs) {
      scope.$watchGroup(['data.name', 'data.email'], function () {
        scope.config.filled_screens[scope.config.screen_index] = scope.user_data.name.$valid && scope.user_data.email.$valid && !!scope.data.name && !!scope.data.email;
      });
    }
  };
};