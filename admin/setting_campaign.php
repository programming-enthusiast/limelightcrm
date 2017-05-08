<?php

include '../daemon/api/LLCrmApi.php';
require_once '../daemon/api/DBApi.php';
// check client ip
$dbApi = DBApi::getInstance();
if(!$dbApi->checkClientIp())
{
    header("Location: blockip_alert.php");
    return;
}
session_start();

if (!isset($_SESSION['user']) || $_SESSION['user'] == '' || $_SESSION['role'] == '0')
	header("Location: ../login.php");

$user_name = $_SESSION['user'];
$tab_name = "Campaign Management";
$user_id = $_SESSION['user_id'];

$dbApi = DBApi::getInstance();
$crmList = $dbApi->getAllCrmByAccountId($user_id);

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('setting_campaign_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
	 	<div class="row">
	 		<div class="col-md-8">
				<div class="row tab_row_default">
					<div class="col-lg-10"><span class="glyphicon glyphicon-cog" aria-hidden="true" style="width:25px;color:#fff"></span> Campaign Report</div>
					<div class="col-lg-2 setting_campaign_waiting" style="text-align:right"></div>
				</div>
				<div class="alert alert-warning setting_campaign_alert" role="alert" style="display:none"></div>
				<div class="row">
					<div class="col-lg-6">
						<div class="input-group">
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
												echo '<li><a href="#" id="'.$crmList[$i][0].'" class="crm_dropdown_list">'.$crmList[$i][1].'</a></li>';
										}
									?>
								</ul>
							</span>
							<input type="text" class="form-control input-sm search_campaign_ids" placeholder="Search by Campaign Id">
							<span class="input-group-btn">
								<button class="btn btn-default btn-sm campaign_search_button" type="button" style="width:100px">Search</button>
							</span>
						</div>
					</div>
					<div class="col-lg-1">
						<div class="btn-group">
							<button type="button" class="btn btn-default btn-sm dropdown-toggle campaign_action_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:100px">
								Action <span class="caret"></span>
							</button>
							<ul class="dropdown-menu campaign_action_dropdown_menu" role="menu">
								<li><a href="#" id="action_edit">Edit Label</a></li>
								<li><a href="#" id="action_delete">Delete Label</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-5" style="text-align:right">
						<div class="btn-group campaign_pagination" role="group">
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default btn-sm dropdown-toggle count_toggle_button" data-toggle="dropdown" aria-expanded="false" style="width:60px">
								10 <span class="caret"></span>
							</button>
							<ul class="dropdown-menu count_dropdown_menu" role="menu">
								<li><a href="#">10</a></li>
								<li><a href="#">20</a></li>
								<li><a href="#">50</a></li>
								<li><a href="#">100</a></li>
								<li><a href="#">500</a></li>
								<li><a href="#">1000</a></li>
							</ul>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover" style="margin-top:10px;">
					<thead>
						<tr>
							<th><input type="checkbox" class="campagin_select_all"></th>
							<th>Campaign ID</th>
							<th>Campaign Name</th>
							<th>Campaign Labels</th>
						</tr>
					</thead>
					<tbody class="table_campaign_body">
					</tbody>
				</table>
	 		</div>
			<div class="col-md-4">
				<div class="row tab_row_default">
					<div class="col-lg-10"><span class="glyphicon glyphicon-book" aria-hidden="true" style="width:25px;color:#fff"></span> Label Report</div>
					<div class="col-lg-2 setting_label_waiting" style="text-align:right"></div>
				</div>
				<div class="alert alert-warning setting_label_alert" role="alert" style="display:none"></div>
				<div class="row">
					<div class="col-lg-12" style="text-align:right">
						<button type="button" class="btn btn-link btn-sm btn_label_add" data-toggle="modal" data-target="#campaign_label_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add Label</button>
					</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Label Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody class="table_label_body">
					</tbody>
				</table>
			</div>
	 	</div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
