<html>
<head><title>HTTP Request Debug Page</title>
</head>
<body>
<pre>
/**
 * Here are the details of your request:
 */


$_POST = <?php print_r($_POST); ?>



# # # 



$_GET = <?php print_r($_GET); ?>



# # # 



$_REQUEST = <?php print_r($_REQUEST); ?>



# # # 



$_COOKIE = <?php print_r($_COOKIE); ?>



# # # 
</pre>
</body>
</html>