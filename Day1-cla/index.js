var isEven=require("is-even")
console.log(isEven(112));





















// const fs=require("fs")
// console.log(process.argv[2]);

// let command=process.argv[2]
// let filePath=process.argv[3]
// if(command==="read"){
//     let data=fs.readFileSync(filePath,"utf-8")
//     console.log(data);
    
// }
// if(command==="write"){
//     let data1=fs.writeFileSync(filePath,"This is data")
//     console.log("written");
    
// }
// if(command==="write"){
//     let data=process.argv[4]
//     let data1=fs.writeFileSync(filePath,data)
//     console.log(`written at ${filePath}`);
    
// }

// if(command==="append"){
//       let data=process.argv[4]
//     let data1=fs.appendFileSync(filePath,data)
//     console.log(`written at ${filePath}`);
    
// }

//Read a file
//1. Async Read
//2. Sync Read

















// console.log("This is before Read");
// let data=fs.readFileSync("./data.txt","utf-8")
// console.log(data);

// fs.readFile("./data.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log("Error in read");
        
//     }else{
//         console.log("data found");
//         console.log(data);
        
        
//     }
// })

// fs.writeFileSync("./data.txt","hy i am Roshan")
// fs.appendFileSync("./data.txt","\n hy i am Roshan")
// const data2=fs.unlinkSync("./data.txt","\n This is first message")
// console.log("hlo");

// fs.writeFileSync("./data.txt","My Name Is Roshan")
// console.log("Written");

// const data2=fs.unlinkSync("./data.txt","\n This is first message")
// console.log("hlo");