questionnaire.directive('paginationSteps', paginationSteps);

function paginationSteps() {
  return {
    restrict: 'E',
    templateUrl: 'app/questionnaire/pagination/pagination-steps.html',
    link: function (scope, elem, attrs) {

      scope.nextStep = function () {
        if (scope.config.screen_index <= scope.config.screens.length - 2 && scope.config.filled_screens[scope.config.screen_index]) {
          scope.config.screen_index++;
        };
      };

      scope.prevStep = function () {
        if (scope.config.screen_index >= 1) {
          scope.config.screen_index--;
        };
      };

      scope.toFinalScreen = function () {
        scope.config.screen_index++;
        scope.config.final_screen_show = true;
      };
    }
  };
};