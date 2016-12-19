<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Content-Language" content="UTF-8" />
	<title>Device Configuration</title>
	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</head>
<body>
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/ajax.js"></script>

<div id="pageHeader">
	<div id="banner">
	</div>		
</div>
<div id="PageBody">
	<div id="LeftSection">
		<div id="NetworkPage" >
			<form id="NetworkForm" >
			<table>
				<tr>
					<td>Address Type</td>
					<td>
						<select id="DHCPStatic">
							<option value="dhcp">DHCP</option>
							<option value="static">Static</option>
						</select>
					</td>
					<td></td>
				</tr>
				<tr>
					<td>IP Address</td>
					<td><input  name="IP" value="10.10.0.118" maxlength="15"></td>
					<td id="IPError"></td>
				</tr>
				<tr>
					<td>Subnet Mask</td>
					<td><input  name="SM" value="255.255.255.0" maxlength="15"></td>
					<td id="SMError"></td>
				</tr>
				<tr>
					<td>Gateway</td>
					<td><input  name="GW" value="10.10.0.40" maxlength="15"></td>
					<td id="GWError"></td>
				</tr>
				<tr>
					<td>Primary DNS</td>
					<td><input  name="PDNS" value="10.10.0.40" maxlength="15"></td>
					<td id="PDNSError"></td>
				</tr>
				<tr>
					<td>Secondary DNS</td>
					<td><input  name="SDNS" value="10.10.0.118" maxlength="15"></td>
					<td id="SDNSError"></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td><input type="submit" value="Submit"></td>
				</tr>
			</table>
			</form>
		</div>

	<div id="RightSection">
		<div id="Status">
			<h2><span>Status</span></h2>
			<ul>
				<li><div id="DateTime">Date and Time</div></li>
			</ul>
		</div>
	</div>
</div>
</body>
</html>