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
$tab_name = "Affiliate Management";

?>


<!DOCTYPE html>
<html>
	<?php include('common/crm_header.php'); ?>
<body>
	<?php include('setting_affiliate_modal.php'); ?>
	<?php include('common/crm_body_up.php'); ?>
	<div class="row">        
	 	<div class="col-md-12">
			<div class="row tab_row_default">
				<div class="col-lg-10"><span class="glyphicon glyphicon-cog" aria-hidden="true" style="width:25px;color:#fff"></span> Affiliate Report</div>
				<div class="col-lg-2 setting_affiliate_waiting" style="text-align:right"><p></p></div>
			</div>
			<div class="alert alert-warning setting_affiliate_alert" role="alert" style="display:none"></div>
  			<div class="row">
                <div class="col-lg-3">
                	<button type="button" class="btn btn-link btn-sm btn_affiliate_add" data-toggle="modal" data-target="#affiliate_add_modal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;Add Affiliate</button>
                </div>
                <div class="col-lg-8" style="text-align:right">
					<div class="btn-group affiliate_pagination" role="group">
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
				<div class="col-lg-1" style="text-align:right">
                	<button class="btn btn-default btn-sm btn-success btn_export" type="button" style="width:120px">Export To Excel</button>
                </div>						
			</div>
			<table class="table table-striped table-hover" style="margin-top:10px;">
				<thead class="table_affiliate_head">
				</thead>
				<tbody class="table_affiliate_body">  							
				</tbody>
			</table>
 		</div> 		 
	 </div>
	<?php include('common/crm_body_down.php'); ?>
</body>
</html>
