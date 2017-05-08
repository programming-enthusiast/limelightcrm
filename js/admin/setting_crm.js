jQuery( document ).ready(function( $ ) 
{
    var crm_id = -1;
	var crm_waiting = false;

    //var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
    var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

	
	init();


	function init()
	{
		ajaxCrmList();
	}

    function show_alert(type, msg) 
    {
        if (type == 'main')
        {
            $('.setting_crm_alert').html(msg);
            $('.setting_crm_alert').fadeIn(1000, function () {
                $('.setting_crm_alert').fadeOut(3000);
            });
        }
        else if (type == 'add')
        {
            $('.crm_add_alert').html(msg);
            $('.crm_add_alert').fadeIn(1000, function () {
                $('.crm_add_alert').fadeOut(3000);
            });
        }
        else if (type == 'edit')
        {
            $('.crm_edit_alert').html(msg);
            $('.crm_edit_alert').fadeIn(1000, function () {
                $('.crm_edit_alert').fadeOut(3000);
            });
        }
    }

    function show_waiting(show)
    {
        campaign_waiting = show;

        if (campaign_waiting)
            $('.setting_crm_waiting').html(spinner);
        else
            $('.setting_crm_waiting').html('');
    }

    // add crm function
    $('.btn_crm_add').click(function ()
    {
        $('.add_crm_name').val('');
        $('.add_crm_url').val('');
        $('.add_crm_username').val('');
        $('.add_crm_password').val('');
        $('.add_api_username').val('');
        $('.add_api_password').val('');
        $('.add_sales_goal').val('');
    });

    $('.modal_btn_crm_add').click(function ()
    {
        if ($('.add_crm_name').val() == '')
        {
            show_alert('add', 'Please input CRM Name.');
            $('.add_crm_name').focus();
            return;
        }

        if ($('.add_crm_url').val() == '')
        {
            show_alert('add', 'Please input CRM Site URL.');
            $('.add_crm_url').focus();
            return;
        }

        if ($('.add_crm_username').val() == '')
        {
            show_alert('add', 'Please input CRM User Name.');
            $('.add_crm_username').focus();
            return;
        }

        if ($('.add_crm_password').val() == '')
        {
            show_alert('add', 'Please input CRM Password.');
            $('.add_crm_password').focus();
            return;
        }

        if ($('.add_api_username').val() == '')
        {
            show_alert('add', 'Please input API User Name.');
            $('.add_api_username').focus();
            return;
        }

        if ($('.add_api_password').val() == '')
        {
            show_alert('add', 'Please input API Password.');
            $('.add_api_password').focus();
            return;
        }

        if ($('.add_sales_goal').val() == '')
        {
            show_alert('add', 'Please input Sales Goal.');
            $('.add_sales_goal').focus();
            return;
        }

        $('#crm_add_modal').modal('toggle');
        ajaxCrmAdd();
    });

    // edit crm function
    $('.table_crm_body').on('click', '.setting_crm_edit', function (e)
    {
        crm_id = $(this).prop('id');

        $('.edit_crm_name').val($('#name_' + crm_id).text());
        $('.edit_crm_url').val($('#url_' + crm_id).text());
        $('.edit_crm_username').val($('#id1_' + crm_id).text());
        $('.edit_crm_password').val($('#pass1_' + crm_id).text());
        $('.edit_api_username').val($('#id2_' + crm_id).text());
        $('.edit_api_password').val($('#pass2_' + crm_id).text());
        $('.edit_sales_goal').val($('#goal_' + crm_id).text());
    });

    $('.modal_btn_crm_edit').click(function ()
    {
        if ($('.edit_crm_name').val() == '')
        {
            show_alert('edit', 'Please input CRM Name.');
            $('.edit_crm_name').focus();
            return;
        }

        if ($('.edit_crm_url').val() == '')
        {
            show_alert('edit', 'Please input CRM Site URL.');
            $('.edit_crm_url').focus();
            return;
        }

        if ($('.edit_crm_username').val() == '')
        {
            show_alert('edit', 'Please input CRM User Name.');
            $('.edit_crm_username').focus();
            return;
        }

        if ($('.edit_crm_password').val() == '')
        {
            show_alert('edit', 'Please input CRM Password.');
            $('.edit_crm_password').focus();
            return;
        }

        if ($('.edit_api_username').val() == '')
        {
            show_alert('edit', 'Please input API User Name.');
            $('.edit_api_username').focus();
            return;
        }

        if ($('.edit_api_password').val() == '')
        {
            show_alert('edit', 'Please input API Password.');
            $('.edit_api_password').focus();
            return;
        }

        if ($('.edit_sales_goal').val() == '')
        {
            show_alert('edit', 'Please input Sales Goal.');
            $('.edit_sales_goal').focus();
            return;
        }

        $('#crm_edit_modal').modal('toggle');
        ajaxCrmEdit();
    });

    // delete crm function
    $('.table_crm_body').on('click', '.setting_crm_delete', function (e)
    {
        crm_id = $(this).prop('id');
    });

    $('.modal_btn_crm_delete').click(function ()
    {
        $('#crm_delete_modal').modal('toggle');
        ajaxCrmDelete();
    });

    function ajaxCrmList() 
    {
        if (crm_waiting) return;

        show_waiting(true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_crm_list.php',
            data : { },
            success:function(response)
            {
                show_waiting(false);

                if (response == 'error')
                {
                    show_alert('main', 'Cannot load CRM list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
					var crm_count = obj.length;
                    var html = '';                  
                    
                    if (crm_count > 0)
                    {
                        for (var i = 0; i < crm_count; i ++)
                        {
                            html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td id="name_' + obj[i][0] + '">' + obj[i][1] + '</td>';
                            html += '<td id="url_' + obj[i][0] + '">' + obj[i][2] + '</td>';
                            html += '<td id="id1_' + obj[i][0] + '">' + obj[i][3] + '</td>';
                            html += '<td id="pass1_' + obj[i][0] + '">' + obj[i][4] + '</td>';
                            html += '<td id="id2_' + obj[i][0] + '">' + obj[i][5] + '</td>';
                            html += '<td id="pass2_' + obj[i][0] + '">' + obj[i][6] + '</td>';
                            html += '<td id="goal_' + obj[i][0] + '">' + obj[i][7] + '</td><td>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_crm_edit" id="' + obj[i][0] + '" data-toggle="modal" data-target="#crm_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_crm_delete" id="' + obj[i][0] + '" data-toggle="modal" data-target="#crm_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html += '</td></tr>';   
                        }
                    } else {
                        show_alert('main', 'There is no any crm data.');
                    }

                    $('.table_crm_body').html(html);
                }
            },
            failure:function(response) 
            {
                show_waiting(false);
                show_alert('main', 'Cannot load CRM list.');

                return;
            }
        });
    }

    function ajaxCrmAdd()
    {
        show_waiting(true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_crm_add.php',
            data : {
                'crm_name' : $('.add_crm_name').val(), 
                'crm_url' : $('.add_crm_url').val(), 
                'crm_username' : $('.add_crm_username').val(), 
                'crm_password' : $('.add_crm_password').val(), 
                'api_username' : $('.add_api_username').val(), 
                'api_password' : $('.add_api_password').val(),
                'sales_goal' : $('.add_sales_goal').val()
            },
            success:function(response)
            {                
                show_waiting(false);                
                if (response == 'success')
                    ajaxCrmList();
                else
                    show_alert('main', 'CRM cannot be added.');
            },
            failure:function(response) 
            {
                show_waiting(false);                
                show_alert('main', 'CRM cannot be added.');
            }
        });
    }
    
    function ajaxCrmEdit()
    {
        show_waiting(true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_crm_edit.php',
            data : {
                'crm_id' : crm_id, 
                'crm_name' : $('.edit_crm_name').val(), 
                'crm_url' : $('.edit_crm_url').val(), 
                'crm_username' : $('.edit_crm_username').val(), 
                'crm_password' : $('.edit_crm_password').val(), 
                'api_username' : $('.edit_api_username').val(), 
                'api_password' : $('.edit_api_password').val(),
                'sales_goal' : $('.edit_sales_goal').val()
            },
            success:function(response)
            {
                show_waiting(false);                
                if (response == 'success')
                    ajaxCrmList();
                else
                    show_alert('main', 'CRM cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting(false);
                show_alert('main', 'CRM cannot be changed.');
            }
        });
    }

    function ajaxCrmDelete()
    {
        show_waiting(true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_crm_delete.php',
            data : {'crm_id' : crm_id},
            success:function(response)
            {                
                show_waiting(false);                
                if (response == 'success')
                    ajaxCrmList();
                else
                    show_alert('main', 'CRM cannot be deleted.');
            },
            failure:function(response) 
            {             
                show_waiting(false);
                show_alert('main', 'CRM cannot be deleted.');
            }
        });
    }
});