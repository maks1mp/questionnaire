questionnaire.directive('finalScreen', finalScreen);

function finalScreen() {
  return {
    restrict: 'E',
    templateUrl: 'app/questionnaire/final_screen/final.html',
    link: function (scope, elem, attrs) {
      scope.tryAgain = function () {

        scope.config = {
          screens: ['screen1', 'screen2', 'screen3', 'screen4'],
          screen_index: 0,
          filled_screens: [false, false, false, false],
          active_class: [true, false, false, false],
          final_screen_show: false,
        };
        
        scope.questinnare_qantity++;
        
        scope.data = {
          name: '',
          email: '',
          country: '',
          city: '',
          networks: [{
            name: 'Facebook',
            url: '',
            f_name: 'facebook',
            input_data: 'fecebook_input',
            model: false
            }, {
            name: 'Вконтакте',
            url: '',
            f_name: 'vk',
            input_data: 'vk_input',
            model: false
            }, {
            name: 'Twitter',
            url: '',
            f_name: 'twitter',
            input_data: 'twitter_input',
            model: false
            }, {
            name: 'Одноклассники',
            url: '',
            f_name: 'classmates',
            input_data: 'classmates_input',
            model: false
          }],
          picture: {
            valid: false,
            url: '',
          },
        };
      };
    }
  };
};