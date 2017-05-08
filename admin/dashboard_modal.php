<div class="modal fade" id="alert_delete_all_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Message</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    Do you want to delete all of the alerts?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_alert_delete_all">Delete All</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="setting_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CRM Settings Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning setting_edit_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label"><label>CRM Management</label></div>                        
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">CRM Name</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_crm_name"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">CRM Site URL</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_crm_url"></div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">CRM User Name</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_crm_username"></div>
                    </div>
                    <!--
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">CRM Password</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_crm_password"></div>
                    </div>
                    -->
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">API User Name</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_api_username"></div>
                    </div>
                    <!--
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-6 modal_input_label">API Password</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_api_password"></div>
                    </div>
                    -->
                    <div class="row">
                        <div class="col-md-6 modal_input_label">Sales Goal</div>
                        <div class="col-md-6"><input type="text" class="form-control input-sm edit_sales_goal"></div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-6 col-md-offset-6" style="height:30px;"><input type="checkbox" class="input-sm edit_crm_paused" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Pause CRM</input></div>
                    </div>                    
                </div>
                <div class="row" style="width:100%;height:1px;background:#dadada;margin:10px 0 10px 0"></div>
                <div class="container-fluid modal_setting_alert_body">                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_setting_edit">Apply Settings</button>
            </div>
        </div>
    </div>
</div>