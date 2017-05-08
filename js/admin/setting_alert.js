jQuery( document ).ready(function( $ ) 
{
    var crm_list;
    var crm_id = -1;
    var receiver_id = -1;
    var receiver_action = '';

	var level_waiting = false;
    var receiver_waiting = false;

    //var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
    var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

	
	init();


	function init()
	{
		ajaxCrmList();
        ajaxAlertReceiverList();
	}

    function show_alert(type, msg) 
    {
        if (type == 'level')
        {
            $('.setting_crm_alert').html(msg);
            $('.setting_crm_alert').fadeIn(1000, function () {
                $('.setting_crm_alert').fadeOut(3000);
            });
        }
        else if (type == 'level_edit')
        {
            $('.alert_edit_level').html(msg);
            $('.alert_edit_level').fadeIn(1000, function () {
                $('.alert_edit_level').fadeOut(3000);
            });
        }
        else if (type == 'receiver')
        {
            $('.setting_receiver_alert').html(msg);
            $('.setting_receiver_alert').fadeIn(1000, function () {
                $('.setting_receiver_alert').fadeOut(3000);
            });
        }
        else if (type == 'receiver_add')
        {
            $('.receiver_add_alert').html(msg);
            $('.receiver_add_alert').fadeIn(1000, function () {
                $('.receiver_add_alert').fadeOut(3000);
            });
        }
        else if (type == 'receiver_edit')
        {
            $('.receiver_edit_alert').html(msg);
            $('.receiver_edit_alert').fadeIn(1000, function () {
                $('.receiver_edit_alert').fadeOut(3000);
            });
        }
    }

    function show_waiting(type, show)
    {
        if (type == 'level')
        {
            level_waiting = show;

            if (level_waiting)
                $('.alert_level_waiting').html(spinner);
            else
                $('.alert_level_waiting').html('');
        }
        else if (type == 'receiver')
        {
            receiver_waiting = show;

            if (receiver_waiting)
                $('.alert_receiver_waiting').html(spinner);
            else
                $('.alert_receiver_waiting').html('');
        }
    }

    // edit alert level function
    $('.table_level_body').on('click', '.btn_level_edit', function (e)
    {
        crm_id = $(this).prop('id');

        $('.edit_crm_name').val($('#name_' + crm_id).text());
        $('.edit_level_1').val($('#level_1_' + crm_id).text());
        $('.edit_level_2').val($('#level_2_' + crm_id).text());
        $('.edit_level_3').val($('#level_3_' + crm_id).text());
        $('.edit_level_4').val($('#level_4_' + crm_id).text());
        $('.edit_level_5').val($('#level_5_' + crm_id).text());
        $('.edit_level_6').val($('#level_6_' + crm_id).text());
        $('.edit_level_7').val($('#level_7_' + crm_id).text());
        $('.edit_level_8').val($('#level_8_' + crm_id).text());
        $('.edit_level_9').val($('#level_9_' + crm_id).text());
        $('.edit_level_10').val($('#level_10_' + crm_id).text());
    });

    $('.modal_btn_level_edit').click(function ()
    {
        if ($('.edit_level_1').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_1').focus();
            return;
        }

        if ($('.edit_level_2').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_2').focus();
            return;
        }

        if ($('.edit_level_3').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_3').focus();
            return;
        }

        if ($('.edit_level_4').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_4').focus();
            return;
        }

        if ($('.edit_level_5').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_5').focus();
            return;
        }

        if ($('.edit_level_6').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_6').focus();
            return;
        }

        if ($('.edit_level_7').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_7').focus();
            return;
        }

        if ($('.edit_level_8').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_8').focus();
            return;
        }

        if ($('.edit_level_9').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_9').focus();
            return;
        }

        if ($('.edit_level_10').val() == '')
        {
            show_alert('level_edit', 'Please input Alert level.');
            $('.edit_level_10').focus();
            return;
        }

        $('#level_edit_modal').modal('toggle');
        
        for (var i = 0; i < 10; i ++)
            ajaxAlertLevelEdit(i + 1, crm_id, $('.edit_level_' + (i + 1)).val(), '0', (i == 9) ? true : false);
    });

    // add SMS alert receiver
    $('.btn_receiver_sms_add').click(function ()
    {
        receiver_action = 'sms';

        $('.add_receiver_label').html('SMS Number');
        $('.add_receiver_name').val('');
        $('.add_receiver_state').prop('checked', false);
    });

    $('.modal_btn_receiver_add').click(function ()
    {
        if (receiver_action == 'sms')
        {
            if ($('.add_receiver_name').val() == '')
            {
                show_alert('receiver_add', 'Please input SMS Number.');
                $('.add_receiver_name').focus();
                return;
            }

            ajaxAlertReceiverAdd(0);
        }
        else if (receiver_action == 'mail')
        {
            if ($('.add_receiver_name').val() == '')
            {
                show_alert('receiver_add', 'Please input Email Address.');
                $('.add_receiver_name').focus();
                return;
            }
            
            ajaxAlertReceiverAdd(1);
        }
        else if (receiver_action == 'bot')
        {
            if ($('.add_receiver_name').val() == '')
            {
                show_alert('receiver_add', 'Please input Bot Name.');
                $('.add_receiver_name').focus();
                return;
            }
            
            ajaxAlertReceiverAdd(2);
        }

        $('#receiver_add_modal').modal('toggle');        
    });

    // edit SMS alert receiver
    $('.table_receiver_sms_body').on('click', '.btn_receiver_sms_edit', function (e)
    {
        receiver_action = 'sms';
        receiver_id = $(this).prop('id');

        $('.edit_receiver_name').val($('#name1_' + receiver_id).text());
        if ($('#stts1_' + receiver_id).text() == 'Disable')
            $('.edit_receiver_state').prop('checked', true);
        else
            $('.edit_receiver_state').prop('checked', false);
    });

    $('.modal_btn_receiver_edit').click(function ()
    {
        if (receiver_action == 'sms')
        {
            if ($('.edit_receiver_name').val() == '')
            {
                show_alert('receiver_edit', 'Please input SMS Number.');
                $('.edit_receiver_name').focus();
                return;
            }

            ajaxAlertReceiverEdit(0);
        }
        else if (receiver_action == 'mail')
        {
            if ($('.edit_receiver_name').val() == '')
            {
                show_alert('receiver_edit', 'Please input Email Address.');
                $('.edit_receiver_name').focus();
                return;
            }

            ajaxAlertReceiverEdit(1);
        }
        else if (receiver_action == 'bot')
        {
            if ($('.edit_receiver_name').val() == '')
            {
                show_alert('receiver_edit', 'Please input Bot Name.');
                $('.edit_receiver_name').focus();
                return;
            }

            ajaxAlertReceiverEdit(2);
        }

        $('#receiver_edit_modal').modal('toggle');        
    });

    // delete SMS alert receiver
    $('.table_receiver_sms_body').on('click', '.btn_receiver_sms_delete', function (e)
    {
        receiver_action = 'sms';
        receiver_id = $(this).prop('id');
    });

    $('.modal_btn_receiver_delete').click(function ()
    {
        $('#receiver_delete_modal').modal('toggle');

        if (receiver_action == 'sms')
            ajaxAlertReceiverDelete(0);
        else if (receiver_action == 'mail')
            ajaxAlertReceiverDelete(1);
        else if (receiver_action == 'bot')
            ajaxAlertReceiverDelete(2);
    });

    // add Email alert receiver
    $('.btn_receiver_mail_add').click(function ()
    {
        receiver_action = 'mail';

        $('.add_receiver_label').html('Email Address');
        $('.add_receiver_name').val('');
        $('.add_receiver_state').prop('checked', false);
    });

    // edit Email alert receiver
    $('.table_receiver_mail_body').on('click', '.btn_receiver_mail_edit', function (e)
    {
        receiver_action = 'mail';
        receiver_id = $(this).prop('id');

        $('.edit_receiver_name').val($('#name2_' + receiver_id).text());
        if ($('#stts2_' + receiver_id).text() == 'Disable')
            $('.edit_receiver_state').prop('checked', true);
        else
            $('.edit_receiver_state').prop('checked', false);
    });

    // delete Email alert receiver
    $('.table_receiver_mail_body').on('click', '.btn_receiver_mail_delete', function (e)
    {
        receiver_action = 'mail';
        receiver_id = $(this).prop('id');
    });

    // add Bot alert receiver
    $('.btn_receiver_bot_add').click(function ()
    {
        receiver_action = 'bot';

        $('.add_receiver_label').html('Bot Name');
        $('.add_receiver_name').val('');
        $('.add_receiver_state').prop('checked', false);
    });

    // edit Bot receiver
    $('.table_receiver_bot_body').on('click', '.btn_receiver_bot_edit', function (e)
    {
        receiver_action = 'bot';
        receiver_id = $(this).prop('id');

        $('.edit_receiver_name').val($('#name3_' + receiver_id).text());
        if ($('#stts3_' + receiver_id).text() == 'Disable')
            $('.edit_receiver_state').prop('checked', true);
        else
            $('.edit_receiver_state').prop('checked', false);
    });

    // delete Bot alert receiver
    $('.table_receiver_bot_body').on('click', '.btn_receiver_bot_delete', function (e)
    {
        receiver_action = 'bot';
        receiver_id = $(this).prop('id');
    });


    function ajaxCrmList() 
    {
        if (level_waiting) return;

        show_waiting('level', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/crm_list.php',
            data : { },
            success:function(response)
            {
                show_waiting('level', false);

                if (response == 'error')
                {
                    show_alert('level', 'Cannot load CRM list.');
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
                            html += '<td id="name_' + crm_list[i][0] + '">' + crm_list[i][1] + '</td>';
                            html += '<td id="level_1_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_2_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_3_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_4_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_5_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_6_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_7_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_8_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_9_' + crm_list[i][0] + '"></td>';
                            html += '<td id="level_10_' + crm_list[i][0] + '"></td>';
                            html += '<td><button type="button" class="btn btn-link btn-sm btn_level_edit" id="' + crm_list[i][0] + '" data-toggle="modal" data-target="#level_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button></td>';
                            html += '</tr>';   
                        }
                    } 
                    else
                        show_alert('level', 'There is no any crm data.');

                    $('.table_level_body').html(html);
                    
                    for (var i = 0; i < crm_count; i ++)
                    {
                        ajaxAlertLevelList(crm_list[i][0]);
                    }                    
                }
            },
            failure:function(response) 
            {
                show_waiting('level', false);
                show_alert('level', 'Cannot load CRM list.');

                return;
            }
        });
    }

    function ajaxAlertLevelList(cid)
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_alert_list.php',
            data : {
                'crm_id' : cid
            },
            success:function(response)
            {
                var obj = jQuery.parseJSON(response);

                if (obj[0] == 'error')
                {
                    show_alert('level', 'Cannot load alert level information.');
                    return;
                }
                else
                {
                    var level_count = obj[2].length;

                    for (var i = 0; i < level_count; i ++)
                        $('#level_' + obj[2][i][2] + '_' + obj[1]).html(obj[2][i][4]);
                }
            },
            failure:function(response) 
            {
                show_alert('level', 'Cannot load alert level information.');
            }
        });
    }

    function ajaxAlertLevelEdit(atype, cid, level1, level2, updated)
    {
        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_alert_edit.php',
            data : {
                'type' : atype,
                'crm_id' : cid,
                'level1' : level1,
                'level2' : level2
            },
            success:function(response)
            {
                if (response == 'error')
                    show_alert('level', 'Alert level cannot be changed.');

                if (updated)
                    ajaxCrmList();
            },
            failure:function(response) 
            {
                show_alert('level', 'Alert level cannot be changed.');
            }
        });
    }

    function ajaxAlertReceiverList()
    {
        show_waiting('receiver', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_receiver_list.php',
            data : { },
            success:function(response)
            {
                var obj = jQuery.parseJSON(response);

                show_waiting('receiver', false);

                if (obj[0] == 'error')
                {
                    show_alert('receiver', 'Cannot load alert receiver list.');
                    return;
                }
                else
                {
                    var recvs = obj[1];

                    var html1 = '';     // for sms
                    var html2 = '';     // for email
                    var html3 = '';     // for bot

                    var num1 = 0;     // for sms
                    var num2 = 0;     // for email
                    var num3 = 0;     // for bot
                    
                    for (var i = 0; i < recvs.length; i ++)
                    {
                        if (recvs[i][1] == '0')
                        {
                            num1 ++;

                            html1 += '<tr>';
                            html1 += '<td>' + num1 + '</td>';
                            html1 += '<td id="name1_' + recvs[i][0] + '" style="word-wrap:break-word;word-break:break-all;">' + recvs[i][2] + '</td>';
                            html1 += '<td id="stts1_' + recvs[i][0] + '">' + (recvs[i][3] == '1' ? 'Enable' : 'Disable') + '</td>';
                            html1 += '<td>';
                            html1 += '<button type="button" class="btn btn-link btn-sm btn_receiver_sms_edit" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html1 += '<button type="button" class="btn btn-link btn-sm btn_receiver_sms_delete" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html1 += '</td>';
                            html1 += '</tr>';
                        }
                        else if (recvs[i][1] == '1')
                        {
                            num2 ++;

                            html2 += '<tr>';
                            html2 += '<td>' + num2 + '</td>';
                            html2 += '<td id="name2_' + recvs[i][0] + '" style="word-wrap:break-word;word-break:break-all;">' + recvs[i][2] + '</td>';
                            html2 += '<td id="stts2_' + recvs[i][0] + '">' + (recvs[i][3] == '1' ? 'Enable' : 'Disable') + '</td>';
                            html2 += '<td>';
                            html2 += '<button type="button" class="btn btn-link btn-sm btn_receiver_mail_edit" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html2 += '<button type="button" class="btn btn-link btn-sm btn_receiver_mail_delete" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html2 += '</td>';
                            html2 += '</tr>';
                        }
                        else if (recvs[i][1] == '2')
                        {
                            num3 ++;

                            html3 += '<tr>';
                            html3 += '<td>' + num3 + '</td>';
                            html3 += '<td id="name3_' + recvs[i][0] + '" style="word-wrap:break-word;word-break:break-all;">' + recvs[i][2] + '</td>';
                            html3 += '<td id="stts3_' + recvs[i][0] + '">' + (recvs[i][3] == '1' ? 'Enable' : 'Disable') + '</td>';
                            html3 += '<td>';
                            html3 += '<button type="button" class="btn btn-link btn-sm btn_receiver_bot_edit" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html3 += '<button type="button" class="btn btn-link btn-sm btn_receiver_bot_delete" id="' + recvs[i][0] + '" data-toggle="modal" data-target="#receiver_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html3 += '</td>';
                            html3 += '</tr>';
                        }
                    }
                
                    $('.table_receiver_sms_body').html(html1);
                    $('.table_receiver_mail_body').html(html2);
                    $('.table_receiver_bot_body').html(html3);
                }
            },
            failure:function(response) 
            {
                show_waiting('account', false);
                show_alert('account', 'Cannot load account list.');

                return;
            }
        });
    }

    function ajaxAlertReceiverAdd(type)
    {
        show_waiting('receiver', true);

        var status = 1;

        if ($('.add_receiver_state').prop('checked'))
            status = 0;

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_receiver_add.php',
            data : {
                'type' : type, 
                'address' : $('.add_receiver_name').val(), 
                'status' : status
            },
            success:function(response)
            {                
                show_waiting('receiver', false);                

                if (response == 'success')
                    ajaxAlertReceiverList();
                else
                    show_alert('receiver', 'Alert receiver cannot be added.');
            },
            failure:function(response) 
            {
                show_waiting('receiver', false);                
                show_alert('receiver', 'Alert receiver cannot be added.');
            }
        });
    }

    function ajaxAlertReceiverEdit(type)
    {
        show_waiting('receiver', true);

        var status = 1;
        if ($('.edit_receiver_state').prop('checked'))
            status = 0;

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_receiver_edit.php',
            data : {
                'receiver_id' : receiver_id, 
                'type' : type, 
                'address' : $('.edit_receiver_name').val(), 
                'status' : status
            },
            success:function(response)
            {
                show_waiting('receiver', false);

                if (response == 'success')
                    ajaxAlertReceiverList();
                else
                    show_alert('receiver', 'Alert receiver cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting('receiver', false);
                show_alert('receiver', 'Alert receiver cannot be changed.');
            }
        });
    }

    function ajaxAlertReceiverDelete(type)
    {
        show_waiting('receiver', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_receiver_delete.php',
            data : {'receiver_id' : receiver_id},
            success:function(response)
            {                
                show_waiting('receiver', false);  

                if (response == 'success')
                    ajaxAlertReceiverList();
                else
                    show_alert('receiver', 'Alert receiver cannot be deleted.');
            },
            failure:function(response) 
            {             
                show_waiting('receiver', false);
                show_alert('receiver', 'Alert receiver cannot be deleted.');
            }
        });
    }
});