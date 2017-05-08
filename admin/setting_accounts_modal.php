<div class="modal fade" id="account_add_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Account Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning account_add_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_user_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Re Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_repassword"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Display Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_display_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">SMS Number</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_sms_number"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Email Address</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_email_address"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Telegram Bot (Chat ID)</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_telegram_bot"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 modal_input_label">User Role</div>
                        <div class="col-md-8">
                            <select name="authority" class="input-sm form-control add_role">
                                <option value="0">Regular User</option>
                                <option value="1">Super User</option>
                                <option value="9">Administrator</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-8 col-md-offset-4" style="height:30px;"><input type="checkbox" class="input-sm add_state" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Disable Account</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_account_add">Add Account</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="account_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Account Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning account_edit_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_user_name" disabled="disabled"></div>
                    </div>
                    <!--
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label">Password</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm edit_password"></div>
                    </div>
                    -->
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Display Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_display_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">SMS Number</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_sms_number"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Email Address</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_email_address"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Telegram Bot (Chat ID)</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_telegram_bot"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 modal_input_label">User Role</div>
                        <div class="col-md-8">
                            <select name="authority" class="input-sm form-control edit_role" <?php if (isset($_SESSION['role']) && $_SESSION['role'] != '9') echo 'disabled="disabled"'; ?>>
                                <option value="0">Regular User</option>
                                <option value="1">Super User</option>
                                <option value="9">Administrator</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-8 col-md-offset-4" style="height:30px;"><input type="checkbox" class="input-sm edit_state" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Disable Account</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_account_edit">Apply Account</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="account_password_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Account Password Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning account_password_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label">New Password</div>
                        <div class="col-md-9"><input type="password" class="form-control input-sm edit_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label">Re Password</div>
                        <div class="col-md-9"><input type="password" class="form-control input-sm edit_repassword"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_account_password">Apply Password</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="account_delete_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Message</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    Do you want to delete this account?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_account_delete">Delete</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="permission_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CRM Permission Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CRM Name</th>
                                <th><input id="permission_all" type="checkbox" style="margin:0;padding:0"></input></th>
                            </tr>
                        </thead>
                        <tbody class="table_permission_body">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_permission_edit">Apply Permission</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="block_ip_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Block IP Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning block_ip_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label">IP Address</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm ip_address"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label">Description</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm ip_description"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_blockip_apply">Apply Block IP</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="blockip_delete_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Message</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    Do you want to delete this IP address in Block List?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_blockip_delete">Delete</button>
            </div>
        </div>
    </div>
</div>