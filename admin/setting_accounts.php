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
$tab_name = "Accounts";


?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('setting_accounts_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
 	<div class="row">
		<div class="col-md-9">
			<div class="row tab_row_default">
				<div class="col-lg-10"><span class="glyphicon glyphicon-user" aria-hidden="true" style="width:25px;color:#fff"></span> Account Report</div>
				<div class="col-lg-2 setting_account_waiting" style="text-align:right"></div>
			</div>
			<div class="alert alert-warning setting_account_alert" role="alert" style="display:none"></div>
			<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
			<div class="row">
				<div class="col-lg-12" style="text-align:right">
					<button type="button" class="btn btn-link btn-sm btn_account_add" data-toggle="modal" data-target="#account_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add Account</button>
				</div>
			</div>
			<?php } ?>
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>User Name</th>
						<!--<th>Password</th>-->
						<th>Display Name</th>
						<th>SMS Number</th>
						<th>Email Address</th>
						<th>Telegram Bot</th>
						<th>User Role</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody class="table_account_body">
				</tbody>
			</table>
 		</div>
 		<div class="col-md-3">
			<div class="row tab_row_alert">
				<div class="col-lg-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true" style="width:25px;color:#fff"></span> Block IP Address</div>
				<div class="col-lg-2 setting_ip_waiting" style="text-align:right"></div>
			</div>
			<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
			<div class="alert alert-warning setting_ip_alert" role="alert" style="display:none"></div>
			<div class="row">
				<div class="col-lg-12" style="text-align:right">
					<button type="button" class="btn btn-link btn-sm btn_blockip_add" data-toggle="modal" data-target="#block_ip_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add IP Address</button>
				</div>
			</div>
			<?php } ?>
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>IP Address</th>
						<th>Description</th>
						<?php if (isset($_SESSION['role']) && $_SESSION['role'] == '9') { ?>
						<th>Action</th>
						<?php } ?>
					</tr>
				</thead>
				<tbody class="table_blockip_body">	  							
				</tbody>
			</table>		
		</div>
 	</div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
