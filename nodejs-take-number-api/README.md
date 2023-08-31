## Class

### Queue
繼承自Array的類，實現了基本的隊列操作。

方法
* `enqueue(val)`

將值加入隊列，將值添加至隊列的開始位置。

* `dequeue()`

刪除隊列尾端的值，並返回被刪除的值。

* `peek()`

查看隊列中目前最後一個值，而不對隊列做任何更改。

* `isEmpty()`

檢查隊列是否為空。

## 管理號碼牌

### `GET /take-number`

抽取一個新的號碼牌。

#### Response
```json
{
    "queue": [1, 2, 3, ...]
}
```
### `GET /current-number`

取得目前正在處理的號碼牌。

#### Response
```json
{
    "currentNumber": 1
}
```
### `GET /next`

處理下一個號碼牌並移出隊列。

#### Response
```json
{
    "currentNumber": 2
}
```
### `GET /wait-number`

取得目前等待的號碼牌數量。

#### Response
```json
{
    "waitNumber": 5
}
```
### `GET /next-number`

取得下一個待處理的號碼。

#### Response
```json
{
    "nextNumber": 3
}
```
## 資料庫管理

### GET /current-data

取得目前排隊的資料。

#### Response
```json
[
    {
        "name": 'Name1',
        "number": 1,
        "mongodb_id": new ObjectId("")
    },
    {
        "name": 'Name2',
        "number": 2,
        "mongodb_id": new ObjectId("")
    },
    // ...
]
```
### `POST /post-number`

將號碼牌資料提交至資料庫。

#### Request Body

```json
[
    {
        "name": 'Name1',
        "number": 1,
        "mongodb_id": new ObjectId("")
    },

]
```
