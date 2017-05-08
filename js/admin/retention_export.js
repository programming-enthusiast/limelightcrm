jQuery( document ).ready(function( $ ) 
{
	var campaign_waiting = false;

	//var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
	var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

    var success_mark = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>';
    var error_mark = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span>';
	
	var crm_list;
	var date_id = 'date_thisweek';
	var from_date = '';
	var to_date = '';
	var cycle = 1;
	var user_token = '';


	init();


	function init()
	{
		setDateText();
		ajaxGetCRMList();
	}

	$('body').scrollspy({
    	target: '.bs-docs-sidebar',
    	offset: 0
	});

	function show_alert(msg) 
	{
        $('.retention_alert').html(msg);
        $('.retention_alert').fadeIn(1000, function () {
            $('.retention_alert').fadeOut(3000);
        });
    }

    function show_waiting(show)
    {
    	if (show)
            $('.retention_waiting').html(spinner);
        else
            $('.retention_waiting').html('');
    }

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
        ajaxGetCRMList();
    });

    // crm refresh button
    $('.export_content').on('click', '.btn_refresh_crm', function (e)
    {
        var crm_id = $(this).prop('id').substring(7);
        
        for (var i = 0; i < crm_list.length; i ++)
        {
            if (crm_list[i][0] == crm_id)
            {
            	var html;

            	html = '<tr>';
                html += '<td>' + (i + 1) + '</td>';
                html += '<td>' + crm_list[i][1] + '</td>';
                html += '<td id="crmwait_' + crm_id + '">' + spinner + '</td>';
                html += '<td colspan="4"></td>';
                html += '</tr>';

            	$('#tbody_' + crm_id).html(html);
            	ajaxGetCampaignList(crm_id, i + 1, crm_list[i][1], '1');

            	return;
            }
        }
    });

    // campaign refresh button
    $('.export_content').on('click', '.btn_refresh_campaign', function (e)
    {
        var id_text = $(this).prop('id').substring(8);
		var pos = id_text.indexOf('_');
		var crm_id = parseInt(id_text.substr(0, pos));
		var camp_id = parseInt(id_text.substr(pos + 1));

		$('#count_' + crm_id + '_' + camp_id).html('0 / 0');
		$('#status_' + crm_id + '_' + camp_id).html(spinner);

		ajaxGetAffiliateList(crm_id, camp_id, '1');
    });

    // btn_export button
    $('.btn_export').click(function ()
    {
    	$('#label_all').prop('checked', false);
        $('.label_item').each( function(i) 
        {
            $(this).prop('checked', false);
        });

        ajaxCampaignLabelList();
    });

    // check all campaign label button
    $('#label_all').click(function ()
    {
        $('.label_item').each( function(i) 
        {
            if ($('#label_all').prop('checked'))
                $(this).prop('checked', true);
            else
                $(this).prop('checked', false);
        });
    });

    $('.modal_btn_export').click(function ()
    {
        var labels = ''; 

        $('.label_item').each( function(i) 
        {
            if ($(this).prop('checked'))
            {
                if (labels != '') labels += ' ';
                var label_id = $(this).prop('id').substring(6);
                labels += $('#label_' + label_id).html(); 
            }
        });

        $('#campaign_label_modal').modal('toggle');

		var url = './export_excel.php?type=retention&user_token=' + user_token + '&from_date=' + $('#from_date').val() + '&to_date=' + $('#to_date').val() + '&campaign_labels=' + labels;
    	window.location.href = url;
    });

    function ajaxGetCRMList()
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

		show_waiting(true);

		user_token = new Date().getTime();

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/crm_list.php',
			data : { },
			success:function(response)
			{
				show_waiting(false);

				if (response == 'error')
				{
					show_alert('sales', 'Cannot load CRM site information.');
					return;
				}
				else
				{
					crm_list = jQuery.parseJSON(response);
					var crm_count = crm_list.length;
                    var html = '';
                    var slide = '<li style="height:50px;"><a href="#Top">Back to top</a></li>';
                    
                    if (crm_count > 0)
                    {
                        for (var i = 0; i < crm_count; i ++)
                        {
                            html += '<section id="section_' + crm_list[i][0] + '" class="group">';
                            html += '<table class="table table-striped table-hover" style="margin-top:10px;">';
                            html += '<thead>';
                            html += '<tr>';
                            html += '<th style="width:100px;">CRM #</th>';
                            html += '<th style="width:200px;">CRM Name</th>';
                            html += '<th style="width:150px;">Campaign #</th>';
                            html += '<th>Campaign ID (Name)</th>';
                            html += '<th style="width:200px;">Affiliate Count</th>';
                            html += '<th style="width:100px;">Status</th>';
                            html += '<th style="width:100px;"><button id="refcrm_' + crm_list[i][0] + '" type="button" class="btn btn-link btn-sm btn_refresh btn_refresh_crm" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></th>';
                            html += '</tr>';
                            html += '</thead>';
                            html += '<tbody id="tbody_' + crm_list[i][0] + '">';
                            html += '<tr>';
                            html += '<td>' + (i + 1) + '</td>';
                            html += '<td>' + crm_list[i][1] + '</td>';
                            html += '<td id="crmwait_' + crm_list[i][0] + '">' + spinner + '</td>';
                            html += '<td colspan="4"></td>';
                            html += '</tr>';
                            html += '</tbody>';
                            html += '</table>';
                            html += '</section>';

                            slide += '<li><a href="#section_' + crm_list[i][0] + '">' + crm_list[i][1] + '</a></li>';
                        }

                        $('.export_content').html(html);
                        $('.crm_sidebar').html(slide);
                        $('.crm_sidebar').show();

                        for (var i = 0; i < crm_count; i ++)
                        	ajaxGetCampaignList(crm_list[i][0], i + 1, crm_list[i][1], '0');
                    } 
                    else 
                    {
                    	show_alert('There is no any crm site information.');
                    }                    
				}
			},
			failure:function(response) 
			{
				show_waiting(false);
				show_alert('Cannot load CRM site information.');
			}
		});
	}

	function ajaxGetCampaignList(crm_id, crm_num, crm_name, del)
	{
		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/export_retention_campaign.php',
			data : {
				'user_token' : user_token,
				'crm_id' : crm_id,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle,
				'delete' : del
			},
			success:function(response)
			{
				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'error')
				{
					$('#crmwait_' + obj[2]).html(error_mark);
					show_alert('Cannot load retention information.');
				}
				else
				{
					var cur_token = obj[1];
					var list_len = obj[3].length;
					var html = '';

					if (cur_token != user_token)
						return;
					
					// set retention body
					if (list_len == 0)
					{
						$('#crmwait_' + obj[2]).html('No Data');
						return;
					}

					html = '';
					for (var i = 0; i < list_len; i ++)
					{
						html += '<tr>';
						if (i == 0)
						{
							html += '<td rowspan="' + list_len + '" style="vertical-align:middle">' + crm_num + '</td>';
							html += '<td rowspan="' + list_len + '" style="vertical-align:middle">' + crm_name + '</td>';
						}
						html += '<td style="border-left: 1px solid #dadada;">' + (i + 1) + '</td>';
						html += '<td>(' + obj[3][i][0] + ') ' + obj[3][i][1] + '</td>';
						if (obj[3][i][2] == 'yes')
						{
							html += '<td id="count_' + obj[2] + '_' + obj[3][i][0] + '"></td>';
							html += '<td id="status_' + obj[2] + '_' + obj[3][i][0] + '">' + spinner + '</td>';
						}
						else
						{
							html += '<td id="count_' + obj[2] + '_' + obj[3][i][0] + '">0 / 0</td>';
							html += '<td id="status_' + obj[2] + '_' + obj[3][i][0] + '">' + success_mark + '</td>';
						}
						html += '<td><button id="refcamp_' + obj[2] + '_' + obj[3][i][0] + '" type="button" class="btn btn-link btn-sm btn_refresh btn_refresh_campaign" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></td>';
						html += '</tr>';
					}

					$('#tbody_' + obj[2]).html(html);

					for (var i = 0; i < list_len; i ++)
					{
						if (obj[3][i][2] == 'yes')
							ajaxGetAffiliateList(obj[2], obj[3][i][0], '0');
					}
				}
			},
			failure:function(response) 
			{
				show_waiting(false);
				show_alert('Cannot load campaign information.');
			}
		});
	}

	function ajaxGetAffiliateList(crm_id, campaign_id, del)
	{
		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/export_retention_affiliate.php',
			data : {
				'user_token' : user_token,
				'crm_id' : crm_id,
				'campaign_id' : campaign_id,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle,
				'delete' : del,
			},
			success:function(response)
			{
				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'error')
				{
					$('#status_' + obj[2]).html(error_mark);
					show_alert('Cannot load retention information.');
				}
				else
				{
					var cur_token = obj[1];
					var list_len = obj[4].length;
					var html = '';

					if (cur_token != user_token)
						return;
					
					$('#count_' + obj[2] + '_' + obj[3]).html('0 / ' + list_len);
					if (list_len == 0)
					{
						$('#status_' + obj[2] + '_' + obj[3]).html(success_mark);
						return;
					}

					for (var i = 0; i < list_len; i ++)
					{
						if (obj[4][i][2] == 'yes')
							ajaxGetSubAffiliateList(obj[2], obj[3], obj[4][i][0], '0');
						else
						{
							var count_text = $('#count_' + obj[2] + '_' + obj[3]).html();
							var pos = count_text.indexOf(' / ');
							var num1 = parseInt(count_text.substr(0, pos));
							var num2 = parseInt(count_text.substr(pos + 3));

							num1 ++;
							$('#count_' + obj[2] + '_' + obj[3]).html(num1 + ' / ' + num2);

							if (num1 == num2)
								$('#status_' + obj[2] + '_' + obj[3]).html(success_mark);
						}
					}
				}
			},
			failure:function(response) 
			{
				show_waiting(false);
				show_alert('Cannot load affiliate information.');
			}
		});
	}

	function ajaxGetSubAffiliateList(crm_id, campaign_id, affiliate_id, del)
	{
		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/export_retention_subaffiliate.php',
			data : {
				'user_token' : user_token,
				'crm_id' : crm_id,
				'campaign_id' : campaign_id,
				'affiliate_id' : affiliate_id,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'cycle' : cycle,
				'delete' : del,
			},
			success:function(response)
			{
				var obj = jQuery.parseJSON(response);

				if (obj[0] == 'success')
				{
					var cur_token = obj[1];
					var html = '';

					if (cur_token != user_token)
						return;
					
					var count_text = $('#count_' + obj[2] + '_' + obj[3]).html();
					var pos = count_text.indexOf(' / ');
					var num1 = parseInt(count_text.substr(0, pos));
					var num2 = parseInt(count_text.substr(pos + 3));

					num1 ++;
					$('#count_' + obj[2] + '_' + obj[3]).html(num1 + ' / ' + num2);

					if (num1 == num2)
						$('#status_' + obj[2] + '_' + obj[3]).html(success_mark);
				}
			},
			failure:function(response) 
			{
				show_waiting(false);
				show_alert('Cannot load sub affiliate information.');
			}
		});
	}

	function ajaxCampaignLabelList() 
    {
        show_waiting(true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_list.php',
            data : {},
            success:function(response)
            {
                show_waiting(false);

                if (response == 'error')
                {
                    show_alert('Cannot load campaign label list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
                    var html = '';

                    if (obj.length > 0)
                    {
                        for (var i = 0; i < obj.length; i ++)
                        {
                            html += '<tr>';
                            html += '<td>' + (i + 1) + '</td>';
                            html += '<td id="label_' + obj[i][0] + '">' + obj[i][1] + '</td>';
                            html += '<td><input type="checkbox" id="lblid_' + obj[i][0] + '" class="label_item"></td>';
                            html += '</tr>';
                        }

                        $('.table_campaign_label_body').html(html);
                        $('#campaign_label_modal').modal('toggle');
                    } 
                    else 
                    {
                        show_alert('There is no any campaign label list.');
                    }
                }
            },
            failure:function(response) 
            {
                show_waiting(false);
                show_alert('Cannot load campaign label list.');

                return;
            }
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
});