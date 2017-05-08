<div class="modal fade" id="crm_add_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CRM Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning crm_add_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_crm_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Site URL</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_crm_url"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_crm_username"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_crm_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Re CRM Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_crm_repassword"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">API User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_api_username"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">API Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_api_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Re API Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm add_api_repassword"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 modal_input_label">Sales Goal</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm add_sales_goal"></div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-8 col-md-offset-4" style="height:30px;"><input type="checkbox" class="input-sm add_crm_paused" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Pause CRM</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_crm_add">Add CRM</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="crm_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CRM Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning crm_edit_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_crm_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Site URL</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_crm_url"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_crm_username"></div>
                    </div>
                    <!--
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">CRM Password</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_crm_password"></div>
                    </div>
                    -->
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">API User Name</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_api_username"></div>
                    </div>
                    <!--
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">API Password</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_api_password"></div>
                    </div>
                    -->
                    <div class="row">
                        <div class="col-md-4 modal_input_label">Sales Goal</div>
                        <div class="col-md-8"><input type="text" class="form-control input-sm edit_sales_goal"></div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-8 col-md-offset-4" style="height:30px;"><input type="checkbox" class="input-sm edit_crm_paused" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Pause CRM</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_crm_edit">Edit CRM</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="crm_password_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CRM Password Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning crm_password_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">New CRM Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm edit_crm_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Re CRM Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm edit_crm_repassword"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_crm_password">Apply CRM Password</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="api_password_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">API Password Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning api_password_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">New API Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm edit_api_password"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-4 modal_input_label">Re API Password</div>
                        <div class="col-md-8"><input type="password" class="form-control input-sm edit_api_repassword"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_api_password">Apply API Password</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="crm_delete_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Message</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    Do you want to delete this CRM?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_crm_delete">Delete</button>
            </div>
        </div>
    </div>
</div>
