angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      replace: true,
      link: function (scope, elem, attrs) {
        var renderChart = function () {
          var data = scope.$eval(attrs.uiChart);
          elem.html('');
          elem.attr('id', attrs.chartName);
          if (!angular.isArray(data)) {
            return;
          }

          var opts = {};
          if (!angular.isUndefined(attrs.chartOptions)) {
            opts = scope.$eval(attrs.chartOptions);
            if (!angular.isObject(opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }

          $.jqplot(attrs.chartName, data, opts);
        };

        scope.$watch(attrs.uiChart, function () {
          renderChart();
        }, true);

        scope.$watch(attrs.chartOptions, function () {
          renderChart();
        });
      }
    };
  });
