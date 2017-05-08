<?php

// session_start();

// if (!isset($_SESSION['user']) || $_SESSION['user'] == '')
// 	header("Location: ../login.php");

// $user_name = $_SESSION['user'];
// $tab_name = "Alerts";	

?>


<!DOCTYPE html>
<html>
	<head>
		<title>API Lotus</title>
		<meta charset="utf-8" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	    <meta name="viewport" content="width=device-width, initial-scale=1" />

	    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	    <link href="../css/limelightcrm.css" rel="stylesheet" type="text/css" />
		<link rel="icon" href="../images/favicon.png" type="image/x-icon">
	</head>
	<body>
		<div class="row" style="margin-top:50px;">
			<div class="col-md-4 col-md-offset-4">
				<div class="panel panel-danger">
					<div class="panel-heading">
						Block IP Alert
					</div>
					<div class="panel-body">
						<label>
							Sorry!<br>
							This IP address has been blocked by API Lotus.<br>
							If you have any comments on this, please contact us.<br><br>
							API Lotus Team
						</label>
					</div>
				</div>
			</div>	
		</div>
	</body>
</html>
