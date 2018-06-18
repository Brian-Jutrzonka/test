/* admin scripts */

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

var ajaxResponse={};
//var highChartsSeries=[];


function renderDetailedReport(json){
	var html = '';
	if (typeof json !='object') { return ''; }

	html += '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="table table-striped zeroharm-report-table">';
	for (var key in json) {
		if (json.hasOwnProperty(key)) {
			// console.log(key + " -> " + json[key]);
			html += '<tr>';
			html += '<td class="w20 col_name">'+key+'</td>';
			html += '<td class="col_value">'+json[key]+'</td>';
			html += '</tr>';
		}
	}
	html += '</table>';

	return html;
} // /renderDetailedReport


function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}




/** new phase 2 **/
var	ajaxRequest, defaultEndDate, defaultStartDate, $highcharts, chartRecentActivity, chartSafetyAssessments, dashboardKeyMeasurements, $report_closed, $report_status, $report_notes; // globally available
var locationId = getParameterByName('location') || '*';

defaultEndDate = new Date(); // on any date range inputs, this will be the default “end date”
defaultStartDate = new Date().setDate(defaultEndDate.getDate()-30);  // on any date range inputs, this will be the default “start date”


/**
 * each highcharts instance has a function that draws it
 * syntax: #chartRecentActivity  --> is drawn by --> drawChartRecentActivity()
 */

function drawChartDashboard1(){
	return true;
}
function drawChartDashboard2(){
	return true;
}
function drawChartDashboard3(){
	return true;
}

// ------------------------------------------

// ------------------------------------------



function drawChartSafetyAssessments(){

	var startDate   = new Date(defaultStartDate);

	var end = '' + jQuery('#chartSafetyAssessments__end').val() || '';
	if (!end.length>0) {
		end = ''+defaultEndDate.getFullYear()+'-'+(('0'+(defaultEndDate.getMonth()+1)).slice(-2))+'-'+(('0'+defaultEndDate.getDate()).slice(-2));
		// console.log('Using default end date: '+end);
	}
	var start = jQuery('#chartSafetyAssessments__start').val() || '';
	if (!start.length>0) {
		start = ''+startDate.getFullYear()+'-'+(('0'+(startDate.getMonth()+1)).slice(-2))+'-'+(('0'+startDate.getDate()).slice(-2));
		// console.log('Using default start date: '+start);
	}
	var loc = getParameterByName('location') || 0;

	// console.log('start='+start);
	// console.log('end='+end);

	var opts = {
		chart: {
			type: 'pie',
			renderTo: 'chartSafetyAssessments',
			style: {
					fontFamily: '\"Montserrat\", Helvetica, Arial, sans-serif'
			}
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		legend: {
			enabled:false
		},
		xAxis:{
			title:'',
			labels:{
				formatter: function(){
					return '';
				}
			}
		},
		yAxis:{
			title:'Number of Issues',
			labels:{
				formatter: function(){
					return this.value;
				}
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					/*format: '{point.name}: {point.y:.1f}%'*/
					format: '{point.name}: {point.y}'
				}
			}
		},

		tooltip: {
			headerFormat: '',
			/*pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'*/
			pointFormatter: function(){
				return '<span style="'+this.color+'">'+this.name+'</span>: <b>'+this.y+'</b>';
			}
		},
		series: [{
			name: 'Areas',
			colorByPoint: true,
			data: [] /* to be provided with getJSON result: data.series */
		}],
		drilldown: {
			activeAxisLabelStyle:{cursor: "pointer", color: "#003399", fontWeight: "bold", textDecoration: "underline"},
			activeDataLabelStyle:{cursor: "pointer", color: "#003399", fontWeight: "bold", textDecoration: "underline"},
			animation:{duration: 500},
			drillUpButton:{position:{align: "left", x: 10, y: 10}},
			series: [] /* to be provided with getJSON result: data.drilldowns */
		}
	};

	jQuery.getJSON('/api/chart-safety-assessments.json?start='+start+'&end='+end+'&location='+loc, function(data) {
		// console.log('AJAX data:');
		// console.dir(data);
		opts.series[0].data = data.series;
		opts.drilldown.series = data.drilldowns;
		if ( data.series.length==0 ) {
			opts.title.text = 'No Data Available';
			opts.subtitle.text = 'Try expanding the date range';
		} else {
			opts.title.text += (data.location_title.length>1 ? ' – '+data.location_title : '');
		}
		if ( typeof chartSafetyAssessments=='object' && typeof chartSafetyAssessments.destroy!='undefined' ) {
			chartSafetyAssessments.destroy();
		}
		// console.log('Highcharts opts:');
		// console.log(opts);
		chartSafetyAssessments = new Highcharts.Chart(opts);
	});

} // /drawChartSafetyAssessments





