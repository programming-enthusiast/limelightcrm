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
$tab_name = "Affiliate";

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('common/crm_body_up.php'); ?>
 	<div class="row">
 		<div class="col-md-12">
			<div class="row tab_row_default">
				<div class="col-lg-10"><span class="glyphicon glyphicon-tasks" aria-hidden="true" style="width:25px;color:#fff"></span> Affiliate Report</div>
				<div class="col-lg-2 dashboard_affiliate_waiting" style="text-align:right"></div>
			</div>
			<div class="alert alert-warning dashboard_affiliate_alert" role="alert" style="display:none"></div>
			<div class="row">
				<div class="col-lg-5">
					<div class="input-daterange input-group" id="datepicker">
						<span class="input-group-btn">
							<button type="button" class="btn btn-default btn-sm dropdown-toggle date_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:150px">
								Week To Date <span class="caret"></span>
							</button>
							<ul class="dropdown-menu date_dropdown_menu" role="menu">
								<li><a href="#" id="date_today" class="crm_dropdown_list">Today</a></li>
								<li><a href="#" id="date_yesterday" class="crm_dropdown_list">Yesterday</a></li>
								<li><a href="#" id="date_thisweek" class="crm_dropdown_list">Week To Date</a></li>
								<li><a href="#" id="date_thismonth" class="crm_dropdown_list">Month To Date</a></li>
								<li><a href="#" id="date_thisyear" class="crm_dropdown_list">Year To Date</a></li>
								<li><a href="#" id="date_lastweek" class="crm_dropdown_list">Last Week</a></li>
								<li><a href="#" id="date_custom" class="crm_dropdown_list">Custom</a></li>
							</ul>
						</span>
						<span class="input-group-addon" style="font-size:12px;background:#f9f9f9">From</span>
					    <input id="from_date" type="text" class="input-sm form-control" name="start"/>
					    <span class="input-group-addon" style="font-size:12px;background:#f9f9f9">To</span>
					    <input id="to_date" type="text" class="input-sm form-control" name="end"/>
						<span class="input-group-btn">
							<button class="btn btn-default btn-sm affiliate_search_button" type="button" style="width:100px">Search</button>
						</span>    
					</div>
				</div>
			</div>
			<div class="row" style="margin-top:10px;">
					<div class="col-md-9 dashboard_left">
					<table class="table table-striped table-hover">
  						<thead>
  							<tr>
  								<th><button type="button" class="btn btn-link btn-sm btn_expand_all" id=""><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></th>
	  							<th>Affiliate (ID) Label</th>
	  							<th>STEP 1</th>
	  							<th>STEP 2</th>
	  							<th>TAKE RATE</th>
	  							<th>TABLET</th>
	  							<th>TABLET %</th>
                                <th>GOAL %</th>
                                <th>GOAL</th>
	  						</tr>
  						</thead>
  						<tbody class="table_affiliate_data_body">
  						</tbody>
					</table>
				</div>
				<div class="col-md-3 dashboard_right" >
					<table class="table table-striped table-hover">
  						<thead>
  							<tr>
  								<th>#</th>
  								<th>CRM</th>
  								<th>Campaign Count</th>
  								<th>Status</th>
  								<th><button type="button" class="btn btn-link btn-sm btn_refresh_all" id=""><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></th>
  							</tr>
  						</thead>
  						<tbody class="table_affiliate_state_body">
  						</tbody>
					</table>
				</div>						
			</div>
 		</div>
 	</div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
