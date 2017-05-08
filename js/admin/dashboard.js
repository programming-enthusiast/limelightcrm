jQuery( document ).ready(function( $ ) 
{
    var sales_waiting = false;

    //var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
    var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

    var success_mark = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>';
    var error_mark = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span>';

    var new_alert_mark = '<span class="glyphicon glyphicon-alert" aria-hidden="true" style="color: #ffa5a5"></span>';
    var read_alert_mark = '<span class="glyphicon glyphicon-alert" aria-hidden="true"></span>';

    var read_mark = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>';
    var close_mark = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span>';
    

    var crm_list = new Array();
    
    var date_id = 'date_thisweek';
    var from_date = '';
    var to_date = '';

    init();


    function init()
    {
        setDateText();
        setAlertTimer();
        
        ajaxGetAlertRecent();
        ajaxGetCRMList();
    }

    function show_alert(type, msg) 
    {
        if (type == 'sales')
        {
            $('.dashboard_sales_alert').html(msg);
            $('.dashboard_sales_alert').fadeIn(1000, function () {
                $('.dashboard_sales_alert').fadeOut(3000);
            });
        }          
    }

    function show_waiting(type, id, show)
    {
        if (type == 'sales')
        {
            if (show)
                $('.dashboard_sales_waiting').html(spinner);
            else
                $('.dashboard_sales_waiting').html('');
        }
        else if (type == 'crm')
        {
            if (show)
            {
                $('#crm1_' + id).html(spinner);
                $('#crm2_' + id).html('');
                $('#crm3_' + id).html('');
                $('#crm4_' + id).html('');
                $('#crm5_' + id).html('');
                $('#crm6_' + id).html('');
                $('#crm7_' + id).html('');
            }
            else
                $('#crm1' + id).html('');
        }

    }

    function setAlertTimer()
    {
        var alert_interval_id = setInterval(function ()
        {
            ajaxGetAlertRecent();
        }, 60000);
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

    $('.sales_search_button').click(function ()
    {
        ajaxGetCRMList();
    });

    $('.btn_refresh_all').click(function ()
    {
        ajaxGetCRMList();
    });

    $('.table_dashboard_sales_body').on('click', '.btn_refresh', function (e)
    {
        var crm_id = $(this).prop('id').substring(8);
        
        for (var i = 0; i < crm_list.length; i ++)
        {
            if (crm_list[i][0] == crm_id)
            {
                ajaxGetSalesByCRM(crm_id, crm_list[i][7]);
                return;
            }
        }
    });

    $('.table_dashboard_alert_body').on('click', '.btn_alert_read', function (e)
    {
        var alert_id = $(this).prop('id');
        ajaxAlertReadItem(alert_id);
    });

    $('.table_dashboard_alert_body').on('click', '.btn_alert_delete', function (e)
    {
        var alert_id = $(this).prop('id');
        ajaxAlertDeleteItem(alert_id);
    });

    $('.btn_alert_delete_all').click(function ()
    {
        $('#alert_delete_all_modal').modal('toggle');
    });

    $('.modal_btn_alert_delete_all').click(function ()
    {
        $('#alert_delete_all_modal').modal('toggle');
        ajaxAlertDeleteAll();
    });

    function ajaxGetCRMList()
    {
        show_waiting('sales', '', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/crm_list.php',
            data : { },
            success:function(response)
            {
                show_waiting('sales', '', false);

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
                    
                    if (crm_count > 0)
                    {
                        for (var i = 0; i < crm_count; i ++)
                        {
                            html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td>' + crm_list[i][1] + '</td>';
                            html += '<td id="crm1_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm2_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm3_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm4_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm5_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm6_' + crm_list[i][0] + '"></td>';
                            html += '<td id="crm7_' + crm_list[i][0] + '"></td>';
                            html += '<td><button type="button" id="refresh_' + crm_list[i][0] + '" class="btn btn-link btn-sm btn_refresh" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></td>';
                            html += '</tr>';   
                        }

                        $('.table_dashboard_sales_body').html(html);

                        for (var i = 0; i < crm_count; i ++)
                            ajaxGetSalesByCRM(crm_list[i][0], crm_list[i][7]);
                    } 
                    else 
                    {
                        show_alert('sales', 'There is no any crm site information.');
                    }                    
                }
            },
            failure:function(response) 
            {
                show_waiting('sales', '', false);
                show_alert('sales', 'Cannot load CRM site information.');
            }
        });
    }
    
    function ajaxGetSalesByCRM(crm_id, crm_goal)
    {
        if ($('#from_date').val() == '')
        {
            show_alert('sales', 'Please select FROM DATE.');
            return;
        }

        if ($('#to_date').val() == '')
        {
            show_alert('sales', 'Please select TO DATE.');
            return;
        }

        show_waiting('crm', crm_id, true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/dashboard_sales.php',
            data : {
                'crm_id' : crm_id,
                'crm_goal' : crm_goal,
                'from_date' : $('#from_date').val(),
                'to_date' : $('#to_date').val()
            },
            success:function(response)
            {
                var obj = jQuery.parseJSON(response);

                if (obj[0] == 'error')
                {
                    show_alert('sales', 'Cannot load sales information.');
                    $('#crm1_' + obj[1]).html(error_mark);

                    return;
                }
                else
                {
                    var html = '<div class="bar-main-container"><div id="bar_' + obj[1] + '" class="bar-percentage">0</div><div class="bar-container"><div class="bar"></div></div></div>';
                    $('#crm6_' + obj[1]).html(html);                        
                
                    var step1 = parseFloat(obj[3][0]);
                    var step2 = parseFloat(obj[3][1]);
                    var tablet = parseFloat(obj[3][2]);
                    var s2nonpp = parseFloat(obj[3][3]);
                    var goal = parseFloat(obj[2]);

                    $('#crm1_' + obj[1]).html(step1);   // STEP1
                    $('#crm2_' + obj[1]).html(step2);   // STEP2

                    if (step1 != 0)     // TAKE RATE
                    {
                        var takeRate = step2 * 100 / step1;
                        $('#crm3_' + obj[1]).html(takeRate.toFixed(2));
                    }
                    else
                        $('#crm3_' + obj[1]).html('0');
                    
                    $('#crm4_' + obj[1]).html(tablet);  // TABLET S2
                    
                    if ((tablet + s2nonpp) != 0)    // TABLET %
                    {
                        var tabletp = tablet * 100 / (tablet + s2nonpp);
                        $('#crm5_' + obj[1]).html(tabletp.toFixed(2));
                    }
                    else
                        $('#crm5_' + obj[1]).html('0');

                    $('#crm7_' + obj[1]).html(step1 + ' / ' + goal);    // Goal

                    var progress = 0;                   // Progress
                    if (goal > 0)
                        progress = Math.round(step1 * 100 / goal);

                    var prgCtrl = $('#bar_' + obj[1]);
                    $({countNum: 0}).animate({countNum: progress}, {
                        duration: 2000,
                        easing:'linear',
                        step: function() {
                            var pct = Math.round(this.countNum) + '%';
                            prgCtrl.text(pct) && prgCtrl.siblings().children().css('width', pct);
                        }
                    });
                }
            },
            failure:function(response) 
            {
                show_alert('sales', 'Cannot load sales information.');
            }
        });
    }

    function setDateText()
    {
        var date = new Date();
        var today = getDateText(date.getFullYear(), date.getMonth() + 1, date.getDate());

        if (date_id == 'date_today')        // today
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

    function ajaxGetAlertRecent()
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/alert_recent_list.php',
            data : { },
            success:function(response)
            {
                var obj = jQuery.parseJSON(response);
                    
                if (obj[0] == 'success')
                {
                    var alerts = obj[1];
                    var html = '';

                    for (var i = 0; i < alerts.length; i ++)
                    {
                        html += '<tr>';
                        html += '<td style="border:none;width:50px;text-align:center;padding-top:12px;">' + (alerts[i][7] == '0' ? new_alert_mark : read_alert_mark) + '</td>';
                        html += '<td style="border:none;border-bottom: 2px solid #ccc;text-align:left;word-wrap: break-word;word-break:break-all;">';
                        html += 'Updated in ' + alerts[i][6] + ', ' + alerts[i][12] + '<br>';
                        html += '<b>' + alerts[i][11] + '</b><br>';
                        html += 'Current Value : ' + alerts[i][3] + ' (Level : ' + alerts[i][4] + ')<br>';
                        html += 'Report Date : ' + alerts[i][9] + ' ~ ' + alerts[i][10];
                        html += '</td>';
                        html += '<td style="border:none;border-bottom: 2px solid #ccc;width:50px;text-align:right">';
                        html += '<button type="button" class="btn btn-link btn-sm btn_alert_read" id="' + alerts[i][0] + '"' + (alerts[i][7] == '0' ? '' : 'disabled="disabled"') + '>' + read_mark + '</button>';
                        html += '<button type="button" class="btn btn-link btn-sm btn_alert_delete" id="' + alerts[i][0] + '">' + close_mark + '</button>';
                        html += '</td>';
                        html += '</tr>';   
                    }
                    
                    $('.table_dashboard_alert_body').html(html);
                }
            },
            failure:function(response) 
            {                
            }
        });
    }

    function ajaxAlertReadItem(aid)
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/alert_read_item.php',
            data : {'alert_id' : aid},
            success:function(response)
            {                
                ajaxGetAlertRecent();
            },
            failure:function(response) 
            {             
            }
        }); 
    }

    function ajaxAlertDeleteItem(aid)
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/alert_delete_item.php',
            data : {'alert_id' : aid},
            success:function(response)
            {                
                ajaxGetAlertRecent();
            },
            failure:function(response) 
            {             
            }
        }); 
    }

    function ajaxAlertDeleteAll()
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/alert_delete_item_all.php',
            data : {},
            success:function(response)
            {                
                ajaxGetAlertRecent();
            },
            failure:function(response) 
            {             
            }
        });
    }
});