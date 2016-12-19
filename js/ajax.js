
$(document).ready(function () {
	
	$( "#NetworkForm" ).submit(function( event ) {
		if (VerifyIP()==false) {
			event.preventDefault();
		}
	});
	$( "#DHCPStatic" ).on('change',function() {
		ShowStaticDHCP();
		
	});

	
	
});

function ShowStaticDHCP()
{
	if( $("#DHCPStatic" ).val() == "dhcp")
	{
		$("input[name='IP']").prop('readonly', true);
		$("input[name='SM']").prop('readonly', true); 
		$("input[name='GW']").prop('readonly', true); 
		$("input[name='PDNS']").prop('readonly', true); 
		$("input[name='SDNS']").prop('readonly', true); 

		$("input[name='IP']").css('border', '0px');
		$("input[name='SM']").css('border', '0px'); 
		$("input[name='GW']").css('border', '0px'); 
		$("input[name='PDNS']").css('border', '0px'); 
		$("input[name='SDNS']").css('border', '0px'); 
	
	} else {
		$("input[name='IP']").prop('readonly', false);
		$("input[name='SM']").prop('readonly', false);
		$("input[name='GW']").prop('readonly', false);
		$("input[name='PDNS']").prop('readonly', false);
		$("input[name='SDNS']").prop('readonly', false);
		
		$("input[name='IP']").css('border', '');
		$("input[name='SM']").css('border', ''); 
		$("input[name='GW']").css('border', ''); 
		$("input[name='PDNS']").css('border', ''); 
		$("input[name='SDNS']").css('border', ''); 

	}
		
	
}


