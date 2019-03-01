//

function router(req, res) {
    res.setHeader('content-type', 'application/json');
    let promise = new Promise((resolve, reject) => {
        if (req.method != 'POST') return reject({ stc: 405 });
        const routeTo = req.url.split('/')[2];
        switch (routeTo) {


            case 'login': resolve({ message: 'login route selected' }); break;
            default: reject({ stc: 404 });
        }


    });








    let body = {};
    promise
        .then(resObj => {
            res.statusCode = resObj.stc || 200;
            body = resObj;
        })


        .catch((err) => {
            res.statusCode = err.stc || 500;
            body = { statusCode: res.statusCode, status: 'error occured' };
            switch (res.statusCode) {
                case 405: body.message = 'Send request using POST'; break;
                case 404: body.message = err.message || 'check docs for existing routes'; break;

                default: body.message = err.message;
            }
        })
        .then(() => res.end(JSON.stringify(body)));
}
module.exports = { router };