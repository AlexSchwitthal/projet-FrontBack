export class Tweet {
    constructor(
        public _id: any, 
        public content: string, 
        public created_at: Date, 
        public creator_id: any,
        public likes: Array<any>
    ){}
}
