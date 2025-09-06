const mongoose = require("mongoose")
const {Schema} = mongoose;

const ProblemSchema = new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Difficulty:{
        type:String,
        enum:['easy','medium','hard','Everest'],
        required:true
    },
    tags:{
        type:String,
        enum: ['Array','String','Hashing','Two Pointers','Sliding Window','Stack','Queue','Linked List','Recursion','Backtracking','Greedy','Binary Search','Sorting','Heap','Graph','DFS','BFS','Union Find','Topological Sort','Dynamic Programming','Bit Manipulation','Math','Number Theory','Combinatorics','Geometry','Matrix','Simulation','Trie','Segment Tree','Fenwick Tree','Range Queries','Binary Tree','BST','String Matching','Game Theory','Design','Implementation','Brute Force'],
        required:true
    },
    VisibleTestCases:[
        {
            Input:{
                type:String,
                required:true
            },
            Output:{
                type:String,
                required:true
            },
            Explanation:{
                type:String,
                required:true
            }
        }
    ],
    HiddenTestCases:[
        {
            Input:{
                type:String,
                required:true
            },
            Output:{
                type:String,
                required:true
            }
        }
    ],
    StartCode:[
        {
            Langugage:{
                type:String,
                required:true
            },
            BoilerPlate:{
                type:String,
                required:true
            }
        }
    ],
    ProblemCreator:{
        type:Schema.Types.ObjectId,
        ref:'user', //collection to refer
        required:true
    }

})

const Problem = mongoose.model('problem',ProblemSchema);
module.exports = Problem;