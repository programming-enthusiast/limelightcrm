<?php
require_once '../daemon/api/DBApi.php';
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
$tab_name = "Dashboard";

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('dashboard_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
 	<div class="row">
 		<div class="col-md-9">
 			<div class="row tab_row_default">
 				<div class="col-lg-12"><span class="glyphicon glyphicon-asterisk" aria-hidden="true" style="width:25px;color:#fff"></span> Overall Sales</div>
 			</div>
 			<table class="table table-striped table-hover" style="margin-top:10px;margin-bottom:30px;">
				<thead>
					<tr>
						<th>STEP 1</th>
						<th>STEP 2</th>
						<th>TAKE RATE</th>
						<th>TABLET</th>
						<th>TABLET %</th>
						<th>ORDER PAGE %</th>
            	        <th>GOAL %</th>
                	    <th>GOAL</th>
					</tr>
				</thead>
				<tbody class="table_dashboard_overall_body">
					<tr>
						<td id="all1">0</td>
						<td id="all2">0</td>
						<td id="all3">0</td>
						<td id="all4">0</td>
						<td id="all5">0</td>
						<td id="all6">0</td>
						<td id="all7">0</td>
						<td id="all8">0</td>
					</tr>
				</tbody>
			</table>
			<div class="row tab_row_default">
				<div class="col-lg-10"><span class="glyphicon glyphicon-tasks" aria-hidden="true" style="width:25px;color:#fff"></span> Sales Report</div>
				<div class="col-lg-2 dashboard_sales_waiting" style="text-align:right"></div>
			</div>
			<div class="alert alert-warning dashboard_sales_alert" role="alert" style="display:none"></div>
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
						<span class="input-group-btn">
							<button class="btn btn-default btn-sm sales_search_button" type="button" style="width:100px">Search</button>
						</span>    
					</div>
				</div>
			</div>
			<table class="table table-striped table-hover" style="margin-top:10px;">
				<thead>
					<tr>
						<th>#</th>
						<th>CRM</th>
						<th>STEP 1</th>
						<th>STEP 2</th>
						<th>TAKE RATE</th>
						<th>TABLET</th>
						<th>TABLET %</th>
						<th>ORDER PAGE %</th>
            	        <th>GOAL %</th>
                	    <th>GOAL</th>
                	    <th>SETTINGS</th>
                    	<th><button type="button" class="btn btn-link btn-sm btn_refresh_all" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></th>
					</tr>
				</thead>
				<tbody class="table_dashboard_sales_body">
				</tbody>
			</table>
 		</div>
		<div class="col-md-3">
			<div class="row tab_row_alert">
				<div class="col-lg-6"><span class="glyphicon glyphicon-alert" aria-hidden="true" style="width:25px;color:#fff"></span> Alerts</div>
				<div class="col-lg-6" style="text-align:right;padding-right:0">
					<button type="button" class="btn btn-link btn-sm btn_alert_delete_all" id=""><span class="glyphicon glyphicon-remove-sign" aria-hidden="true" style="color: #ffa5a5"></span></button>
				</div>
			</div>
			<div class="dashboard_alert_body" style="background:#f9f2f4;overflow-y:auto;border: 1px solid #ebccd1;margin-bottom:10px">
			</div>
		</div>
 	</div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
