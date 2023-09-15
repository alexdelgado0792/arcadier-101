//change this variable name
var p_descriptiveName = document.currentScript.src;

//Change all class names
function MyClassName() {
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(p_descriptiveName.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    //chnage file name for the current one of the file
    this.packagePath = p_descriptiveName.replace('/scripts/myImplementation.js', '').trim();

    //This validation only goes if you are in plugin page
    if (document.getElementById('packageId') != null) {
        if (document.getElementById('packageId').value == this.packageId) {

            //Code goes here...
        }
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