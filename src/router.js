//
function router(req, res) {
    res.setHeader('content-type', 'application/json');
    let promise = new Promise((resolve, reject) => {


        if (req.method != 'POST') return reject({ stc: 405 });
        return resolve(req);
    });


    let body = {};
    promise
        .then(resObj => {
            res.statusCode = resObj.stc || 200;
            body = JSON.stringify(resObj);
            res.write(body);
        })
        .catch((err) => {
            res.statusCode = err.stc || 500;
            body.statusCode = res.statusCode;
            body.status = 'error occured';

            switch (res.statusCode) {
                case 405: body.message = 'Send request using POST'; break;
                default: body.message = err.message;
            }
            res.write(JSON.stringify(body));
        })
        .then(() => res.end());
}


module.exports = { router };