function VerifyIP()
{
	
	/* Clear Error Indictator */
	$("#IPError").text(' ');
	$("#SMError").text(' ');
	$("#GWError").text(' ');
	$("#PDNSError").text(' ');
	$("#SDNSError").text(' ');

	/* Get Values */
	
	var IP = $("input[name='IP']").val();
	var SM = $("input[name='SM']").val();
	var GW = $("input[name='GW']").val();
	var PDNS = $("input[name='PDNS']").val();
	var SDNS = $("input[name='SDNS']").val();
	
	
	
	var arrIP = IP.split('.');
	var arrSM = SM.split('.');
	var arrGW = GW.split('.');
	var arrPDNS = PDNS.split('.');
	var arrSDNS = SDNS.split('.');
	
	/* Check each for proper length and that each part is an integer*/
	if(arrIP.length != 4) {
		$("#IPError").text('Invalid IP Address.  Missing octet(s)');
		return false;
	} else {
		for(t=0;t<4;t++) {
			if( /^[0-9]+$/.test(arrIP[t]) == false) {
				$("#IPError").text('Invalid IP Address.  Non numeric digits found.');
				return false;
				
			}
			
		}
	}
	
	if(arrSM.length != 4) {
		$("#SMError").text('Invalid Subnet Mask.  Missing octet(s)');
		return false;
	} else {
		for( t=0;t<4;t++) {
			if( /^[0-9]+$/.test(arrSM[t]) == false) {
				$("#SMError").text('Invalid Subnet Mask.  Non numeric digits found.');
				return false;
				
			}
			
		}
	}
	
	if(arrGW.length != 4) {
		$("#GWError").text('Invalid Gateway.  Missing octet(s)');
		return false;
	} else {
		for( t=0;t<4;t++) {
			if( /^[0-9]+$/.test(arrGW[t]) == false) {
		$("#GWError").text('Invalid Gateway');
				return false;
				
			}
			
		}
	}
	
	if(arrPDNS.length != 4) {
		$("#PDNSError").text('Invalid Primary DNS.  Missing octet(s)');
		return false;
	} else {
		for( t=0;t<4;t++) {
			if( /^[0-9]+$/.test(arrPDNS[t]) == false) {
				$("#PDNSError").text('Invalid Primary DNS.  Non numeric digits found.');
				return false;
				
			}
			
		}
	}
	
	if(arrSDNS.length != 4) {
		$("#SDNSError").text('Invalid Secondary DNS.  Missing octet(s)');
		return false;
	} else {
		for( t=0;t<4;t++) {
			if( /^[0-9]+$/.test(arrSDNS[t]) == false) {
				$("#SDNSError").text('Invalid Secondary DNS.  Non numeric digits found.');
				return false;
				
			}
			
		}
	}
	

	
	/* Make sure the mask is valid */

	/* Step1:  Make sure each value is valid */
	for( t=0;t<4;t++) 
	{
		var value = arrSM[t];
		if( (value != 0) && (value != 128) && (value != 192) && (value != 224) && (value != 240) && (value != 248) && (value != 252) && (value != 255) ) 
		{
			$("#SMError").text('Invalid Subnet Mask.  Invalid number');
			return false;
		}
	}

	/* Step2:  Make sure the order is correct */
	
	if(arrSM[0] < 255 && arrSM[1] != 0 && arrSM[2] != 0 && arrSM[3] != 0) {
		$("#SMError").text('Invalid Subnet Mask');
		return false;
	}
	if(arrSM[1] < 255 &&  arrSM[2] != 0 && arrSM[3] != 0) {
		$("#SMError").text('Invalid Subnet Mask.');
		return false;
	}
	if(arrSM[2] < 255 &&  arrSM[3] != 0 ) {
		$("#SMError").text('Invalid Subnet Mask.');
		return false;
	}
	if(arrSM[3] == 255 ) {
		$("#SMError").text('Invalid Subnet Mask.  32bit mask not allowed');
		return false;
	}

	
	
	/* Check IP Address  isn't on loopback or 255*/
	
	if(arrIP[0] == 255 || arrIP[0] == 127) {
		$("#IPError").text('Invalid IP Address.  First octet is invalid.');
		return false;
	}
	
	/* Calculate Broadcast, Network Address */
	arrNetwork = new Array(  arrIP[0] & arrSM[0] , arrIP[1] & arrSM[1], arrIP[2] & arrSM[2], arrIP[3] & arrSM[3]  );
	arrWildcard = new Array( arrSM[0] ^ 255, arrSM[1] ^ 255, arrSM[2] ^ 255, arrSM[3] ^ 255);
	arrBroadcast = new Array(arrNetwork[0] + arrWildcard[0],  arrNetwork[01] + arrWildcard[1],  arrNetwork[2] + arrWildcard[2],  arrNetwork[3] + arrWildcard[3]);
	
	
	/* make sure IP doesn't equal broadcast or network */
	if( (arrIP[0] == arrNetwork[0]) && (arrIP[1] == arrNetwork[1]) &&(arrIP[2] == arrNetwork[2]) &&(arrIP[3] == arrNetwork[3]) )
	{
		$("#IPError").text('Invalid IP Address');
		return false;
	}
	if( (arrIP[0] == arrBroadcast[0]) && (arrIP[1] == arrBroadcast[1]) &&(arrIP[2] == arrBroadcast[2]) &&(arrIP[3] == arrBroadcast[3]) )
	{
		$("#IPError").text('Invalid IP Address.');
		return false;
	}
	
	/* make sure gateway isn't the broadcast or network address */
	if( (arrGW[0] == arrNetwork[0]) && (arrGW[1] == arrNetwork[1]) &&(arrGW[2] == arrNetwork[2]) &&(arrGW[3] == arrNetwork[3]) )
	{
		$("#GWError").text('Invalid Gateway Address');
		return false;
	}
	if( (arrGW[0] == arrBroadcast[0]) && (arrGW[1] == arrBroadcast[1]) &&(arrGW[2] == arrBroadcast[2]) &&(arrGW[3] == arrBroadcast[3]) )
	{
		$("#GWError").text('Invalid Gateway Address');
		return false;
	}
	
	/* make sure gateway isn't the broadcast or network address  and is in the networks range*/
	

	var GatewayLong  =    ((((((+arrGW[0])*256)+(+arrGW[1]) )*256)+(+arrGW[2]) )*256)+(+arrGW[3]);
	var NetworkLong  =    ((((((+arrNetwork[0])*256)+(+arrNetwork[1]) )*256)+(+arrNetwork[2]) )*256)+(+arrNetwork[3]);
	var BroadcastLong = ((((((+arrBroadcast[0])*256)+(+arrBroadcast[1]) )*256)+(+arrBroadcast[2]) )*256)+(+arrBroadcast[3]);
	if(GatewayLong <= NetworkLong || GatewayLong >= BroadcastLong)
	{
		$("#GWError").text('Invalid Gateway Address');
		return false;
	}
	
	return true;
	
}

