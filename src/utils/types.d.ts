//label 标签
class Label {
    public id:number
    public name:string
    public color:string
    public articles:string
    public constructor(id:number,name:string,color:string,articles:string){
        this.id = id
        this.name = name
        this.color = color
        this.articles = articles
    }
}
//library 知识库
class Library {
    public id:number
    public name:string
    public icon:string
    public count:number
    public constructor(id:number,name:string,icon:string,count:number){
        this.id = id
        this.name = name
        this.icon = icon
        this.count = count
    }
}
class Res {
    public code:number
    public success:boolean
    public data:any
    public constructor(code:number,success:boolean,data:BlogData){
        this.code = code
        this.success = success
        this.data = data
    }
}

class BlogData {
    public id:number
    public title:string
    public library:string
    public libraryId:number
    public libraryIcon:string
    public labels:Array<Label>
    public publicTime:string
    public updateTime:string
    public read:number
    public commentNum:number
    public comments:any
    public content:string
    public commentable:boolean
    public constructor(id:number,title:string,library:string,libraryId:number,libraryIcon:string,labels:Array<Label>,publicTime:string,updateTime:string,read:number,commentNum:number,comments:any,content:string,commentable:boolean){
        this.id = id
        this.title = title
        this.library = library
        this.libraryId = libraryId
        this.libraryIcon = libraryIcon
        this.labels = labels
        this.publicTime = publicTime
        this.updateTime = updateTime
        this.read = read
        this.commentNum = commentNum
        this.comments = comments
        this.content = content
        this.commentable = commentable
    }
}

export {
    Label,
    Library,
    Res,
    BlogData
}