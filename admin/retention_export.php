<?php

include '../daemon/api/DBApi.php';
include '../daemon/api/LLCrmApi.php';
// check client ip
$dbApi = DBApi::getInstance();
if(!$dbApi->checkClientIp())
{
    header("Location: blockip_alert.php");
    return;
}
session_start();

if (!isset($_SESSION['user']) || $_SESSION['user'] == '')
    header("Location: ../login.php");

$user_name = $_SESSION['user'];
$tab_name = "Export Retention";

?>


<!DOCTYPE html>
<html>
    <?php include('common/crm_header.php'); ?>
<body>
    <?php include('retention_export_modal.php'); ?>
    <?php include('common/crm_body_up.php'); ?>
    <div class="row">
        <div class="col-md-12">
            <div class="row tab_row_default">
                <div class="col-lg-10"><span class="glyphicon glyphicon-tasks" aria-hidden="true" style="width:25px;color:#fff"></span> Retention Report</div>
                <div class="col-lg-2 retention_waiting" style="text-align:right"><p></p></div>
            </div>
            <div class="alert alert-warning retention_alert" role="alert" style="display:none"></div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="input-daterange input-group" id="datepicker">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-default btn-sm dropdown-toggle date_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:150px">
                                Week To Date <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu date_dropdown_menu" role="menu">
                                <li><a href="#" id="date_today">Today</a></li>
                                <li><a href="#" id="date_yesterday">Yesterday</a></li>
                                <li><a href="#" id="date_thisweek">Week To Date</a></li>
                                <li><a href="#" id="date_thismonth">Month To Date</a></li>
                                <li><a href="#" id="date_thisyear">Year To Date</a></li>
                                <li><a href="#" id="date_lastweek">Last Week</a></li>
                                <li><a href="#" id="date_custom">Custom</a></li>
                            </ul>
                        </span>
                        <span class="input-group-addon" style="font-size:12px;background:#f9f9f9">From</span>
                        <input id="from_date" type="text" class="input-sm form-control" name="start"/>
                        <span class="input-group-addon" style="font-size:12px;background:#f9f9f9">To</span>
                        <input id="to_date" type="text" class="input-sm form-control" name="end"/>
                        <span class="input-group-addon" style="font-size:12px;background:#f9f9f9">Subscription Cycles</span>
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-default btn-sm dropdown-toggle cycle_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:50px">
                                1 <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu cycle_dropdown_menu" role="menu">
                                <li><a href="#" id="cycle_1">1</a></li>
                                <li><a href="#" id="cycle_2">2</a></li>
                            </ul>
                        </span>
                        <span class="input-group-btn">
                            <button class="btn btn-default btn-sm retention_search_button" type="button" style="width:100px">Search</button>
                        </span>    
                    </div>
                </div>
                <div class="col-lg-3" style="text-align:right">
                    <button class="btn btn-info btn-sm btn_export" type="button" style="width:120px;border-color:#05948b;background:#05948b">Export To Excel</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-9 export_content">
                </div>
                <nav class="col-xs-2 col-xs-offset-1 bs-docs-sidebar">
                    <ul id="sidebar" class="nav nav-stacked crm_sidebar" style="display:none">
                        <li style="height:50px;">
                            <a href="#Top">Back to top</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>              
    </div>
    <?php include('common/crm_body_down.php'); ?>
</body>
</html>
