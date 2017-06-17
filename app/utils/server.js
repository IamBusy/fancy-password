/**
 * Created by william on 12/05/2017.
 */
//let httpServer = require('react-native-http-bridge');
//import httpBridge from 'react-native-http-bridge';
let httpServer = require('react-native-http-server');

class Server {
    constructor() {
        this.server = null;
        this.istarted = false;
        this.stop = this.stop.bind(this);
        this.addRouter = this.addRouter.bind(this);
        this.start = this.start.bind(this);
        this.deal = this.deal.bind(this);
        this.defaultOption = {
            port: 10080,
        };
        this.router = [];
    }

    deal(request) {
        let url = request.url;
        for(let i=0;i< this.router.length;i++) {
            console.log('loop in router',this.router[i]);
            console.log(url);
            if(this.router[i].url == url ) {
                return this.router[i].server(request);
            }
        }
        return {};
    }

    start(options) {
        if( !this.istarted ) {
            let opt = {};
            Object.assign(opt,options,this.defaultOption);
            let deal = this.deal;

            httpServer.create(opt,(request, send)=> {

                let dtObj = {};
                for(let i=0;i<this.router.length;i++) {
                    if(request.url == this.router[i].url) {
                        dtObj = this.router[i].server(request);
                        break;
                    }
                }


                console.log(request);
                //let serveRes = deal(request);
                let data = JSON.stringify(dtObj);
                //Build our response object (you can specify status, mime_type (type), data, and response headers)
                let res = {};
                res.status = "OK";
                res.type = "application/json";
                res.data = data;
                res.headers = {
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type, Accept, Origin, User-Agent, Cache-Control, Keep-Alive, If-Modified-Since, If-None-Match",
                    "Access-Control-Allow-Methods": "GET, HEAD",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Expose-Headers": "Content-Type, Cache-Control, ETag, Expires, Last-Modified, Content-Length",
                    "Access-Control-Max-Age": "3000",
                    "Cache-Control": "max-age=300",
                    "Connection": "keep-alive",
                    "Content-Encoding": "gzip",
                    "Content-Length": data.length.toString(),
                    "Date": (new Date()).toUTCString(),
                    "Last-Modified": (new Date()).toUTCString(),
                    "Server": "Fastly",
                    "Vary": "Accept-Encoding"
                };

                send(res);
            });
            this.istarted = true;
            return opt;
        }
    }

    addRouter(router) {
        for(let i=0;i< this.router.length;i++) {
            if(this.router[i].url == router.url ) {
                return;
            }
        }
        this.router.push(router);
    }

    stop() {
        httpServer.stop();
    }
}
export default new Server()
