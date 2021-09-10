$("#playerId").focus();

function validateAndGetFormData() {
    var playerIdVar = $("#playerId").val();
    if (playerIdVar === "") {
        alert("Employee ID Required Value");
        $("#playerId").focus();
        return "";
    }
    var playerNameVar = $("#playerName").val();
    if (playerNameVar === "") {
        alert("Employee Name is Required Value");
        $("#playerName").focus();
        return "";
    }
    var playerEmailVar = $("#playerEmail").val();
    if (playerEmailVar === "") {
        alert("Employee Email is Required Value");
        $("#playerEmail").focus();
        return "";
    }
    var playerPosVar = $("#playerPos").val();
    if (playerPosVar === "") {
        alert("Postion is Required Value");
        $("#playerPos").focus();
        return "";
    }
    var pfootVar = $("#pfoot").val();
    if (pfootVar === "") {
        alert("Postion is Required Value");
        $("#pfoot").focus();
        return "";
    }




    var jsonStrObj = {
        playerId: playerIdVar,
        playerName: playerNameVar,
        playerEmail: playerEmailVar,
        playerPos:playerPosVar,
        State:pfootVar
    };
    return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n" +
        "\"token\" : \"" +
        connToken +
        "\"," +
        "\"dbName\": \"" +
        dbName +
        "\",\n" + "\"cmd\" : \"PUT\",\n" +
        "\"rel\" : \"" +
        relName + "\"," +
        "\"jsonStr\": \n" +
        jsonObj +
        "\n" +
        "}";
    return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function resetForm() {
    $("#playerId").val("")
    $("#playerName").val("");
    $("#playerEmail").val("");
    $("#playerPos").val("");
    $("#pfoot").val("");
    $("#playerId").focus();
}

function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90936166|-31948850754447635|90943814",
        jsonStr, "New_Employee", "db-relation");
    // alert(putReqStr);
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommand(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({
        async: true
    });
    resetForm();
}