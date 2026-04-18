$(function () {
    "use strict";

    // LINE CHART
	Morris.Area({
        element: 'line-chart',
        data: [{
            period: '2018',
            revenue: 50
        }, {
            period: '2019',
            revenue: 130
        }, {
            period: '2020',
            revenue: 80
        }, {
            period: '2021',
            revenue: 70
        }, {
            period: '2022',
            revenue: 180
        }, {
            period: '2023',
            revenue: 105
        },
         {
            period: '2024',
            revenue: 250
        }],
        xkey: 'period',
        ykeys: ['revenue'],
        labels: ['revenue'],
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors:['#00acee'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 1,
        hideHover: 'auto',
        lineColors: ['#005faf'],
        resize: true
        
    });

}); 
