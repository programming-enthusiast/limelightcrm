<div id="wrap_body">
	<div id="content_wrap">
		<div id="container">
			<section id="Top" class="group">
				<div style="background:#fff;padding-left:50px;">
					<img src="../images/site_logo.png" style="width:430px;">
				</div>
				<nav class="navbar navbar-default crm_navbar">
					<div class="container-fluid" style="padding-left:30px;padding-right:30px">
						<!--
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<a class="navbar-brand crm_navbar_brand" href="#"><img src="../images/llcrm_logo_small.png"></a>
						</div>
					-->
						<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul class="nav navbar-nav">
								<?php if ($tab_name == "Dashboard") { ?>
									<li style="background:#05948b"><a class="crm_tab_label" href="dashboard.php">Dashboard</a></li>
								<?php } else { ?>
									<li style="background:#434547"><a class="crm_tab_label" href="dashboard.php">Dashboard</a></li>
								<?php } ?>

								<?php if ($tab_name == "Affiliate") { ?>
									<li style="background:#05948b"><a class="crm_tab_label" href="affiliate.php">Affiliate</a></li>
								<?php } else { ?>
									<li style="background:#434547"><a class="crm_tab_label" href="affiliate.php">Affiliate</a></li>
								<?php } ?>

								<?php if ($tab_name == "Retention") { ?>
									<li style="background:#05948b"><a class="crm_tab_label" href="retention.php">Retention</a></li>
								<?php } else { ?>
									<li style="background:#434547"><a class="crm_tab_label" href="retention.php">Retention</a></li>
								<?php } ?>

								<?php if ($tab_name == "Alerts") { ?>
									<li style="background:#05948b"><a class="crm_tab_label" href="alerts.php">Alerts</a></li>
								<?php } else { ?>
									<li style="background:#434547"><a class="crm_tab_label" href="alerts.php">Alerts</a></li>
								<?php } ?>

								<?php if ($tab_name == "Accounts" || $tab_name == "Affiliate Management" || $tab_name == "Alert Percentage Levels" || $tab_name == "Campaign Management" || $tab_name == "CRM Management") { ?>
									<li style="background:#05948b" class="dropdown">
								<?php } else { ?>
									<li style="background:#434547" class="dropdown">
								<?php } ?>
									<a href="#" class="dropdown-toggle crm_tab_label" data-toggle="dropdown" role="button" aria-expanded="false">Settings <span class="caret"></span></a>
									<ul class="dropdown-menu crm_setting_dropdown" role="menu">
										<?php if (isset($_SESSION['role']) && $_SESSION['role'] != '0') { ?>
											<?php if ($tab_name == "CRM Management") { ?>
												<li style="background:#05948b"><a class="crm_tab_label" href="setting_crm.php">CRM Management</a></li>
											<?php } else { ?>
												<li style="background:#434547"><a class="crm_tab_label" href="setting_crm.php">CRM Management</a></li>
											<?php } ?>
											<?php if ($tab_name == "Campaign Management") { ?>
												<li style="background:#05948b"><a class="crm_tab_label" href="setting_campaign.php">Campaign Management</a></li>
											<?php } else { ?>
												<li style="background:#434547"><a class="crm_tab_label" href="setting_campaign.php">Campaign Management</a></li>
											<?php } ?>
											<?php if ($tab_name == "Affiliate Management") { ?>
												<li style="background:#05948b"><a class="crm_tab_label" href="setting_affiliate.php">Affiliate Management</a></li>
											<?php } else { ?>
												<li style="background:#434547"><a class="crm_tab_label" href="setting_affiliate.php">Affiliate Management</a></li>
											<?php } ?>
											<?php if ($tab_name == "Alert Percentage Levels") { ?>
												<li style="background:#05948b"><a class="crm_tab_label" href="setting_alert.php">Alert Percentage Levels</a></li>
											<?php } else { ?>
												<li style="background:#434547"><a class="crm_tab_label" href="setting_alert.php">Alert Percentage Levels</a></li>
											<?php } ?>
										<?php } ?>
										<?php if ($tab_name == "Accounts") { ?>
											<li style="background:#05948b"><a class="crm_tab_label" href="setting_accounts.php">Accounts</a></li>
										<?php } else { ?>
											<li style="background:#434547"><a class="crm_tab_label" href="setting_accounts.php">Accounts</a></li>
										<?php } ?>
									</ul>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li><a style="color:white" href="setting_accounts.php">Welcome <span class="crm_tab_active_label"><?php echo $user_name.'!'; ?></span></a></li>
								<li><a class="crm_tab_label" href="logout.php"><span class="glyphicon glyphicon-log-out" aria-hidden="true" style="width:25px;color:#fff"></span>Logout</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</section>
			<div class="container-fluid crm_content">
				<!--
			 	<div>
			 		<h3><?php echo $tab_name; ?></h3>
			 		<div class="horizontal_rule"></div>
			 	</div>
			 	-->
