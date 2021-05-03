const {MongoClient} = require('mongodb');
const { assert } = require('node:console');

 async function main(){

    const url = "mongodb+srv://admin:admin@apwprojectcluster.amx2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const dbName = 'APWProject';
    const client = new MongoClient(url);

    var db;
    var users;
    var boards;
    var posts;
    var comments;

    try {
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connected to server succesfully!")
        })
    
        //connect to correct DB 
        db = client.db("APWProject");

        //create a var for each collection in the db
        users = db.collection("users")
        posts = db.collection("posts")
        boards = db.collection("boards")
        comments = db.collection("comments")
     
    } catch (e) {
        console.error(e);
    }
}

function insertUser(object){
    console.log("HERE")

    users.insertOne({
        firstName: object[0],
        lastName: object[1],
        email: object[2],
        username: object[3],
        password: object[4],
        posts: new Array,
        comments: new Array
    })

    console.log("INSERTED NEW USER");
}

function getUser(object){
    user = object[0];
    Ruser = users.getUser(user.id);
    return Ruser;
}

function createPost(object){
    posts.insertOne({
        user: getUser(object[0]),
        titles: object[1],
        text: object[2],
        subreddit: object[3]
})

function createComment(object){
    comments.insertOne({
        user: getUser(object[0]),
        text: object[1]
    })
}
};

function createSub(object){
    boards.insertOne({
        name: object[0],
        posts: new Array 
    })
};

module.exports = db.insertUser;
