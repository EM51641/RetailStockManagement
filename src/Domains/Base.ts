export abstract class DomainBase {

    private _uid: string

    constructor(uid: string){
        this._uid = uid
    }

    get Id(){
        return this._uid
    }
}


export interface TDomain extends DomainBase{}; 
