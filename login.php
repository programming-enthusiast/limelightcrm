<?php

include_once 'daemon/api/DBApi.php';

session_start();

$dbApi = DBApi::getInstance();
if(!$dbApi->checkClientIp())
{
	header("Location: admin/blockip_alert.php");
	return;
}	

if (isset($_SESSION['user']) && $_SESSION['user'] == '')
{
	header("Location: admin/dashboard.php");	
}

if (isset($_GET['signin']))
{
	$dbApi = DBApi::getInstance();

	$user = $dbApi->validateUser($_GET['user_name'], $_GET['password']);
	if ($user != null && $user[2] == 1) 
	{
		$_SESSION['user_id'] = $user[3];
		$_SESSION['user'] = $user[0]; // user display name
		$_SESSION['role'] = $user[1];
		$_SESSION['user_name'] = $user[4]; // user name
		header("Location: admin/dashboard.php");
	}
}

?>


<!DOCTYPE html>
<html>
<head>
	<title>API Lotus</title>
	<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/limelightcrm.css" rel="stylesheet" type="text/css" />
	<link rel="icon" href="images/favicon.png" type="image/x-icon">
</head>

<body>
	<div class="crm_login_container">
		<div class="crm_login_logo">
            <img src="images/llcrm_logo_big.png">
        </div>
		<form class="form-signin" action="<?php echo $_SERVER['PHP_SELF'];?>">
			<h2 class="form-signin-heading">Please sign in</h2>
			<label for="username" class="sr-only">User Name</label>
			<input type="text" id="username" name="user_name" class="form-control" placeholder="User Name" required="" autofocus="" style="marign-bottom:10px;">
			<div style="height:10px;"></div>
			<label for="inputPassword" class="sr-only">Password</label>
			<input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required="">			
			<div style="height:20px;"></div>
        	<button name="signin" class="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
		</form>
	</div>

    <script src="js/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

</body>

</html>
