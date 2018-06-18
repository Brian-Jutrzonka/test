var gaugeOptions = {
	chart: {
			type: 'solidgauge'
	},
	title: null,
	exporting: { enabled: false } ,
	pane: {
			center: ['50%', '85%'],
			size: '140%',
			startAngle: -90,
			endAngle: 90,
			background: {
					backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
					innerRadius: '60%',
					outerRadius: '100%',
					shape: 'arc'
			}
	},
	tooltip: {
			enabled: false
	},
	// the value axis
	yAxis: {
			stops: [
					[0.1, '#55BF3B'], // green
					[0.5, '#DDDF0D'], // yellow
					[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
			minorTickInterval: null,
			tickAmount: 2,
			title: {
					y: -70
			},
			labels: {
					y: 16
			}
	},
	plotOptions: {
			solidgauge: {
					dataLabels: {
							y: 5,
							borderWidth: 0,
							useHTML: true
					}
			}
	}
};


if ( jQuery('#chartDashboard1').length>0 ) {
	var chartDashboard1 = Highcharts.chart('chartDashboard1', Highcharts.merge(gaugeOptions, {
		yAxis: {
				min: 0,
				max: 200,
				title: {
						text: 'Example 1'
				}
		},

		credits: {
				enabled: false
		},

		series: [{
				name: 'Example 2',
				data: [80],
				dataLabels: {
						format: '<div style="text-align:center"><span style="font-size:25px;color:' +
								((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
									 '<span style="font-size:12px;color:silver">Example</span></div>'
				},
				tooltip: {
						valueSuffix: ''
				}
		}]

	}));
} // /chartDashboard1


if ( jQuery('#chartDashboard2').length>0 ) {
	var chartDashboard2 = Highcharts.chart('chartDashboard2', Highcharts.merge(gaugeOptions, {
		yAxis: {
				min: 0,
				max: 5,
				title: {
						text: 'Example 2'
				}
		},

		series: [{
				name: 'Example 2',
				data: [1],
				dataLabels: {
						format: '<div style="text-align:center"><span style="font-size:25px;color:' +
								((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
									 '<span style="font-size:12px;color:silver">Example</span></div>'
				},
				tooltip: {
						valueSuffix: ''
				}
		}]

	}));
} // /chartDashboard2


