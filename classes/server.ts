import express from 'express'

export default class Server{
    public app: express.Application;
    public port:any = process.env.PORT || 3000;

    constructor(){
        this.app = express();
    }

    Start(callback:Function){
        this.app.listen(this.port,callback());
    }
}