// 透過 dotenv 可以取得專案根目錄底下的 .env 檔案
require('dotenv').config();
// 1. 引入express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // 處理資料格式，將其轉型別成 JSON

/* MongoDB 是開源的 NoSQL 資料庫，不需先制定每張資料表的結構 
    資料存放區 Collection ( SQL 為 Table )
    資料庫名稱 Database
*/
const { MongoClient, ServerApiVersion } = require('mongodb-legacy');
// 使用環境變數
// const mongoUri = process.env.MONGO_URI;
const mongoUri = process.env['MONGO_URI'];
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("number_queue").collection("customers");

// 2. 建立 app 對象
const app = express();
// 不加這個會跑錯 => has been blocked by CORS policy
app.use(cors());
app.use(bodyParser.json());

// 重啟 server 就清空前面儲存的 data
collection.deleteMany({});

// get + post: https://cnodejs.org/topic/50a333d7637ffa4155c62ddb
class Queue extends Array {
    // 加進 queue
    // push 加進尾端 unshift 方法會添加一個或多個元素至陣列的 開頭 ，並且回傳陣列的新長度。
    enqueue(val) {
        // this.push(val); 因為希望 array 顯示像 queue 所以用下面的方法
        this.unshift(val);
    }

    // 刪除 queue 尾端的值
    // shift() 會移除並回傳陣列的第一個值
    // pop() 會移除並回傳最後一個陣列值
    // 後臺管理目前號碼 -> dequeue
    dequeue() {
        // return this.shift(); 因為希望 array 顯示像 queue 所以用下面的方法
        return this.pop();
    }

    // 目前號碼
    peek() {
        return this[this.length - 1];
    }

    isEmpty() {
        return this.length === 0;
    }
}

// 號碼牌 剛啟動 server 設為 0
let number = 0;
let currentNumber = 0;
const queue = new Queue();

// 3. 建立 API 規則
app.get('/', (req, res) => {
    // 设置响应
    res.send('hello express');
});

// 抽號碼牌
app.get('/take-number', (req, res) => {
    number++;
    queue.enqueue(number);
    // console.log(queue);
    res.json({
        queue: queue
    })
});

// 目前號碼
app.get('/current-number', (req, res) => {
    if (queue.isEmpty()) {
        // console.log(currentNumber);
        res.json({
            currentNumber: currentNumber
        })
    } else {
        res.json({
            currentNumber: queue.peek() - 1
        })
    }
});

app.get('/next', (req, res) => { 
    if (queue.isEmpty() === false) {
        queue.dequeue();
        currentNumber++;
        collection.deleteOne({number: currentNumber}, (err) => {
            if(err) throw err;
        });
        console.log(`next ${currentNumber}`);
        res.json({
            currentNumber: currentNumber
        })
    }
});

app.get('/wait-number', (req, res) => {
    res.json({
        waitNumber: queue.length
    })
});

app.get('/next-number', (req, res) => {
    if(queue.isEmpty() === true) {
        if(currentNumber === 0) {
            res.json({
                nextNumber: 1
            })
        }else{
            res.json({
                nextNumber: currentNumber
            })
        }
        
    }else{
        res.json({
            nextNumber: queue[0] + 1
        })
    }
});

// 拿資料庫目前排隊的 data
app.get('/current-data', (req, res) => {
    // 不要 return id
    // collection.find({}, {projection:{ _id: 0 }}).toArray((err, dataRes) => {
    //     if(err) throw err;
    //     res.json(dataRes);
    // });
    collection.find({}).toArray((err, dataRes) => {
        if(err) throw err;
        res.json(dataRes);
    });
});

// POST API 路徑為/wait-commit expressjs 取參數的方法之一 req.body
app.post('/post-number', (req, res) => {
    // 顯示 clinet 端傳送過來的 JSON
    collection.insertOne(req.body, (err, res) => {
        if(err) throw err;
    });
    console.log(req.body);
    res.send('ok');
    
});


// 4. 監聽 port 並啟動 server 

app.listen(8000, (err) => {
    if(err) console.log(err);
    console.log("api is running on port 8000");
});

// client.connect(err => {
//     if (err) throw err;
//     // 連線資料庫
//     const db = client.db("number_queue");
//     // 建立一筆資料
//     let obj = { name: "Company Inc", number: "Highway 37" };
//     db.collection("number_queue").insertOne(obj, (err, res) => {
//         if (err) throw err;
//         console.log("1 document inserted");
//         // 關閉連線
//         db.close();
//     });
// });

// client.connect(err => {
//   const collection = client.db("number_queue").collection("number_queue");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = app;

// 參考資料 https://jw310.github.io/2020/04/15/nodejs-mongodb-restfulapi/#Get-API-%E5%8F%96%E5%BE%97%E8%B3%87%E6%96%99