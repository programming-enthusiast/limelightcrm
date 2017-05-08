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
$tab_name = "Alerts";	

$dbApi = DBApi::getInstance();
$crmList = $dbApi->getAllCrmByAccountId($_SESSION['user_id']);

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('common/crm_body_up.php'); ?>
	 	<div class="row">
	 		<div class="col-md-12">
				<div class="row tab_row_default">
					<div class="col-lg-10"><span class="glyphicon glyphicon-tasks" aria-hidden="true" style="width:25px;color:#fff"></span> Alert Report</div>
					<div class="col-lg-2 alert_waiting" style="text-align:right"></div>
				</div>
				<div class="alert alert-warning level_alert" role="alert" style="display:none"></div>
				<table class="table table-striped table-hover">
					<thead class="table_alert_head">
					</thead>
					<tbody class="table_alert_body">	  							
					</tbody>
				</table>
			</div>
	 	</div>
	 	<section id="history">
		 	<div class="row">
		 		<div class="col-md-12">
					<div class="row tab_row_alert">
						<div class="col-lg-10"><span class="glyphicon glyphicon-alert" aria-hidden="true" style="width:25px;color:#fff"></span> Alert History</div>
						<div class="col-lg-2 history_waiting" style="text-align:right"></div>
					</div>
					<div class="alert alert-warning history_alert" role="alert" style="display:none"></div>
					<div class="row">
						<div class="col-lg-6">
							<div class="input-daterange input-group" id="datepicker">
								<span class="input-group-btn">
									<button type="button" class="btn btn-default btn-sm dropdown-toggle crm_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:150px">
										<?php
											if ($crmList != null && count($crmList) > 0)
												echo $crmList[0][1].' ';
											else
												echo 'CRM Name ';
										?>    										
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu crm_dropdown_menu" role="menu">
										<?php
											if ($crmList != null) {
												for ($i = 0; $i < count($crmList); $i++)
													echo '<li><a href="#history" id="'.$crmList[$i][0].'" class="crm_dropdown_list">'.$crmList[$i][1].'</a></li>';
												echo '<li><a href="#history" id="0" class="crm_dropdown_list">'.'All CRM'.'</a></li>';
											}
										?>
									</ul>
								</span>
								<span class="input-group-btn">
									<button type="button" class="btn btn-default btn-sm dropdown-toggle date_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:150px">
										Week To Date <span class="caret"></span>
									</button>
									<ul class="dropdown-menu date_dropdown_menu" role="menu">
										<li><a href="#history" id="date_today">Today</a></li>
										<li><a href="#history" id="date_yesterday">Yesterday</a></li>
										<li><a href="#history" id="date_thisweek">Week To Date</a></li>
										<li><a href="#history" id="date_thismonth">Month To Date</a></li>
										<li><a href="#history" id="date_thisyear">Year To Date</a></li>
										<li><a href="#history" id="date_lastweek">Last Week</a></li>
										<li><a href="#history" id="date_custom">Custom</a></li>
									</ul>
								</span>
								<span class="input-group-addon" style="font-size:12px;background:#f9f9f9">From</span>
							    <input id="from_date" type="text" class="input-sm form-control" name="start"/>
							    <span class="input-group-addon" style="font-size:12px;background:#f9f9f9">To</span>
							    <input id="to_date" type="text" class="input-sm form-control" name="end"/>
							    <span class="input-group-btn">
									<button class="btn btn-default btn-sm history_search_button" type="button" style="width:100px">Search</button>
								</span>    
							</div>
						</div>
						<div class="col-lg-6" style="text-align:right">
							<div class="btn-group campaign_pagination" role="group">
							</div>
							<div class="btn-group">
								<button type="button" class="btn btn-default btn-sm dropdown-toggle count_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:60px">
									10 <span class="caret"></span>
								</button>
								<ul class="dropdown-menu count_dropdown_menu" role="menu">
									<li><a href="#history">10</a></li>
									<li><a href="#history">20</a></li>
									<li><a href="#history">50</a></li>
									<li><a href="#history">100</a></li>
									<li><a href="#history">500</a></li>
									<li><a href="#history">1000</a></li>
								</ul>
							</div>
						</div>
					</div>
					<table class="table table-striped table-hover" style="margin-top:10px;">
  						<thead>
  							<tr>
	  							<th>#</th>
	  							<th>CRM Name</th>
	  							<th>Alert Name</th>
	  							<th>Register Date</th>
	  							<th>From Date</th>
	  							<th>To Date</th>
	  							<th>Read</th>
	  							<th>Delete</th>
	  						</tr>		  						
  						</thead>
  						<tbody class="table_history_body">	  							
  						</tbody>
					</table>
				</div>
		 	</div>
	 	</section>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
