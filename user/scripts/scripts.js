/* CAUTION THIS FILE ALWAYS RENDER IF PRESENT IN PLUGIN */
//change this variable name
var clientId_descriptiveName = document.currentScript.src;

//Change all class names
function MyClassName() {
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(clientId_descriptiveName.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    this.packagePath = clientId_descriptiveName.replace('/scripts/myImplementation.js', '').trim();
    this.currentUrl = window.location.href.toLowerCase();
    //This validation always needed in this file beacuse this file if it is present when uploading the plugin will always execute this code,
    //so is mandatory to check which is the correct page to render
    if (this.currentUrl.indexOf("/user/checkout/select-gateway") >= 0) {
        //Code goes here...

    }

}

MyClassName.prototype.MethodName = function () {
    //Code goes here...
}

MyClassName.prototype.ApiRequestExample = function (packageId, data, tableName) {
    var deferred = $.Deferred();
    $.ajax({
        "url": `https://${window.location.host}/api/v2/plugins/${packageId}/custom-tables/${tableName}/rows`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
        success: function (response) {
            deferred.resolve(response);
        },
        fail: function (response, status) {
            deferred.reject(response);
        },
        error: function (response, status) {
            deferred.reject(response);
        }
    });

    return deferred.promise();
}

var descriptiveName = undefined;
$(document).ready(() => {
    descriptiveName = new MyClassName();
});
