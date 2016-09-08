questionnaire.directive('pagesPagination', pagesPagination);

function pagesPagination() {
  return {
    restrict: 'E'
    , scope: {
      config: '='
    }
    , templateUrl: 'app/questionnaire/pagination/pagination.html'
    , link: function (scope, elem, attrs) {

      scope.handleClick = function (index) {
        if (scope.config.filled_screens[scope.config.screen_index] || index < scope.config.screen_index) {
          scope.config.screen_index = index;
        };
      };

      scope.setActive = function (index) {
        if (scope.config.filled_screens[index]) {
          return 'done';
        }
      };

      scope.isDisabled = function (index) {
        var disabled = false;
        for (var i = 0; i < index; i++) {
          disabled |= !scope.config.filled_screens[i];
        };
        return disabled;
      };
    }
  };
};