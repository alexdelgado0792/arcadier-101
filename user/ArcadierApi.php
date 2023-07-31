<?php 

//import file that make the HTTP calls.
require_once('HttpClient.php');

class ArcadierApi {
    protected $baseUrl;
    private $clientId;
    private $clientSecret;
    protected $adminToken;
    protected $adminId;
    protected $packageId;

    public function __construct($clientId, $clientSecret) {
        $this->baseUrl = $this->GetBaseUrl();
        $this->packageId = $this->GetPackageId();

        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;

        $adminInfo = $this->GetAdminToken();
        $this->adminToken = $adminInfo['token'];
        $this->adminId = $adminInfo['adminId'];
    }

    public function GetAdminId()
    {
        return $this->adminId;
    }
    
    public function RetreiveAdminToken()
    {
        return $this->adminToken;
    }
    
    function GetBaseUrl()
    {
        $marketplace = $_COOKIE['marketplace'];
        $protocol = $_COOKIE['protocol'];
        return $protocol . '://' . $marketplace;
    }

    function GetPackageId()
    {
        $requestUri = "$_SERVER[REQUEST_URI]";
        preg_match('/([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/', $requestUri, $matches, 0);
        return $matches[0];
    }

    function GetAdminToken()
    {
        $token = array();

        $url = $this->baseUrl . '/token';

        $body = 'grant_type=client_credentials&client_id=' . $this->clientId . '&client_secret=' .
            $this->clientSecret . '&scope=admin';

        $response = callAPI('POST', null, $url, $body);

        if ($response != null && array_key_exists('access_token', $response) && array_key_exists('UserId', $response)) {
            $token['token'] = $response['access_token'];
            $token['adminId'] = $response['UserId'];
        }

        return $token;
    }

    //Add above new method for new Arcadier API calls as needed.

    /*
    //Example 
    function GetAllCtContent($tableName)
    {
        $result = null;

        $url = $this->baseUrl . '/api/v2/plugins/' . $this->packageId . '/custom-tables/' . $tableName;

        $response = callAPI('GET', $this->adminToken, $url);
        if ($response != null) {
            $result = $response;
        }

        return $result;
    }
    */

    
}

?>