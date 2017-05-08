jQuery( document ).ready(function( $ ) 
{
	var affiliate_waiting = false;

	//var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
	var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

    var success_mark = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>';
    var error_mark = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span>';

    var plus_mark = '<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>';
    var minus_mark = '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>';

	var crm_list = new Array();

	var user_token = '';

	var date_id = 'date_thisweek';

	var from_date = '';
	var to_date = '';

	
	init();


	function init()
	{
		user_token = Math.floor((Math.random() * 10) + 1);

		setDateText();
		load_crms();
	}

	function show_alert(msg) 
	{
        $('.dashboard_affiliate_alert').html(msg);
        $('.dashboard_affiliate_alert').fadeIn(1000, function () {
            $('.dashboard_affiliate_alert').fadeOut(3000);
        });
    }

    function show_waiting(type, id, show)
    {
    	if (type == 'affiliate')
    	{
	        if (show)
	            $('.dashboard_affiliate_waiting').html(spinner);
	        else
	            $('.dashboard_affiliate_waiting').html('');
	    }
	    else if (type == 'crm')
    	{
	        if (show)
	        {
	            $('#acount_' + id).html('');
	            $('#astate_' + id).html(spinner);
	        }
	        else
	            $('#astate_' + id).html('');
	    }

    }

    $('.input-daterange').datepicker({
	});

	$('.date_dropdown_menu li').on("click", function (e) 
    {
        var date_text = $(this).text();
        date_id = $(this).find('a').attr('id');

        $('.date_toggle_button').html(date_text + " <span class=\"caret\"></span>");

		setDateText();
    });

    $('.affiliate_search_button').click(function ()
    {
        load_crms();
    });

    $('.btn_refresh_all').click(function ()
    {
        load_crms();
    });

    $('.table_affiliate_state_body').on('click', '.btn_refresh', function (e)
    {
        var crm_id = $(this).prop('id').substring(9);

        load_affiliate_list(crm_id, '0');
    });

    $('.btn_expand_all').click(function ()
    {
    	if (affiliate_waiting)
    		return;

        var html = '';
        var currernt_mark = $(this).html();
        var isPlus = (currernt_mark.indexOf('glyphicon-plus-sign') != -1) ? true : false;

        $('.btn_sub_expand').each( function(i) 
        {
        	affiliate_id = $(this).prop('id').substring(4);
        	delete_affiliate_expand_items(affiliate_id);

            if (isPlus)
            {
            	$('#aid_' + affiliate_id).html(minus_mark);

            	html = '<tr id="asubid_' + affiliate_id + '" style="border: 2px solid #b3b3b3; border-top:none;" class="affiliate_sub_item">';
				html += '<td></td>';
				html += '<td id="awaitid_' + affiliate_id + '">' + spinner + '</td>';
				html += '<td colspan="7"></td>';
				html += '</tr>';

				$(this).closest('tr').after(html);

				load_affiliate_sub(affiliate_id);
            }
            else
            {
            	$('#aid_' + affiliate_id).html(plus_mark);
            }
        });

		if (isPlus)
        	$(this).html(minus_mark);
        else
			$(this).html(plus_mark);
    });

    $('.table_affiliate_data_body').on('click', '.btn_sub_expand', function (e)
    {
    	if (affiliate_waiting)
    		return;
    	
        var html = '';
        var currernt_mark = $(this).html();
        var isPlus = (currernt_mark.indexOf('glyphicon-plus-sign') != -1) ? true : false;

        affiliate_id = $(this).prop('id').substring(4);

		delete_affiliate_expand_items(affiliate_id);

        if (isPlus)
        {
        	$(this).html(minus_mark);

			html = '<tr id="asubid_' + affiliate_id + '" style="border: 2px solid #b3b3b3; border-top:none;" class="affiliate_sub_item">';
			html += '<td></td>';
			html += '<td id="awaitid_' + affiliate_id + '">' + spinner + '</td>';
			html += '<td colspan="7"></td>';
			html += '</tr>';

			$(this).closest('tr').after(html);

			load_affiliate_sub(affiliate_id);
        }
        else
        {
			$(this).html(plus_mark);
        }
    });

    function delete_affiliate_expand_items(aid)
    {
		$('.affiliate_sub_item').each( function(i) 
        {
        	var current_aid = $(this).prop('id');

        	if (current_aid == ('aitemid_' + aid))
        		$(this).remove();
        });

        $('#asubid_' + aid).remove();
    }


	function load_crms()
	{
		show_waiting('affiliate', '', true);

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/crm_list.php',
			data : { },
			success:function(response)
			{
				show_waiting('affiliate', '', false);

				if (response == 'error')
				{
					show_alert('Cannot load CRM site information.');
					return;
				}
				else
				{
					crm_list = jQuery.parseJSON(response);
					var crm_count = crm_list.length;
                    var html = '';
                    
                    if (crm_count > 0)
                    {
                        for (var i = 0; i < crm_count; i ++)
                        {
                        	html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td>' + crm_list[i][1] + '</td>';
                            html += '<td id="acount_' + crm_list[i][0] + '"></td>';
                            html += '<td id="astate_' + crm_list[i][0] + '"></td>';
                            html += '<td><button type="button" id="arefresh_' + crm_list[i][0] + '" class="btn btn-link btn-sm btn_refresh" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></td>';
                            html += '</tr>';   
                        }

                        $('.table_affiliate_state_body').html(html);

						for (var i = 0; i < crm_count; i ++)
                        {
                        	if (i == 0)
                        		load_affiliate_list(crm_list[i][0], '1');
                        	else
                        		load_affiliate_list(crm_list[i][0], '0');
                        }
                    } 
                    else 
                    {
                    	show_alert('There is no any crm site information.');
                    }                    
				}
			},
			failure:function(response) 
			{
				show_waiting('affiliate', '', false);
				show_alert('Cannot load CRM site information.');
			}
		});
	}
	
	function load_affiliate_list(crm_id, del)
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

		show_waiting('crm', crm_id, true);

    	$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/dashboard_affiliate_list.php',
			data : {
				'user_token' : user_token,
				'crm_id' : crm_id,
				'from_date' : $('#from_date').val(),
				'to_date' : $('#to_date').val(),
				'delete' : del
			},
			success:function(response)
			{
				var obj = jQuery.parseJSON(response);
				
				if (obj[0] == 'error')
				{
					show_alert('Cannot load affiliate information.');
					$('#astate_' + obj[1]).html(error_mark);
				}
				else
				{
					$('#acount_' + obj[1]).html('0 / ' + obj[2].length);
					if (obj[2].length == '0')
					{
						$('#astate_' + obj[1]).html(success_mark);
						return;
					}

					for (var j = 0; j < obj[2].length; j ++)
					{
						$.ajax(
						{
							type : 'GET',
							url : '../daemon/ajax/dashboard_affiliate_cid.php',
							data : {
								'user_token' : user_token,
								'crm_id' : obj[1],
								'campaign_id' : obj[2][j].campaign_id,
								'from_date' : $('#from_date').val(),
								'to_date' : $('#to_date').val(),
							},
							success:function(response)
							{
								var obj = jQuery.parseJSON(response);
								
								if (obj[0] == 'success')
								{
									var count_text = $('#acount_' + obj[1]).html();
									var pos = count_text.indexOf(' / ');
									var num1 = parseInt(count_text.substr(0, pos));
									var num2 = parseInt(count_text.substr(pos + 3));

									num1 ++;
									$('#acount_' + obj[1]).html(num1 + ' / ' + num2);

									if (num1 == num2)
									{
										$('#astate_' + obj[1]).html(success_mark);
										load_affiliate_sum();
									}
								}
							},
							failure:function(response) 
							{
								show_alert('Cannot load affiliate information.');
							}
						});
					}
				}
			},
			failure:function(response) 
			{
				show_alert('Cannot load affiliate information.');
			}
		});
	}

	function load_affiliate_sum()
	{
		$('.btn_sub_expand').each( function(i) 
        {
        	affiliate_id = $(this).prop('id').substring(4);
        	delete_affiliate_expand_items(affiliate_id);

            $('#aid_' + affiliate_id).html(plus_mark);
        });

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/dashboard_affiliate_sum.php',
			data : {
				'user_token' : user_token
			},
			success:function(response)
			{
				if (response == 'error')
				{
					show_alert('Cannot load affiliate sum information.');
					return;
				}
				else
				{
					var obj = jQuery.parseJSON(response);
					var html = '';

					for (var i = 0; i < obj.length; i ++)
					{
						var step1 = parseFloat(obj[i][1]);
						var step2 = parseFloat(obj[i][2]);
						var tablet = parseFloat(obj[i][3]);
						var s2nonpp = parseFloat(obj[i][4]);
						//var goal = parseFloat(obj[2]);

						html += '<tr id="asumid_' + obj[i][0] + '">';
						html += '<td><button type="button" class="btn btn-link btn-sm btn_sub_expand" id="aid_' + obj[i][0] + '">' + plus_mark + '</button></td>';
						html += '<td>(' + obj[i][0] + ')&nbsp;' + obj[i][5] + '</td>';
						html += '<td>' + step1 + '</td>';
						html += '<td>' + step2 + '</td>';

						if (step1 != 0) 	// TAKE RATE
						{
							var takeRate = step2 * 100 / step1;
							html += '<td>' + takeRate.toFixed(2) + '</td>';
						}
						else
							html += '<td>0</td>';

						html += '<td>' + tablet + '</td>';

						if ((tablet + s2nonpp) != 0)	// TABLET %
						{
							var tabletp = tablet * 100 / (tablet + s2nonpp);
							html += '<td>' + tabletp.toFixed(2) + '</td>';
						}
						else
							html += '<td>0</td>';

						html += '<td></td>';
						html += '<td></td>';
						html += '</tr>';
					}

					$('.table_affiliate_data_body').html(html);
				}
			},
			failure:function(response) 
			{
				show_alert('Cannot load affiliate sum information.');
			}
		});
	}

	function load_affiliate_sub(affiliate_id)
	{
		affiliate_waiting = true;

		$.ajax(
		{
			type : 'GET',
			url : '../daemon/ajax/dashboard_affiliate_sub.php',
			data : {
				'affiliate_id' : affiliate_id,
				'user_token' : user_token
			},
			success:function(response)
			{
				affiliate_waiting = false;

				var obj = jQuery.parseJSON(response);
				var html = '';

				if (obj[0] == 'error')
				{
					$('#awaitid_' + obj[1]).html(error_mark);
					return;
				}
				else
				{
					for (var i = 0; i < obj[2].length; i ++)
					{
						var step1 = parseFloat(obj[2][i][1]);
						var step2 = parseFloat(obj[2][i][2]);
						var tablet = parseFloat(obj[2][i][3]);
						var s2nonpp = parseFloat(obj[2][i][4]);
						var goal = parseFloat(obj[2][i][6]);

						html = '<tr id="aitemid_' + obj[1] + '" style="border: 2px solid #b3b3b3; border-top:none; border-bottom:none;" class="affiliate_sub_item">';
						html += '<td></td>';
						html += '<td>' + obj[2][i][5] + '</td>';
						html += '<td>' + step1 + '</td>';
						html += '<td>' + step2 + '</td>';

						if (step1 != 0) 	// TAKE RATE
						{
							var takeRate = step2 * 100 / step1;
							html += '<td>' + takeRate.toFixed(2) + '</td>';
						}
						else
							html += '<td>0</td>';

						html += '<td>' + tablet + '</td>';

						if ((tablet + s2nonpp) != 0)	// TABLET %
						{
							var tabletp = tablet * 100 / (tablet + s2nonpp);
							html += '<td>' + tabletp.toFixed(2) + '</td>';
						}
						else
							html += '<td>0</td>';

						if (goal > 0)
						{
							var progress = step1 * 100 / goal;					// Progress
							html += '<td>' + progress.toFixed(2) + '</td>';
						}
						else
							html += '<td>0</td>';

						html += '<td>' + goal + '</td>';
						html += '</tr>';

						$('#asumid_' + obj[1]).closest('tr').after(html);
					}
					
					if (obj[2].length == 0)
						$('#awaitid_' + obj[1]).html('There is no any affiliate data.');
					else
						$('#awaitid_' + obj[1]).html(success_mark);
				}				
			},
			failure:function(response) 
			{
				affiliate_waiting = false;
				show_alert('Cannot load affiliate sub information.');
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