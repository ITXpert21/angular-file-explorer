FileManagerApp.directive('ngFile', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFile);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
});

FileManagerApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event: event});
            });
        });
    };
});

FileManagerApp.filter('strLimit', ['$filter', function($filter) {
    return function(input, limit) {
        if (input.length <= limit) {
            return input;
        }
        return $filter('limitTo')(input, limit) + '...';
   };
}]);

$(function() {
    $(window.document).on('shown', '.modal', function() {
        $('[autofocus]', this).focus();
    });
    $(window.document).click(function() {
        $("#context-menu").hide();
    });
});