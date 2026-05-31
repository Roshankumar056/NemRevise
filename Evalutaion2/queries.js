const Post = require("./models/Post");


//MongoDb Queries 
//Q1
async function postsMoreThan10Likes() {
  return Post.find(
    { likes: { $gt: 10 } },
    { title: 1, likes: 1, createdAt: 1 },
  ).sort({ likes: -1 });
}

//Q2
async function gmailUsers() {
    return Post.find({email:/@gamil\.com$/i,role:"user"})   
}
//Q3
async function  nodeOrMongoPost() {
    return Post.find({tags:{$in:[/nodejs/i,/mongodb/i],}})
}
//Q4
async function  incrementLikes(authorId) {
    return Post.updateMany({
        author:authorId
    },
{$inc:{likes:1}})
}
//Q5

async function  deleteOldPosts() {
    const date=new Date()
    date.setDate(date.getDate()-30)   
    return Post.deleteMany({
        likes:0,
        createdAt:{$lt:date}
    })
}

///AggreGation PipleLine

async function postCountPerAuthor () {
    return Post.aggreate([
        {$group:{_id:"$author",totalPosts:{$sum:1}}},
        {$lookup:{
            from:"users",
            localField:"_id",
            foreignField:"_id",
            as:"author"
        }},
        {
            $project:{
                totalPosts:1,
                authorName:{
                    $arrayElemAt:[
                        "$author.name",0,
                    ]
                }
            }
        }
    ])
}



///AggreGation PipleLine 2

async function top3AuthorsByLikes() {
    return Post.aggregate([
        {
            $group:{
                _id:"$author",
            }
        }
    ])
}