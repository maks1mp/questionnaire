questionnaire.directive('fourthScreen', fourthScreen);

function fourthScreen() {
  return {
    restrict: 'E',
    templateUrl: 'app/questionnaire/step-4/template_screen_4.html',
    link: function (scope, el, attrs) {

      scope.blocks = [{
        src: '../app/questionnaire/img/cat1.jpg',
        valid: true,
        $class: '',
      }, {
        src: '../app/questionnaire/img/cat2.jpg',
        valid: true,
        $class: '',
      }, {
        src: '../app/questionnaire/img/cat3.jpg',
        valid: true,
        $class: '',
      }, {
        src: '../app/questionnaire/img/dog4.jpg',
        valid: false,
        $class: '',
      }];

      scope.$watch('config.final_screen_show', function () {
        for (var i = 0; i < scope.blocks.length; i++) {
          scope.blocks[i].$class = '';
        }
      });

      scope.imgPicker = function (is_valid, src) {
        var picture_src;
        for (var i = 0; i < scope.blocks.length; i++) {
          if (scope.blocks[i].src == src) {
            scope.blocks[i].$class = 'active';
            picture_src = src;
          } else scope.blocks[i].$class = '';;
        };
        if (!is_valid) {
          scope.show_error = 'true';
          scope.data.picture.valid = false;
          scope.data.picture.url = '';
          scope.config.filled_screens[scope.config.screen_index] = false;
        } else {
          scope.show_error = 'false';
          scope.data.picture.url = picture_src;
          scope.data.picture.valid = true;
          scope.config.filled_screens[scope.config.screen_index] = true;
        }
      };
    }
  };
};