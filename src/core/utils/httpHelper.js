exports.sendAckResponse = (res, err, msg) => {

    let responseString;
    if (err) {
        responseString = {
            success: false,
            message: err.message
        }
    } else {
        responseString = {
            success: true,
            message: msg
        }
    }
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(responseString, null, 2));

};


exports.sendGetRecordsResponse = (res, err, data) => {

    let responseString;

    if (err) {
        responseString = {
            success: false,
            data: [],
            error: {
                message: err.message
            }
        }
    } else {
        responseString = {
            success: true,
            data: data
        }
    }
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(responseString, null, 2));

};


exports.sendGetRecordResponse = (res, err, data) => {

    let responseString;

    if (err) {
        responseString = {
            success: false,
            data: {},
            error: {
                message: err.message
            }
        }
    } else {
        responseString = {
            success: true,
            data: data
        }
    }
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(responseString, null, 2));

};