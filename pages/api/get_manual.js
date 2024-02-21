import {setCookie} from "../../src/utils/cookie";

const fs = require('fs');

export default function handler(req, res) {
    if (req.method === 'GET') {
        let token = req.cookies.access_token;
        if (token) {
            try {
                let manual = req.query.manual;
                fs.readFile(manual, 'utf8', function (err, data){
                    res.send(data);
                });
            } catch (err) {
                console.error(err.message);
                setCookie(res, 'access_token', null, { httpOnly: true });
                res.writeHead(302, {location: "/login"});
                res.end();
            }
        } else{
            res.writeHead(302, {location: "/login"});
            res.end();
        }
    }
}