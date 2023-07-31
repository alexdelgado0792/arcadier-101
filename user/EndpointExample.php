<?php

//File imports
require_once('ArcadierApi.php');//Base file that contain all necessary methods to interact with Arcadier.

//In order to get body from API call
//$json = file_get_contents('php://input');
//$data = json_decode($json);
//access data as follow: $data->type

//Get creadential keys from your marketplace or use Arcadier generated files in order to get the admin token (not always work)
$arcadierClientId = '';
$arcadierSecretClientId = '';

//Endpoint response object
$response = array();
$response["Result"] = null;
$response["Message"] = "";
$response["Error"] = false;

try {
    $arcadier = new ArcadierApi($arcadierClientId, $arcadierSecretClientId);

    //Code goes here...

    //Asign return value 
    $response["Result"] = "add here json object to return data.";

} catch (Exception $ex) {
    $response["Error"] = true;
    $response["Message"] = $ex->getMessage();
}

//Return value in order to be process by the JS file
echo json_encode($response);

?>