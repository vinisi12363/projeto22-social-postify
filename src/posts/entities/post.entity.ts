export class Post {
    private _id:number;
    private _tittle:string;
    private _text:string; 
    
    constructor(id: number, tittle: string, username: string){
        this._id = id;
        this._tittle = tittle;
        this._text = username;
    }

    public get getPostData() {
        return  {
            id: this._id,
            tittle: this._tittle,
            username: this._text
        }
    }

}
