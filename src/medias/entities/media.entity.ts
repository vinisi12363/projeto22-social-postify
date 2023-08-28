export class Media {
    private _id:number;
    private _tittle:string;
    private _username:string; 
    
    constructor(id: number, tittle: string, username: string){
        this._id = id;
        this._tittle = tittle;
        this._username = username;
    }

    public get getPostData() {
        return  {
            id: this._id,
            tittle: this._tittle,
            username: this._username
        }
    }

}
