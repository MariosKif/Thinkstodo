$(function () {
    "use strict";

    // Dashboard charts use Morris.js. Only initialise when the target element
    // exists on the current page (template originally assumed every page was a
    // dashboard). Without this guard every non-dashboard page throws a
    // "Graph container element not found" error into the console.
    var lineChart = document.getElementById('line-chart');
    if (!lineChart || typeof window.Morris === 'undefined') return;

    Morris.Area({
        element: 'line-chart',
        data: [
            { period: '2018', revenue: 50 },
            { period: '2019', revenue: 130 },
            { period: '2020', revenue: 80 },
            { period: '2021', revenue: 70 },
            { period: '2022', revenue: 180 },
            { period: '2023', revenue: 105 },
            { period: '2024', revenue: 250 }
        ],
        xkey: 'period',
        ykeys: ['revenue'],
        labels: ['Revenue'],
        lineColors: ['#ff4a5c'],
        pointFillColors: ['#ff4a5c'],
        pointStrokeColors: ['#ffffff'],
        fillOpacity: 0.2,
        hideHover: 'auto',
        resize: true,
        gridLineColor: '#eef2f7',
        gridTextSize: 11
    });
});
