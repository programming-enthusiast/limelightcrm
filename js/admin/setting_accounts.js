jQuery( document ).ready(function( $ ) 
{
	var account_id = -1;
    var blockip_id = -1;

	var account_waiting = false;
	var ip_waiting = false;

    //var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
    var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

    var blockip_action = '';

	
	init();


	function init()
	{
		ajaxAccountList();
        ajaxBlockIPList();
	}

	function show_alert(type, msg) 
    {
        if (type == 'account')
        {
            $('.setting_account_alert').html(msg);
            $('.setting_account_alert').fadeIn(1000, function () {
                $('.setting_account_alert').fadeOut(3000);
            });
        }
        else if (type == 'account_add')
        {
            $('.account_add_alert').html(msg);
            $('.account_add_alert').fadeIn(1000, function () {
                $('.account_add_alert').fadeOut(3000);
            });
        }
        else if (type == 'account_edit')
        {
            $('.account_edit_alert').html(msg);
            $('.account_edit_alert').fadeIn(1000, function () {
                $('.account_edit_alert').fadeOut(3000);
            });
        }
        else if (type == 'blockip')
        {
            $('.setting_ip_alert').html(msg);
            $('.setting_ip_alert').fadeIn(1000, function () {
                $('.setting_ip_alert').fadeOut(3000);
            });
        }
        else if (type == 'blockip_modal')
        {
            $('.block_ip_alert').html(msg);
            $('.block_ip_alert').fadeIn(1000, function () {
                $('.block_ip_alert').fadeOut(3000);
            });
        }
    }

    function show_waiting(type, show)
    {
    	if (type == 'account')
    	{
	        account_waiting = show;

	        if (account_waiting)
	            $('.setting_account_waiting').html(spinner);
	        else
	            $('.setting_account_waiting').html('');
	    }
		else if (type == 'blockip')
    	{
	        ip_waiting = show;

	        if (ip_waiting)
	            $('.setting_ip_waiting').html(spinner);
	        else
	            $('.setting_ip_waiting').html('');
	    }
    }

    // add account function
    $('.btn_account_add').click(function ()
    {
        $('.add_user_name').val('');
        $('.add_password').val('');
        $('.add_display_name').val('');
        $('.add_role').prop('checked', false);
        $('.add_state').prop('checked', false);
    });

    $('.modal_btn_account_add').click(function ()
    {
    	if ($('.add_user_name').val() == '')
        {
            show_alert('account_add', 'Please input User Name.');
            $('.add_user_name').focus();
            return;
        }

        if ($('.add_password').val() == '')
        {
            show_alert('account_add', 'Please input Password.');
            $('.add_password').focus();
            return;
        }

        if ($('.add_display_name').val() == '')
        {
            show_alert('account_add', 'Please input Display Name.');
            $('.add_display_name').focus();
            return;
        }

        $('#account_add_modal').modal('toggle');
        ajaxAccountAdd();
    });

    // edit account function
    $('.table_account_body').on('click', '.setting_account_edit', function (e)
    {
        account_id = $(this).prop('id');

        $('.edit_user_name').val($('#name_' + account_id).text());
        $('.edit_password').val($('#pass_' + account_id).text());
        $('.edit_display_name').val($('#disp_' + account_id).text());

        if ($('#role_' + account_id).text() == 'admin')
        	$('.edit_role').prop('checked', true);
        else
        	$('.edit_role').prop('checked', false);

        if ($('#state_' + account_id).text() == 'Disable')
	        $('.edit_state').prop('checked', true);
	    else
	    	$('.edit_state').prop('checked', false);
    });

    $('.modal_btn_account_edit').click(function ()
    {
    	if ($('.edit_user_name').val() == '')
        {
            show_alert('account_edit', 'Please input User Name.');
            $('.edit_user_name').focus();
            return;
        }

        if ($('.edit_password').val() == '')
        {
            show_alert('account_edit', 'Please input Password.');
            $('.edit_password').focus();
            return;
        }

        if ($('.edit_display_name').val() == '')
        {
            show_alert('account_edit', 'Please input Display Name.');
            $('.edit_display_name').focus();
            return;
        }

        $('#account_edit_modal').modal('toggle');
        ajaxAccountEdit();
    });

    // delete account function
    $('.table_account_body').on('click', '.setting_account_delete', function (e)
    {
        account_id = $(this).prop('id');
    });

    $('.modal_btn_account_delete').click(function ()
    {
        $('#account_delete_modal').modal('toggle');
        ajaxAccountDelete();
    });

    // edit permission function
    $('.table_account_body').on('click', '.setting_permission_edit', function (e)
    {
        account_id = $(this).prop('id');
        
        $('#permission_all').prop('checked', false);
        $('.permission_item').each( function(i) 
        {
            $(this).prop('checked', false);
        });

        ajaxAccountPermissionList();
    });

    $('.modal_btn_permission_edit').click(function ()
    {
        var permissions = ''; 

        $('.permission_item').each( function(i) 
        {
            if ($(this).prop('checked'))
            {
                if (permissions != '') permissions += ',';
                permissions += $(this).prop('id').substring(11);
            }
        });

        $('#permission_edit_modal').modal('toggle');
        ajaxAccountPermissionEdit(permissions);
    });

    // check all permission button
    $('#permission_all').click(function ()
    {
        $('.permission_item').each( function(i) 
        {
            if ($('#permission_all').prop('checked'))
                $(this).prop('checked', true);
            else
                $(this).prop('checked', false);
        });
    });

    // add blockip function
    $('.btn_blockip_add').click(function ()
    {
        blockip_action = 'add';

        $('.ip_address').val('');
        $('.ip_description').val('');
    });

    $('.modal_btn_blockip_apply').click(function ()
    {
        if ($('.ip_address').val() == '')
        {
            show_alert('blockip_modal', 'Please input IP Address.');
            $('.ip_address').focus();
            return;
        }

        $('#block_ip_modal').modal('toggle');

        if (blockip_action == 'add')
            ajaxBlockIPAdd();
        else if (blockip_action == 'edit')
            ajaxBlockIPEdit();
    });

    // edit blockip function
    $('.table_blockip_body').on('click', '.btn_blockip_edit', function (e)
    {
        blockip_action = 'edit';

        blockip_id = $(this).prop('id').substring(5);
        var ip_addr = $('#ipaddr_' + blockip_id).html();
        var ip_desc = $('#ipdesc_' + blockip_id).html();

        $('.ip_address').val(ip_addr);
        $('.ip_description').val(ip_desc);
    });

    // delete blockip function
    $('.table_blockip_body').on('click', '.btn_blockip_delete', function (e)
    {
        blockip_id = $(this).prop('id').substring(5);
    });

    $('.modal_btn_blockip_delete').click(function ()
    {
        $('#blockip_delete_modal').modal('toggle');
        ajaxBlockIPDelete();
    });

    function ajaxAccountList() 
    {
        if (account_waiting) return;

        show_waiting('account', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_account_list.php',
            data : { },
            success:function(response)
            {
                show_waiting('account', false);

                if (response == 'error')
                {
                    show_alert('account', 'Cannot load account list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
					var account_count = obj.length;
                    var html = '';                  
                    
                    if (account_count > 0)
                    {
                        for (var i = 0; i < account_count; i ++)
                        {
                            html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td id="name_' + obj[i][0] + '">' + obj[i][1] + '</td>';
                            html += '<td id="pass_' + obj[i][0] + '">' + obj[i][2] + '</td>';
                            html += '<td id="disp_' + obj[i][0] + '">' + obj[i][3] + '</td>';
                            html += '<td id="role_' + obj[i][0] + '">' + obj[i][4] + '</td>';
                            if (obj[i][5] == '1')
                            	html += '<td id="state_' + obj[i][0] + '">Enable</td><td>';
                            else
                            	html += '<td id="state_' + obj[i][0] + '">Disable</td><td>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_account_edit" id="' + obj[i][0] + '" data-toggle="modal" data-target="#account_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_permission_edit" id="' + obj[i][0] + '" data-toggle="modal" data-target="#permission_edit_modal"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>&nbsp;Permission</button>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_account_delete" id="' + obj[i][0] + '" data-toggle="modal" data-target="#account_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html += '</td></tr>';   
                        }
                    } else {
                    	show_alert('account', 'There is no any account data.');
                    }

                    $('.table_account_body').html(html);
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

    function ajaxAccountAdd()
    {
    	show_waiting('account', true);

        var role = '';
        var state = 1;

        if ($('.add_role').prop('checked'))
        	role = 'admin';
        if ($('.add_state').prop('checked'))
        	state = 0;

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_account_add.php',
            data : {
                'user_name' : $('.add_user_name').val(), 
                'password' : $('.add_password').val(), 
                'display_name' : $('.add_display_name').val(), 
                'role' : role, 
                'state' : state
            },
            success:function(response)
            {                
                show_waiting('account', false);                

                if (response == 'success')
                    ajaxAccountList();
                else
                    show_alert('account', 'Account cannot be added.');
            },
            failure:function(response) 
            {
                show_waiting('account', false);                
                show_alert('account', 'Account cannot be added.');
            }
        });
    }

    function ajaxAccountEdit()
    {
        show_waiting('account', true);

        var role = '';
        var state = 1;

        if ($('.edit_role').prop('checked'))
        	role = 'admin';
        if ($('.edit_state').prop('checked'))
        	state = 0;

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_account_edit.php',
            data : {
                'account_id' : account_id, 
                'user_name' : $('.edit_user_name').val(), 
                'password' : $('.edit_password').val(), 
                'display_name' : $('.edit_display_name').val(), 
                'role' : role, 
                'state' : state
            },
            success:function(response)
            {
                show_waiting('account', false);                
                if (response == 'success')
                    ajaxAccountList();
                else
                    show_alert('account', 'Account cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting('account', false);
                show_alert('account', 'Account cannot be changed.');
            }
        });
    }

    function ajaxAccountDelete()
    {
        show_waiting('account', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_account_delete.php',
            data : {'account_id' : account_id},
            success:function(response)
            {                
                show_waiting('account', false);                
                if (response == 'success')
                    ajaxAccountList();
                else
                    show_alert('account', 'Account cannot be deleted.');
            },
            failure:function(response) 
            {             
                show_waiting('account', false);
                show_alert('account', 'Account cannot be deleted.');
            }
        });
    }

    function ajaxAccountPermissionList() 
    {
        if (account_waiting) return;

        show_waiting('account', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_permission_list.php',
            data : { 'account_id' : account_id },
            success:function(response)
            {
                show_waiting('account', false);

                if (response == 'error')
                {
                    show_alert('account', 'Cannot load account permission list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
                    var count = obj[2].length;
                    var html = '';                  
                    
                    if (count > 0)
                    {
                        for (var i = 0; i < count; i ++)
                        {
                            var prm = (obj[2][i][2] == '1') ? 'checked' : '';

                            html += '<tr>';
                            html += '<td>' + (i + 1) + '</td>';
                            html += '<td>' + obj[2][i][1] + '</td>';
                            html += '<td><input id="permission_' + obj[2][i][0] + '" type="checkbox" class="permission_item" style="margin:0;padding:0" ' + prm + '></input></td>';
                            html += '</tr>';
                        }
                        
                        $('.table_permission_body').html(html);
                    }
                }
            },
            failure:function(response) 
            {
                show_waiting('account', false);
                show_alert('account', 'Cannot load account permission list.');

                return;
            }
        });
    }

    function ajaxAccountPermissionEdit(permissions)
    {
        show_waiting('account', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_permission_edit.php',
            data : {
                'account_id' : account_id, 
                'permissions' : permissions
            },
            success:function(response)
            {
                show_waiting('account', false);  

                if (response == 'error')
                {
                    show_alert('account', 'CRM permission cannot be changed.');
                    return;
                }
            },
            failure:function(response) 
            {
                show_waiting('account', false);
                show_alert('account', 'CRM permission cannot be changed.');
            }
        });
    }

    function ajaxBlockIPList() 
    {
        show_waiting('blockip', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_blockip_list.php',
            data : { },
            success:function(response)
            {
                show_waiting('blockip', false);

                if (response == 'error')
                {
                    show_alert('account', 'Cannot load block IP list.');
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
                            html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td id="ipaddr_' + obj[i][0] + '">' + obj[i][1] + '</td>';
                            html += '<td id="ipdesc_' + obj[i][0] + '">' + obj[i][2] + '</td><td>';
                            html += '<button type="button" class="btn btn-link btn-sm btn_blockip_edit" id="ipid_' + obj[i][0] + '" data-toggle="modal" data-target="#block_ip_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html += '<button type="button" class="btn btn-link btn-sm btn_blockip_delete" id="ipid_' + obj[i][0] + '" data-toggle="modal" data-target="#blockip_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button>';
                            html += '</td></tr>';   
                        }
                    }

                    $('.table_blockip_body').html(html);
                }
            },
            failure:function(response) 
            {
                show_waiting('blockip', false);
                show_alert('blockip', 'Cannot load block IP list.');

                return;
            }
        });
    }

    function ajaxBlockIPAdd()
    {
        show_waiting('blockip', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_blockip_add.php',
            data : {
                'block_ip' : $('.ip_address').val(), 
                'description' : $('.ip_description').val()
            },
            success:function(response)
            {                
                show_waiting('blockip', false);                

                if (response == 'success')
                    ajaxBlockIPList();
                else
                    show_alert('blockip', 'Block IP cannot be added.');
            },
            failure:function(response) 
            {
                show_waiting('blockip', false);                
                show_alert('blockip', 'Block IP cannot be added.');
            }
        });
    }

    function ajaxBlockIPEdit()
    {
        show_waiting('blockip', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_blockip_edit.php',
            data : {
                'ip_id' : blockip_id, 
                'block_ip' : $('.ip_address').val(), 
                'description' : $('.ip_description').val()
            },
            success:function(response)
            {
                show_waiting('blockip', false);                
                if (response == 'success')
                    ajaxBlockIPList();
                else
                    show_alert('blockip', 'Block IP cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting('blockip', false);
                show_alert('blockip', 'Block IP cannot be changed.');
            }
        });
    }

    function ajaxBlockIPDelete()
    {
        show_waiting('blockip', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_blockip_delete.php',
            data : { 
                'ip_id' : blockip_id 
            },
            success:function(response)
            {
                show_waiting('blockip', false);                
                if (response == 'success')
                    ajaxBlockIPList();
                else
                    show_alert('blockip', 'Block IP cannot be deleted.');
            },
            failure:function(response) 
            {             
                show_waiting('blockip', false);
                show_alert('blockip', 'Block IP cannot be deleted.');
            }
        });
    }
});