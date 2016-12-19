# IPAddressVerify
Javascript and Jquery very IP address, subnet mask, and gateway 

I needed a method to verify that an IP address was usable and that the gateway was within the network.  The script checks the gateway against the subnet mask by finding the IP Network and Broadcast.  It also makes sure the IP address assigned is not a broadcast or network address.

Th PHP file is a basic web page that presents a form for the IP address.  The javascript hooks the submit button to chack the address.  Errors are placed in a right hand column and the submit process is canceled.


