<div class="modal fade" id="level_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Alert Level Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid modal_level_body">                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_level_edit">Apply Levels</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="type_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Alert Schedule Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning alert_edit_time" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-2 modal_input_label">Day</div>
                        <div class="col-md-10" style="height:30px;">
                            <input id="day_Sun" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;">&nbsp;Sun</input>
                            <input id="day_Mon" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:9px;">&nbsp;Mon</input>
                            <input id="day_Tue" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:9px;">&nbsp;Tue</input>
                            <input id="day_Wed" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;Wed</input>
                            <input id="day_Thu" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;Thu</input>
                            <input id="day_Fri" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;Fri</input>
                            <input id="day_Sat" type="checkbox" class="input-sm edit_day" style="vertical-align:middle;margin:0;padding:0;margin-left:9px;">&nbsp;Sat</input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 modal_input_label">Hour</div>
                        <div class="col-md-10" style="height:30px;">
                            <input id="hour_0" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;">&nbsp;0</input>
                            <input id="hour_1" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;1</input>
                            <input id="hour_2" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;2</input>
                            <input id="hour_3" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;3</input>
                            <input id="hour_4" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;4</input>
                            <input id="hour_5" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;5</input>
                            <input id="hour_6" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;6</input>
                            <input id="hour_7" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;7</input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-offset-2 col-md-10" style="height:30px;">
                            <input id="hour_8" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;">&nbsp;8</input>
                            <input id="hour_9" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;9</input>
                            <input id="hour_10" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:18px;">&nbsp;10</input>
                            <input id="hour_11" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;11</input>
                            <input id="hour_12" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;12</input>
                            <input id="hour_13" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;13</input>
                            <input id="hour_14" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;14</input>
                            <input id="hour_15" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;15</input>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-offset-2 col-md-10" style="height:30px;">
                            <input id="hour_16" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;">&nbsp;16</input>
                            <input id="hour_17" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;17</input>
                            <input id="hour_18" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;18</input>
                            <input id="hour_19" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;19</input>
                            <input id="hour_20" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;20</input>
                            <input id="hour_21" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;21</input>
                            <input id="hour_22" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;22</input>
                            <input id="hour_23" type="checkbox" class="input-sm edit_hour" style="vertical-align:middle;margin:0;padding:0;margin-left:10px;">&nbsp;23</input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 modal_input_label">Receiver</div>
                        <div class="col-md-10" style="height:30px;">
                            <input id="receiver_0" type="checkbox" class="input-sm edit_receiver" style="vertical-align:middle;margin:0;padding:0;">&nbsp;SMS</input>
                            <input id="receiver_1" type="checkbox" class="input-sm edit_receiver" style="vertical-align:middle;margin:0;padding:0;margin-left:43px;">&nbsp;Email</input>
                            <input id="receiver_2" type="checkbox" class="input-sm edit_receiver" style="vertical-align:middle;margin:0;padding:0;margin-left:38px;">&nbsp;Telegram Bot</input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_type_edit">Apply Schedule</button>
            </div>
        </div>
    </div>
</div>
<!--
<div class="modal fade" id="receiver_add_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Alert Receiver Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning receiver_add_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label add_receiver_label">Receiver Name</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm add_receiver_name"></div>
                    </div>
                    <div id="telegram_add_chatid" class="row" style="margin-bottom:5px;display:none">
                        <div class="col-md-3 modal_input_label add_chatid_label">Chat ID</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm add_receiver_chatid"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 col-md-offset-3" style="height:30px;"><input type="checkbox" class="input-sm add_receiver_state" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Disable Alert Receiver</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_receiver_add">Add Receiver</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="receiver_edit_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Alert Receiver Dialog</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-warning receiver_edit_alert" role="alert" style="display:none"></div>
                    <div class="row" style="margin-bottom:5px;">
                        <div class="col-md-3 modal_input_label edit_receiver_label">Receiver Name</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm edit_receiver_name"></div>
                    </div>
                    <div id="telegram_edit_chatid" class="row" style="margin-bottom:5px;display:none">
                        <div class="col-md-3 modal_input_label edit_chatid_label">Chat ID</div>
                        <div class="col-md-9"><input type="text" class="form-control input-sm edit_receiver_chatid"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 col-md-offset-3" style="height:30px;"><input type="checkbox" class="input-sm edit_receiver_state" style="vertical-align:middle;margin:0;padding:0;">&nbsp;&nbsp;Disable Alert Receiver</input></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_receiver_edit">Edit Receiver</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="receiver_delete_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Message</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    Do you want to delete this alert receiver?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success modal_btn_receiver_delete">Delete</button>
            </div>
        </div>
    </div>
</div>
-->