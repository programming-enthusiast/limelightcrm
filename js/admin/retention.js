jQuery( document ).ready(function( $ ) 
{
	var campaign_waiting = false;

	//var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
	var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

    var success_mark = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>';
    var error_mark = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span>';
	
    var plus_mark = '<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>';
    var minus_mark = '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>';
    var affiliate_mark = '<span class="glyphicon glyphicon-triangle-right" aria-hidden="true" style="color: #b3b3b3"></span>';

	var crm_id = -1;
	var crm_name = '';
	var date_id = 'date_thisweek';
	var from_date = '';
	var to_date = '';

	var cycle = 1;
	var loaded_cycle = 1;

	init();


	function init()
	{
		getInitialCrmID();
		setDateText();

		ajaxRetentionList();
	}

	function getInitialCrmID()
    {
        if ($('.crm_dropdown_list').length > 0)
        {
            crm_id = $('.crm_dropdown_list').prop('id');
            crm_name = $('.crm_dropdown_list').html();
        }
    }

	function show_alert(msg) 
	{
        $('.retention_alert').html(msg);
        $('.retention_alert').fadeIn(1000, function () {
            $('.retention_alert').fadeOut(3000);
        });
    }

    function show_waiting(type, id, show)
    {
    	if (type == 'list')
    	{
	        if (show)
	            $('.retention_waiting').html(spinner);
	        else
	            $('.retention_waiting').html('');
	    }
    }

    // crm dropdown menu
    $('.crm_dropdown_menu li').on("click", function (e) 
    {
        crm_name = $(this).text();
        crm_id = $(this).find('a').attr('id');

        $('.crm_toggle_button').html(crm_name + " <span class=\"caret\"></span>");
    });

    // click data range
    $('.input-daterange').datepicker({
	});

	$('.date_dropdown_menu li').on("click", function (e) 
    {
        var date_text = $(this).text();
        date_id = $(this).find('a').attr('id');

        $('.date_toggle_button').html(date_text + " <span class=\"caret\"></span>");

		setDateText();
    });

    // cycle dropdown menu
    $('.cycle_dropdown_menu li').on("click", function (e) 
    {
        cycle = $(this).text();
        cycle_id = $(this).prop('id').substring(6);

        $('.cycle_toggle_button').html(cycle + " <span class=\"caret\"></span>");
    });

    // search button
    $('.retention_search_button').click(function ()
    {
        ajaxRetentionList();
    });

    // campaign '+' button
    $('.table_retention_body').on('click', '.btn_campaign_expand', function (e)
    {
    	if (campaign_waiting)
    		return;

        var html = '';
        var currernt_mark = $(this).html();
        var isPlus = (currernt_mark.indexOf('glyphicon-plus-sign') != -1) ? true : false;

        var campaign_id = $(this).prop('id').substring(5);

        delete_campaign_expand_items(campaign_id);

        if (isPlus)
        {
        	$(this).html(minus_mark);

			html = '<tr id="waittr_' + campaign_id + '" style="border: 2px solid #b3b3b3; border-top:none;">';
			html += '<td></td>';
			html += '<td></td>';
			html += '<td>' + spinner + '</td>';
			html += '<td id="waittd_' + campaign_id + '" colspan="' + (loaded_cycle * 6) + '"></td>';
			html += '</tr>';

			$(this).closest('tr').after(html);

			ajaxAffiliateList(campaign_id);
        }
        else
        {
			$(this).html(plus_mark);
        }
    });

    // campaign expand all button
    $('.table_retention_head').on('click', '.btn_campaign_head', function (e)
    {
    	if (campaign_waiting)
    		return;

    	var html = '';
        var currernt_mark = $(this).html();
        var isPlus = (currernt_mark.indexOf('glyphicon-plus-sign') != -1) ? true : false;

        $('.btn_campaign_expand').each( function(i) 
        {
        	var campaign_id = $(this).prop('id').substring(5);

	        delete_campaign_expand_items(campaign_id);

	        if (isPlus)
	        {
	        	$(this).html(minus_mark);

				html = '<tr id="waittr_' + campaign_id + '" style="border: 2px solid #b3b3b3; border-top:none;">';
				html += '<td></td>';
				html += '<td></td>';
				html += '<td>' + spinner + '</td>';
				html += '<td id="waittd_' + campaign_id + '" colspan="' + (loaded_cycle * 6) + '"></td>';
				html += '</tr>';

				$(this).closest('tr').after(html);

				ajaxAffiliateList(campaign_id);
	        }
	        else
	        {
				$(this).html(plus_mark);
	        }
        });

		if (isPlus)
        	$(this).html(minus_mark);
        else
			$(this).html(plus_mark);
    });


    function delete_campaign_expand_items(cid)
    {
		$('.aff_item_by_' + cid).each( function(i) 
        {
        	$(this).remove();
        });

        $('#waittr_' + cid).remove();

        $('.subaff_item_by_' + cid).each( function(i) 
        {
        	$(this).remove();
        });
    }


	function setDateText()
	{
		var date = new Date();
		var today = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());

        if (date_id == 'date_today')		// today
        {
        	from_date = today;
        	to_date = today;
        }
        else if (date_id == 'date_yesterday')
        {
        	date.setDate(date.getDate() - 1);

			from_date = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());
        	to_date = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
        else if (date_id == 'date_thisweek')
        {
        	var firstday = date.getDate() + 1;
        	if (date.getDay() == 0)
        		firstday -= 7;
        	else
        		firstday -= date.getDay();

        	date.setDate(firstday);

        	from_date = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());
        	to_date = today;
        }
        else if (date_id == 'date_thismonth')
        {
        	from_date = getDateText(date.getFullYear(), date.getMonth() + 1, 1);
        	to_date = today;
        }
        else if (date_id == 'date_thisyear')
        {
        	from_date = getDateText(date.getFullYear(), 1, 1);
        	to_date = today;
        }
        else if (date_id == 'date_lastweek')
        {
        	var firstday = date.getDate() + 1 - 7;
        	if (date.getDay() == 0)
        		firstday -= 7;
        	else
        		firstday -= date.getDay();

        	date.setDate(firstday);
        	from_date = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());

        	firstday = date.getDate() + 6;
        	date.setDate(firstday);
        	to_date = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
        else if (date_id == 'date_custom')
        {
        	from_date = '';
        	to_date = '';
        }

        $('#from_date').val(from_date);
        $('#to_date').val(to_date);
	}

	function getDateText(year, month, day)
	{
		var dd = day;
		var mm = month;
		var yyyy = year;

		if (dd < 10)
		    dd = '0' + dd;

		if (mm < 10)
		    mm = '0' + mm;

		return (mm + '/' + dd + '/' + yyyy);
	}

	function ajaxRetentionList()
	{
		if ($('#from_date').val() == '')
		{
			show_alert('Please select FROM DATE.');
			return;
		}

		if ($('#to_date').val() == '')
		{
			show_alert('Please select TO DATE.');
			return;
		}

	   	show_waiting('list', '', true);

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/retention_list.php',
			data : {
				'crm_id' : crm_id,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle
			},
			success:function(response)
			{
				show_waiting('list', '', false);

				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'error')
				{
					show_alert('Cannot load retention information.');
				}
				else
				{
					loaded_cycle = obj[2].cycle;
					var list_len = obj[2].report.length;
					var html = '';
					var bstart = '';
					var bend = '';
					
					// set retention head
					html = '<tr>';
					html += '<th rowspan="2" style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm btn_campaign_head"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></th>';
					html += '<th rowspan="2" style="vertical-align:middle"></th>';
					html += '<th rowspan="2" style="vertical-align:middle">Campaign (ID) Name</th>';
					html += '<th colspan="6" style="border: 1px solid #dadada">Initial Cycle</th>';
					for (var i = 1; i < loaded_cycle; i ++)
						html += '<th colspan="6" style="border: 1px solid #dadada">Subscription Cycle ' + i + '</th>';
					html += '</tr>';

					html += '<tr>';
					html += '<th style="border-left: 1px solid #dadada">Gross Orders</th>';
					html += '<th>Net Approved</th>';
					html += '<th>Void/Full Refund</th>';
					html += '<th>Partial Refund</th>';
					html += '<th>Void/Refund Revenue</th>';
					html += '<th>Approval Rate</th>';					
					for (var i = 1; i < loaded_cycle; i ++)
					{
						html += '<th style="border-left: 1px solid #dadada">Gross Orders</th>';
						html += '<th>Net Approved</th>';
						html += '<th>Void/Full Refund</th>';
						html += '<th>Partial Refund</th>';
						html += '<th>Void/Refund Revenue</th>';
						html += '<th>Conversion</th>';						
					}
					html += '</tr>';

					$('.table_retention_head').html(html);

					// set retention body
					if (list_len == 0)
					{
						show_alert('There is no any retention information.');
						return;
					}

					html = '';
					for (var i = 0; i < list_len; i ++)
					{
						html += '<tr id="camprow_' + obj[2].report[i][0] + '" class="camp_tr">';
						if (obj[2].report[i][0] == '-1')
						{
							bstart = '<b>';
							bend = '</b>';

							html += '<td></td>';
							html += '<td></td>';
							html += '<td>' + bstart + 'Total' + bend + '</td>';
						}
						else
						{
							bstart = '';
							bend = '';

							if (obj[2].report[i][2 + loaded_cycle * 6] == "yes")
								html += '<td><button type="button" class="btn btn-link btn-sm btn_campaign_expand" id="camp_' + obj[2].report[i][0] + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></td>';
							else
								html += '<td></td>';
							html += '<td></td>';
							html += '<td>(' + obj[2].report[i][0] + ') ' + obj[2].report[i][1] + '</td>';
						}
						html += '<td style="border-left: 1px solid #dadada">' + bstart + obj[2].report[i][2] + bend + '</td>';
						html += '<td>' + bstart + obj[2].report[i][3] + bend + '</td>';
						html += '<td>' + bstart + obj[2].report[i][4] + bend + '</td>';
						html += '<td>' + bstart + obj[2].report[i][5] + bend + '</td>';
						html += '<td>' + bstart + '$' + obj[2].report[i][6] + bend + '</td>';
						html += '<td>' + bstart + obj[2].report[i][7] + '%' + bend + '</td>';
						for (var j = 1; j < loaded_cycle; j ++)
						{
							html += '<td style="border-left: 1px solid #dadada">' + bstart + obj[2].report[i][j * 6 + 2] + bend + '</td>';
							html += '<td>' + bstart + obj[2].report[i][j * 6 + 3] + bend + '</td>';
							html += '<td>' + bstart + obj[2].report[i][j * 6 + 4] + bend + '</td>';
							html += '<td>' + bstart + obj[2].report[i][j * 6 + 5] + bend + '</td>';
							html += '<td>' + bstart + '$' + obj[2].report[i][j * 6 + 6] + bend + '</td>';
							html += '<td>' + bstart + obj[2].report[i][j * 6 + 7] + '%' + bend + '</td>';
						}
						html += '</tr>';
					}

					$('.table_retention_body').html(html);
				}
			},
			failure:function(response) 
			{
				show_waiting('list', '', false);
				show_alert('Cannot load retention information.');
			}
		});
	}

	function ajaxAffiliateList(cid)
	{
		campaign_waiting = true;

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/retention_aid.php',
			data : {
				'crm_id' : crm_id,
				'campaign_id' : cid,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle
			},
			success:function(response)
			{
				campaign_waiting = false;

				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'error')
				{
					$('#waittd_' + obj[1]).html(error_mark);
					return;
				}
				else
				{
					var html = '';
					var bstart = '';
					var bend = '';
					var campaign_id = obj[1];
					loaded_cycle = obj[2].cycle;

					for (var i = 0; i < obj[2].report.length; i ++)
					{
						if (i == 0)
							html = '<tr id="affrow_' + campaign_id + '_' + obj[2].report[i][0] + '" style="border: 2px solid #b3b3b3; border-top:none;" class="aff_item_by_' + campaign_id + '">';
						else
							html = '<tr id="affrow_' + campaign_id + '_' + obj[2].report[i][0] + '" style="border: 2px solid #b3b3b3; border-top:none; border-bottom:none;" class="aff_item_by_' + campaign_id + '">';
						html += '<td></td>';
						html += '<td id="affmark_' + campaign_id + '_' + obj[2].report[i][0] + '">' + spinner + '</td>';
						html += '<td>(' + obj[2].report[i][0] + ') ' + obj[2].report[i][1] + '</td>';
						html += '<td style="border-left: 1px solid #dadada">' + obj[2].report[i][2] + '</td>';
						html += '<td>' + obj[2].report[i][3] + '</td>';
						html += '<td>' + obj[2].report[i][4] + '</td>';
						html += '<td>' + obj[2].report[i][5] + '</td>';
						html += '<td>$' + obj[2].report[i][6] + '</td>';
						html += '<td>' + obj[2].report[i][7] + '%</td>';
						for (var j = 1; j < loaded_cycle; j ++)
						{
							html += '<td style="border-left: 1px solid #dadada">' + obj[2].report[i][j * 6 + 2] + '</td>';
							html += '<td>' + obj[2].report[i][j * 6 + 3] + '</td>';
							html += '<td>' + obj[2].report[i][j * 6 + 4] + '</td>';
							html += '<td>' + obj[2].report[i][j * 6 + 5] + '</td>';
							html += '<td>$' + obj[2].report[i][j * 6 + 6] + '</td>';
							html += '<td>' + obj[2].report[i][j * 6 + 7] + '%</td>';
						}
						html += '</tr>';

						$('#camprow_' + campaign_id).closest('tr').after(html);
						$('#waittr_' + campaign_id).remove();

						ajaxSubAffiliateList(campaign_id, obj[2].report[i][0], loaded_cycle, i == 0 ? true : false);
					}
				}
			},
			failure:function(response) 
			{
				campaign_waiting = false;
				show_alert('Cannot load affiliate information.');
			}
		});
	}

	function ajaxSubAffiliateList(cid, aid, loaded_cycle, lastitem)
	{
		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/retention_sub_aid.php',
			data : {
				'crm_id' : crm_id,
				'campaign_id' : cid,
				'affiliate_id' : aid,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle
			},
			success:function(response)
			{
				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'error')
				{
					$('#affmark_' + obj[1] + '_' + obj[2]).html(error_mark);
					return;
				}
				else
				{
					var html = '';
					var camp_id = obj[1];
					var aff_id = obj[2];

					$('#affmark_' + camp_id + '_' + aff_id).html(affiliate_mark);

					if (obj[3].report.length > 0 && lastitem)
						$('#affrow_' + camp_id + '_' + aff_id).css('border-bottom', 'none');

					for (var i = 0; i < obj[3].report.length; i ++)
					{
						if (i == 0 && lastitem)
							html = '<tr id="subaff_' + obj[3].report[i][0] + '" class="subaff_item_by_' + camp_id + ' esubaff_' + camp_id + '_' + aff_id + '" style="border: 2px solid #b3b3b3; border-top:none;">';
						else
							html = '<tr id="subaff_' + obj[3].report[i][0] + '" class="subaff_item_by_' + camp_id + ' esubaff_' + camp_id + '_' + aff_id + '" style="border: 2px solid #b3b3b3; border-top:none; border-bottom:none;">';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td>(' + obj[3].report[i][0] + ') ' + obj[3].report[i][1] + '</td>';
						html += '<td style="border-left: 1px solid #dadada">' + obj[3].report[i][2] + '</td>';
						html += '<td>' + obj[3].report[i][3] + '</td>';
						html += '<td>' + obj[3].report[i][4] + '</td>';
						html += '<td>' + obj[3].report[i][5] + '</td>';
						html += '<td>$' + obj[3].report[i][6] + '</td>';
						html += '<td>' + obj[3].report[i][7] + '%</td>';
						for (var j = 1; j < loaded_cycle; j ++)
						{
							html += '<td style="border-left: 1px solid #dadada">' + obj[3].report[i][j * 6 + 2] + '</td>';
							html += '<td>' + obj[3].report[i][j * 6 + 3] + '</td>';
							html += '<td>' + obj[3].report[i][j * 6 + 4] + '</td>';
							html += '<td>' + obj[3].report[i][j * 6 + 5] + '</td>';
							html += '<td>$' + obj[3].report[i][j * 6 + 6] + '</td>';
							html += '<td>' + obj[3].report[i][j * 6 + 7] + '%</td>';
						}
						html += '</tr>';
						
						$('#affrow_' + camp_id + '_' + aff_id).closest('tr').after(html);
					}
				}
			},
			failure:function(response) 
			{
			}
		});
	}
});