function drawChartRecentActivity(){

/*
	var priorDateTS = new Date().setDate(defaultEndDate.getDate()-30)
	var priorDate   = new Date(priorDateTS);
*/
	var startDate   = new Date(defaultStartDate);

	var end = '' + jQuery('#chartRecentActivity__end').val() || '';
	if (!end.length>0) {
		end = ''+defaultEndDate.getFullYear()+'-'+(('0'+(defaultEndDate.getMonth()+1)).slice(-2))+'-'+(('0'+defaultEndDate.getDate()).slice(-2));
		// console.log('Using default end date: '+end);
	}
	var start = jQuery('#chartRecentActivity__start').val() || '';
	if (!start.length>0) {
		start = ''+startDate.getFullYear()+'-'+(('0'+(startDate.getMonth()+1)).slice(-2))+'-'+(('0'+startDate.getDate()).slice(-2));
		// console.log('Using default start date: '+start);
	}
	var loc = getParameterByName('location') || 0;

	// console.log('start='+start);
	// console.log('end='+end);

	var opts = {
		chart: {
			renderTo: 'chartRecentActivity',
			type: 'line',
			style: {
					fontFamily: '\"Montserrat\", Helvetica, Arial, sans-serif'
			}
		},
		title: {
			text: ''
		},
		yAxis: {
			title: {
				text: 'Number of Reports'
			}
		},
		xAxis: {
			type: 'category',
			title: {
				text: ''
			}
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'bottom'
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1
			}
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		},
		series: [{}]
	};

	jQuery.getJSON('/api/chart-recent-activity.json?start='+start+'&end='+end+'&location='+loc, function(data) {
		// console.log('AJAX data:');
		// console.dir(data);
		opts.series = data;
		if ( typeof chartRecentActivity=='object' && typeof chartRecentActivity.destroy!='undefined' ) {
			chartRecentActivity.destroy();
		}
		chartRecentActivity = new Highcharts.Chart(opts);
	});

} // /drawChartRecentActivity



function singleReportDownloadHandler(e){
	e.stopPropagation();
	e.preventDefault();
	var reportID = jQuery(this).data('guid') || false;
	var routeName = jQuery(this).data('routename') || false;
	if (reportID && routeName) {
		// console.log('download report: '+reportID);
	}
	return false;
}


// update the report detail tracking fields:
function updateReportTracking(route,id,field,value){
	var route  = typeof route=='string'    ? route : false;
	var id     = typeof id!='undefined'    ? parseInt(id) : false;
	var field  = typeof field=='string'    ? field : false;
	var value  = typeof value!='undefined' ? value : false;
	console.log('route='+route+'&id='+id+'&field='+field+'&value='+value+'');

	if (route && id && field && (value!==false)) {
		ajaxRequest = jQuery.ajax({
			type       : 'POST',
			url        : '/api/update-report.json',
			data       : {'route':route,'id':id,'field':field,'value':value},
			dataType   : 'json',
			cache      : false,
			async      : true,

			beforeSend: function(){
				// this is entirely optional. just letting you know what’s happening here. if your AJAX request is complex maybe you want to put your app into a waiting state like show a spinner or something…
				// console.log('Ajax is about to send… url:'+this.url+' data:{'+this.data+'}');
			},

			error: function(e){
				// this is optional. we would do this if, say, the server couldn’t be reached or WiFi went away unexpectedly… 
				// console.log(' …failed. response: '+e.message);
			},

			success: function(data){
				// this is optional. just letting you know the server responded.
				//console.log(' …success! data= ' + data);
			},

			complete: function(jqXHR,textStatus){
				// this is the stuff we really want.
				console.log(' …complete. textStatus='+textStatus);
				if (textStatus=='success') {
					console.log(jqXHR.responseJSON);
					if (jqXHR.responseJSON.success===1) {
						console.log ('Changes successfully saved.');
					} else {
						console.log ('Changes not saved.');
					}
				} // endIf: success
			} // /complete

		}); // /jQuery.ajax

	} // endIf: route && id && field && value
} // /updateReportTracking




/** /phase 2 **/






