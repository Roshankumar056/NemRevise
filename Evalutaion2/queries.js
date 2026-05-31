const Post = require("./models/Post");
const User = require("./models/User");


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
                totalLikes:{
                    $sum:"$likes",
                }
            }
        },
        {
            $sort:{totalLikes:-1}
        },
        {$limit:3},
        {
            $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"author"
            }
        }
    ])
}

///AggreGation PipleLine 3

async function monthlyPostActivity() {
    return Post.aggregate([
        {
            $group:{
                _id:{
                    year:{
                        $year:"$createdAt",
                    },
                    month:{
                        $month:"$createdAt"
                    }
                },count:{
                    $sum:1
                }
            }
        },{
            $sort:{
                "_id.year":1,
                "_id.month":1
            }
        }
    ])
}


///AggreGation PipleLine 4
async function tagPopularity() {
    return Post.aggregate([
        {$unwind:"$tags"},
        {$group:{
            _id:"$tags",
            count:{
                $sum:1
            }
        }},{
            $sort:{
                count:-1
            }
        }
    ])
}

///AggreGation PipleLine 5

async function authorWithNoPost(params) {
    return User.aggregate([
        {
            $lookup:{
                from:"posts",
                localField:"_id",
                foreignField:"author",
                as:"post"
            }
        },{
            $match:{
                posts:{
                    $eq:[]
                }
            }
        }
    ])
}


module.exports={
    postsMoreThan10Likes,
    gmailUsers,
    nodeOrMongoPost,
    incrementLikes,
    deleteOldPosts,
    postCountPerAuthor,
    top3AuthorsByLikes,
    monthlyPostActivity,
    tagPopularity,
    authorWithNoPost
}