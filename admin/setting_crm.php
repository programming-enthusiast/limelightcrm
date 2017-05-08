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
$tab_name = "CRM Management";


?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
    <?php include('setting_crm_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
		<div class="row">        
		 	<div class="col-md-12">
				<div class="row tab_row_default">
					<div class="col-lg-10"><span class="glyphicon glyphicon-user" aria-hidden="true" style="width:25px;color:#fff"></span> CRM Account Report</div>
					<div class="col-lg-2 setting_crm_waiting" style="text-align:right"></div>
				</div>
				<div class="alert alert-warning setting_crm_alert" role="alert" style="display:none"></div>
      			<div class="row">
					<div class="col-lg-12" style="text-align:right">
						<button type="button" class="btn btn-link btn-sm btn_crm_add" data-toggle="modal" data-target="#crm_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add CRM</button>
					</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>CRM Name</th>
							<th>CRM Site URL</th>
							<th>CRM User Name</th>
							<th>CRM Password</th>
                        <th>API User Name</th>
                        <th>API Password</th>
                        <th>Sales Goal</th>
                        <th>Status*</th>
                        <th>Password Valid Days</th>
							<th>CRM Action</th>
						</tr>
					</thead>
					<tbody class="table_crm_body">
					</tbody>
				</table>
	 		</div> 		 
		 </div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