jQuery(document).ready(function($) {
	// console.log('[admin.js]: “jQuery is ready!”');




	// the report detail editing form:
	jQuery('[name=rag_status],#notes,#closed,#owner').on('change',function(e){
		console.dir(e);
		var field = (e.currentTarget.name || e.currentTarget.id) || false;
		var route = getParameterByName('routeName') || false;
		var id    = getParameterByName('id') || false;
		
		if (e.currentTarget.type=='checkbox') {
			var value = jQuery(e.currentTarget).is(':checked') ? 1 : 0;
		} else {
			var value = jQuery(e.currentTarget).val() || '';
		}

		updateReportTracking(route,id,field,value);
	});




	/** initialize datepicker(s) **/
	jQuery('.datepicker').each(function(i){
		jQuery(this).datepicker({
			dateFormat:'yy-mm-dd',
		});
		// datepickers with classes “datepicker-start” or “datepicker-end” should get the default start or end dates respectively
		if (jQuery(this).hasClass('datepicker-start')) {
			jQuery(this).datepicker('setDate', new Date(defaultStartDate) );
		}
		if (jQuery(this).hasClass('datepicker-end')) {
			jQuery(this).datepicker('setDate', defaultEndDate);
		}
	});

	jQuery('#single-report-download').on('click',singleReportDownloadHandler);

	/* initialize any highcharts instances on this page */
	$highcharts = jQuery('[data-highcharts]').each(function(i){
		var dataInit = jQuery(this).data('initfn');
		if (dataInit.length>0) { 
			// console.log('run: '+dataInit+'()');
			window[dataInit]();
		}
	});
	/* initialize any highcharts option forms on this page */
	jQuery('form[data-submitfn]').each(function(i){
		var dataSubmit = jQuery(this).data('submitfn');
		if (dataSubmit.length>0) { 
			jQuery(this).on('submit',function(e){
				//console.log('run: '+dataSubmit+'()');
				e.stopPropagation();
				e.preventDefault();
				window[dataSubmit]();
				return false;
			});
		}
	});


// ------------------------------------------
/** phase 2: dashboard stats **/
	jQuery.getJSON('/api/key-measurements.json',{'location_id':locationId},function(data){
		dashboardKeyMeasurements = data;
		jQuery('[data-keymeasurement]').each( function( index ) {
			var measurementId = jQuery(this).data('measurementid') || false;
			if (measurementId) {
				console.log(measurementId);
				console.dir(data[measurementId]);
				if (data[measurementId].total.value != null) {
					jQuery('[data-measurementid='+measurementId+']').text(data[measurementId].total.value);
				}
			}
		});
	});




// ------------------------------------------

/*
	var $highChartEl = jQuery('#highchart-usage');
	if ( $highChartEl.length>0 ) {

		Highcharts.chart('highchart-usage', {
			title: {
				text: 'Recent Activity'
			},
			subtitle: {
				text: 'Daily Reports Over 45 Days'
			},

			yAxis: {
				title: {
					text: 'Number of Reports'
				}
			},
			legend: {
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom'
			},

			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointStart: 1
				}
			},

			series: highChartsSeries,

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}

		}); // /Highcharts

	} // /highChartsUsage
*/




	// clicking a table row opens a UI dialog:
	jQuery('tr.click-for-details').on('click',function(event){
		jQuery("#ui_dialog_1").dialog("open");
		// get the record ID from the row clicked:
		var recordId = jQuery(event.currentTarget).attr('data-guid') || 0;
		var routeName = jQuery(event.currentTarget).attr('data-routename') || ( getParameterByName(name) || ZEROHARM.routeName );
		// console.log(recordId);
		// load the report in an iframe:
		html = '<iframe width="100%" height="100%" border="0" src="admin/report.html?id='+recordId+'&routeName='+routeName+'"></iframe>';
		jQuery('#ui_dialog_1_content > .report_container > .scroll').append(html);
	}); // /onClick

	jQuery("#ui_dialog_1").dialog({
		modal: true,
		title: 'Report Details',
	  autoOpen: false,
		height: window.innerHeight*.94,
		width: window.innerWidth*.96,
		closeText: " ",
		draggable: false,
		position:{my:"center",at:"center",of:window},
		close: function( event, ui ) {
			console.log('#ui_dialog_1 closed.');
			jQuery('#ui_dialog_1_content > .report_container > .scroll').html('');
			window.location.reload();
			//console.dir(event);
		}
	});

	jQuery('#btn-report-download').on('click',function(e){
		e.stopPropagation();
		e.preventDefault();
		// console.log('Download!');
		return false;
	});






}); // end document.ready



