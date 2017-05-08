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

if (!isset($_SESSION['user']) || $_SESSION['user'] == '' || $_SESSION['role'] == '0')
	header("Location: ../login.php");

$user_name = $_SESSION['user'];
$tab_name = "Alert Percentage Levels";

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('setting_alert_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
	 	<div class="row">
	 		<div class="col-md-12">
				<div class="row tab_row_default">
					<div class="col-lg-10"><span class="glyphicon glyphicon-alert" aria-hidden="true" style="width:25px;color:#fff"></span> Alert Level</div>
					<div class="col-lg-2 alert_level_waiting" style="text-align:right"></div>
				</div>
				<div class="alert alert-warning setting_crm_alert" role="alert" style="display:none"></div>
				<table class="table table-striped table-hover">
					<thead class="table_level_head">
					</thead>
					<tbody class="table_level_body">
					</tbody>
				</table>
			</div>
			<div class="col-md-12" style="margin-top:10px">
				<div class="row tab_row_default">
					<div class="col-lg-12"><span class="glyphicon glyphicon-time" aria-hidden="true" style="width:25px;color:#fff"></span> Alert Schedule</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Alert Name</th>
							<th>Alert Formula</th>
							<th>Report Date</th>
							<th>Alert Schedule</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody class="table_type_body">
					</tbody>
				</table>
			</div>
			<!--
			<div class="col-md-3">
				<div class="row">
					<div class="col-md-12">
	 					<div class="row tab_row_default">
							<div class="col-lg-11"><span class="glyphicon glyphicon-link" aria-hidden="true" style="width:25px;color:#fff"></span> SMS / Email / Telegram Bot Alert</div>
							<div class="col-lg-1 alert_receiver_waiting" style="text-align:right"></div>
						</div>
						<div class="alert alert-warning setting_receiver_alert" role="alert" style="display:none"></div>
						<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
						<div class="row">
							<div class="col-lg-12" style="text-align:right">
								<button type="button" class="btn btn-link btn-sm btn_receiver_sms_add" style="width:140px;text-align:left" data-toggle="modal" data-target="#receiver_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add SMS Number</button>
							</div>
						</div>
						<?php } ?>
						<table class="table table-striped table-hover">
	  						<thead>
	  							<tr>
		  							<th style="width:30px">#</th>
		  							<th>SMS Number</th>
		  							<th style="width:70px">Status</th>
		  							<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
	                                <th style="width:70px">Action</th>
	                                <?php } ?>
		  						</tr>
	  						</thead>
	  						<tbody class="table_receiver_sms_body">
	  						</tbody>
						</table>
						<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
						<div class="row">
							<div class="col-lg-12" style="text-align:right">
								<button type="button" class="btn btn-link btn-sm btn_receiver_mail_add" style="width:140px;text-align:left" data-toggle="modal" data-target="#receiver_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add Email Address</button>
							</div>
						</div>
						<?php } ?>
						<table class="table table-striped table-hover">
	  						<thead>
	  							<tr>
		  							<th style="width:30px">#</th>
		  							<th>Email Address</th>
		  							<th style="width:70px">Status</th>
		  							<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
	                                <th style="width:70px">Action</th>
	                                <?php } ?>
		  						</tr>
	  						</thead>
	  						<tbody class="table_receiver_mail_body">
	  						</tbody>
						</table>
						<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
						<div class="row">
							<div class="col-lg-12" style="text-align:right">
								<button type="button" class="btn btn-link btn-sm btn_receiver_bot_add" style="width:140px;text-align:left" data-toggle="modal" data-target="#receiver_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add Telegram User</button>
							</div>
						</div>
						<?php } ?>
						<table class="table table-striped table-hover">
	  						<thead>
	  							<tr>
		  							<th style="width:30px">#</th>
		  							<th>User Name</th>
		  							<th>Chat ID</th>
		  							<th style="width:70px">Status</th>
		  							<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
	                                <th style="width:70px">Action</th>
	                                <?php } ?>
		  						</tr>
	  						</thead>
	  						<tbody class="table_receiver_bot_body">
	  						</tbody>
						</table>
						<span>※ Telegram Bot's name for this site is <b>APILotusBot.</b></span>
					</div>
				</div>
			</div>
			-->
	 	</div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
