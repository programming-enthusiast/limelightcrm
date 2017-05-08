jQuery( document ).ready(function( $ ) 
{
	var crm_id = -1;
    var page_number = 1;
    var page_count = 10;
    var show_pages = 7;
    var all_items = 0;
    var campaign_waiting = false;

    var label_id = -1;
    var label_waiting = false;

    var checkedCIDs = '';
    var checkedLIDs = '';


    //var spinner = '<p><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></p>';
    var spinner = '<img src="../images/loading.gif" style="width:22px;height:22;">';

	
	init();


	function init()
	{
		getInitialCrmID();

        ajaxCampaignSearch();
        ajaxCampaignLabelList();
	}

    function getInitialCrmID()
    {
        if ($('.crm_dropdown_list').length > 0)
            crm_id = $('.crm_dropdown_list').prop('id');
    }

    function show_alert(type, msg) 
    {
        if (type == 'campaign')
        {
            $('.setting_campaign_alert').html(msg);
            $('.setting_campaign_alert').fadeIn(1000, function () {
                $('.setting_campaign_alert').fadeOut(3000);
            });
        }
        else if (type == 'label')
        {
            $('.setting_label_alert').html(msg);
            $('.setting_label_alert').fadeIn(1000, function () {
                $('.setting_label_alert').fadeOut(3000);
            });
        }
        else if (type == 'label_add')
        {
            $('.label_add_alert').html(msg);
            $('.label_add_alert').fadeIn(1000, function () {
                $('.label_add_alert').fadeOut(3000);
            });
        }
        else if (type == 'label_edit')
        {
            $('.label_edit_alert').html(msg);
            $('.label_edit_alert').fadeIn(1000, function () {
                $('.label_edit_alert').fadeOut(3000);
            });
        }
        else if (type == 'action_edit')
        {
            $('.action_edit_alert').html(msg);
            $('.action_edit_alert').fadeIn(1000, function () {
                $('.action_edit_alert').fadeOut(3000);
            });
        }
    }

    function show_waiting(type, show)
    {
        if (type == 'campaign')
        {
            campaign_waiting = show;

            if (campaign_waiting)
                $('.setting_campaign_waiting').html(spinner);
            else
                $('.setting_campaign_waiting').html('');
        }
        else if (type == 'label')
        {
            label_waiting = show;

            if (label_waiting)
                $('.setting_label_waiting').html(spinner);
            else
                $('.setting_label_waiting').html('');
        }
    }

    $('.campagin_select_all').click(function ()
    {
        $('.campaign_item').each( function(i) 
        {
            if ($('.campagin_select_all').prop('checked'))
                $(this).prop('checked', true);
            else
                $(this).prop('checked', false);
        });
    });
    
    $('.crm_dropdown_menu li').on("click", function (e) 
    {
        var crm_text = $(this).text();
        crm_id = $(this).find('a').attr('id');

        $('.crm_toggle_button').html(crm_text + " <span class=\"caret\"></span>");
    });

    // campaign action : edit & delete label
    $('.campaign_action_dropdown_menu li').on("click", function (e) 
    {
        var action_id = $(this).find('a').attr('id');
        checkedCIDs = getCheckedCampaignIDs();

        if (checkedCIDs == '')
        {
            show_alert('campaign', 'Please select campaign items.');
            return;
        }

        if (action_id == 'action_edit')
        {
            ajaxCampaignLabelList4Modal();
        }
        else if (action_id == 'action_delete')
        {
            $('#campaign_action_delete_modal').modal('toggle');
        }
    });

    $('.modal_btn_action_edit').click(function ()
    {
        checkedLIDs = '';

        $('.modal_label_item').each( function(i) 
        {
            if ($(this).prop('checked'))
            {
                if (checkedLIDs != '') checkedLIDs += ',';
                checkedLIDs += $(this).prop('id').substring(7);
            }
        });

        if (checkedLIDs == '')
        {
            show_alert('action_edit', 'Please select label item.');
            return;
        }

        $('#campaign_action_edit_modal').modal('toggle');

        ajaxCampaignActionEdit();
    });

    $('.modal_btn_action_delete').click(function ()
    {
        $('#campaign_action_delete_modal').modal('toggle');
        ajaxCampaignActionDelete();
    });

    $('.count_dropdown_menu li').on("click", function (e) 
    {
        page_count = $(this).text();
        $('.count_toggle_button').html(page_count + " <span class=\"caret\"></span>");

        page_number = 1;
        ajaxCampaignSearch();
    });

    $('.campaign_search_button').click(function ()
    {
        page_number = 1;
        ajaxCampaignSearch();
    });

    $('.campaign_pagination').on('click', '.campaign_page', function (e)
    {
        var cid = $(this).prop('id').substring(5);
        var board_index = Math.floor((page_number - 1) / show_pages);

        if (cid == 'first')
        {
            page_number = 1;
        }
        else if (cid == 'prev')
        {
            page_number = (board_index - 1) * show_pages + 1;
        }
        else if (cid == 'next')
        {
            page_number = (board_index + 1) * show_pages + 1;
        }
        else if (cid == 'last')
        {
            page_number = Math.floor(all_items / page_count);
            if (all_items % page_count > 0)
                page_number ++;
        }
        else
        {
            page_number = cid;
        }

        ajaxCampaignSearch();
    });

    // add label function
    $('.btn_label_add').click(function ()
    {
        $('.add_label_name').val('');
    });

    $('.modal_btn_label_add').click(function ()
    {
        if ($('.add_label_name').val() == '')
        {
            show_alert('label_add', 'Please input Label Name.');
            $('.add_label_name').focus();
            return;
        }

        $('#campaign_label_add_modal').modal('toggle');
        ajaxCampaignLabelAdd();
    });

    // edit label function
    $('.table_label_body').on('click', '.setting_label_edit', function (e)
    {
        label_id = $(this).prop('id').substring(6);
        $('.edit_label_name').val($('#lname_' + label_id).text());
    });

    $('.modal_btn_label_edit').click(function ()
    {
        if ($('.edit_label_name').val() == '')
        {
            show_alert('label_edit', 'Please input Label Name.');
            $('.edit_label_name').focus();
            return;
        }

        $('#campaign_label_edit_modal').modal('toggle');
        ajaxCampaignLabelEdit();
    });

    // delete label function
    $('.table_label_body').on('click', '.setting_label_delete', function (e)
    {
        label_id = $(this).prop('id').substring(8);
    });

    $('.modal_btn_label_delete').click(function ()
    {
        $('#campaign_label_delete_modal').modal('toggle');
        ajaxCampaignLabelDelete();
    });


    function ajaxCampaignSearch() 
    {
        if (campaign_waiting || crm_id == -1) return;

        show_waiting('campaign', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_list.php',
            data : {
                'crm_id' : crm_id, 
                'campaign_ids' : $('.search_campaign_ids').val(), 
                'page_number' : page_number, 
                'items_page' : page_count
            },
            success:function(response)
            {
                show_waiting('campaign', false);

                if (response == 'error')
                {
                    show_alert('campaign', 'Cannot load campaign list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
                    var html = '';

                    all_items = obj.length;
                    var real_items = obj.ids.length;
                    
                    if (real_items > 0)
                    {
                        for (var i = 0; i < real_items; i ++)
                        {
                            html += '<tr><td><input type="checkbox" id="campaign_' + obj.ids[i] + '" class="campaign_item"></td>';
                            html += '<td>' + obj.ids[i] + '</td>';
                            html += '<td>' + obj.names[i] + '</td>';
                            html += '<td>' + obj.labels[i] + '</td></tr>';   
                        }
                    } else {
                        show_alert('campaign', 'There is no any campaign data.');
                    }

                    $('.table_campaign_body').html(html);
                    $('.campagin_select_all').prop('checked', false);

                    generatePagination();
                }
            },
            failure:function(response) 
            {
                show_waiting('campaign', false);
                show_alert('campaign', 'Cannot load campaign list.');

                return;
            }
        });
    }

    function generatePagination()
    {
        var htmlFront = '<button type="button" class="btn btn-default btn-sm campaign_page" id="page_first">&lt;&lt;</button><button type="button" class="btn btn-default btn-sm campaign_page" id="page_prev">&lt;</button>';
        var htmlBack = '<button type="button" class="btn btn-default btn-sm campaign_page" id="page_next">&gt;</button><button type="button" class="btn btn-default btn-sm campaign_page" id="page_last">&gt;&gt;</button>';
        var htmlPage = '';
        var html = '';

        if (all_items > 0)
        {
            var board_index = Math.floor((page_number - 1) / show_pages);

            var first_number = board_index * show_pages + 1;
            var last_number = (board_index + 1) * show_pages;

            if (last_number * page_count > all_items)
            {
                last_number = Math.floor(all_items / page_count);
                if (all_items % page_count > 0)
                    last_number ++;
            }

            for (var i = first_number; i <= last_number; i ++)
            {
                if (i == page_number)
                    htmlPage += '<button type="button" class="btn btn-success btn-sm campaign_page" id="page_' + i + '">' + i + '</button>';
                else
                    htmlPage += '<button type="button" class="btn btn-default btn-sm campaign_page" id="page_' + i + '">' + i + '</button>';
            }

            if (board_index > 0)
                html += htmlFront;
            html += htmlPage;
            if (last_number * page_count < all_items)
                html += htmlBack;
        }

        $('.campaign_pagination').html(html);
    }

    function ajaxCampaignLabelList() 
    {
        if (label_waiting) return;

        show_waiting('label', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_list.php',
            data : {},
            success:function(response)
            {
                show_waiting('label', false);

                if (response == 'error')
                {
                    show_alert('label', 'Cannot load label list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
                    var html = '';

                    all_items = obj.length;
                    
                    if (all_items > 0)
                    {
                        for (var i = 0; i < all_items; i ++)
                        {
                            html += '<tr><td>' + (i + 1) + '</td>';
                            html += '<td id="lname_' + obj[i][0] + '">' + obj[i][1] + '</td>';
                            html += '<td><button type="button" class="btn btn-link btn-sm setting_label_edit" id="ledit_' + obj[i][0] + '" data-toggle="modal" data-target="#campaign_label_edit_modal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</button>';
                            html += '<button type="button" class="btn btn-link btn-sm setting_label_delete" id="ldelete_' + obj[i][0] + '" data-toggle="modal" data-target="#campaign_label_delete_modal"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="color: #ffa5a5"></span>&nbsp;Delete</button></td></tr>';   
                        }
                    } 
                    else 
                    {
                        show_alert('label', 'There is no any label list.');
                    }

                    $('.table_label_body').html(html);
                }
            },
            failure:function(response) 
            {
                show_waiting('label', false);
                show_alert('label', 'Cannot load label list.');

                return;
            }
        });
    }

    function ajaxCampaignLabelList4Modal() 
    {
        if (campaign_waiting) return;

        show_waiting('campaign', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_list.php',
            data : {},
            success:function(response)
            {
                show_waiting('campaign', false);

                if (response == 'error')
                {
                    show_alert('campaign', 'Cannot load label list.');
                    return;
                }
                else
                {
                    var obj = jQuery.parseJSON(response);
                    var html = '';

                    all_items = obj.length;
                    
                    if (all_items > 0)
                    {
                        for (var i = 0; i < all_items; i ++)
                        {
                            html += '<tr><td><input type="checkbox" id="mlabel_' + obj[i][0] + '" class="modal_label_item"></td>';
                            html += '<td>' + obj[i][0] + '</td>';
                            html += '<td>' + obj[i][1] + '</td></tr>';   
                        }

                        $('.modal_label_body').html(html);
                        $('#campaign_action_edit_modal').modal('toggle');
                    } 
                    else 
                    {
                        show_alert('campaign', 'There is no any label list.');
                    }
                }
            },
            failure:function(response) 
            {
                show_waiting('campaign', false);
                show_alert('campaign', 'Cannot load label list.');

                return;
            }
        });
    }

    function ajaxCampaignLabelAdd() 
    {
        show_waiting('label', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_add.php',
            data : {'label_name' : $('.add_label_name').val()},
            success:function(response)
            {
                show_waiting('label', false);

                if (response == 'success')
                    ajaxCampaignLabelList();
                else
                    show_alert('label', 'Campaign label cannot be added.');
            },
            failure:function(response) 
            {
                show_waiting('label', false);
                show_alert('label', 'Campaign label cannot be added.');
            }
        });    
    }

    function ajaxCampaignLabelEdit()
    {
        show_waiting('label', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_edit.php',
            data : {
                'label_id' : label_id, 
                'label_name' : $('.edit_label_name').val()},
            success:function(response)
            {                
                show_waiting('label', false);

                if (response == 'success')
                    ajaxCampaignLabelList();
                else
                    show_alert('label', 'Campaign label cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting('label', false);
                show_alert('label', 'Campaign label cannot be changed.');
            }
        });
    }

    function ajaxCampaignLabelDelete()
    {
        show_waiting('label', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_label_delete.php',
            data : {'label_id' : label_id},
            success:function(response)
            {                
                show_waiting('label', false);

                if (response == 'success')
                    ajaxCampaignLabelList();
                else
                    show_alert('label', 'Campaign label cannot be deleted.');
            },
            failure:function(response) 
            {
                show_waiting('label', false);
                show_alert('label', 'Campaign label cannot be deleted.');
            }
        });
    }

    function getCheckedCampaignIDs()
    {
        var cIDs = '';

        $('.campaign_item').each( function(i) 
        {
            if ($(this).prop('checked'))
            {
                if (cIDs != '') cIDs += ',';
                cIDs += $(this).prop('id').substring(9);
            }
        });

        return cIDs;
    }

    function ajaxCampaignActionEdit()
    {
        show_waiting('campaign', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_action_edit.php',
            data : {
                'crm_id' : crm_id,
                'campaign_ids' : checkedCIDs, 
                'label_dis' : checkedLIDs
            },
            success:function(response)
            {                
                show_waiting('campaign', false);

                if (response == 'success')
                    ajaxCampaignSearch();
                else
                    show_alert('campaign', 'Campaign label cannot be changed.');
            },
            failure:function(response) 
            {
                show_waiting('campaign', false);
                show_alert('campaign', 'Campaign label cannot be changed.');
            }
        });
    }

    function ajaxCampaignActionDelete()
    {
        show_waiting('campaign', true);

        $.ajax(
        {
            type : 'GET',
            url : '../daemon/ajax/setting_campaign_action_delete.php',
            data : {
                'crm_id' : crm_id,
                'campaign_ids' : checkedCIDs
            },
            success:function(response)
            {                
                show_waiting('campaign', false);

                if (response == 'success')
                    ajaxCampaignSearch();
                else
                    show_alert('campaign', 'Campaign label cannot be deleted.');
            },
            failure:function(response) 
            {
                show_waiting('campaign', false);
                show_alert('campaign', 'Campaign label cannot be deleted.');
            }
        });
    }

});