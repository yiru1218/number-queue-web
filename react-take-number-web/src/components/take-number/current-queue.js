import "./queue-data.css";
import React from 'react';
import reloadImg from './image/reload.png';

const CurrentQueue = (props) => {

    return (
        <div className="current-queue-data">
            <div className="top">
                <p>目前號碼</p>
            </div>
            <div className="content">
                <p className="current">{(props.currentNumber === 0) ? `準備中` : props.currentNumber}</p>
                <p className="bottom">目前等候: {props.waitLineNumber} 人</p>
            </div>
            <div className="footer text-muted">
                最後更新: {props.currentTime}
                <img className="reloadImg" alt="reload" onClick={props.getQueueData} src={reloadImg} />
            </div>
        </div>
    )
};

export default CurrentQueue;

// const TakeNumber = (props) => {
//     const [currentNumber, setCurrentNumber] = useState(null);
//     const [waitLineNumber, setWaitLineNumber] = useState(null);
//     const [currentTime, setCurrentTime] = useState(null);

//     // 參考資料 https://ithelp.ithome.com.tw/articles/10224270
//     // useEffect 這個方法的參數中需要帶入一個函式，而這個函式會在「畫面渲染完成」後被呼叫
//     useEffect(() => {
//         getWaitData();
//     }, []);

//     // 取得更新時間
//     const time = new Date();
//     const options = { hour: 'numeric', minute: 'numeric' };
//     // let timeString = "";

//     const getWaitData = () => {
//         // timeString = time.toLocaleTimeString();
//         // 參考資料 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
//         setCurrentTime(time.toLocaleTimeString(undefined, options));

//         axios.get(Current_Number_URL)
//             .then((res) => {
//                 // console.log(res.data.currentNumber);
//                 setCurrentNumber(res.data.currentNumber);
//             });

//         axios.get(Wait_Line_Number_URL)
//             .then((res) => {
//                 setWaitLineNumber(res.data.waitNumber);
//             });

//         console.log('data update');

//     };

//     return (
//         <div>
//             <div className="take-number">
//                 <div className="top">
//                     <p>目前號碼</p>
//                 </div>
//                 <div className="content">
//                     {currentNumber}
//                     <p>目前等候人數 {waitLineNumber}</p>
//                 </div>
//                 <div className="bottom">
//                 </div>
//                 <div className="footer text-muted">
//                     最後更新: {currentTime}
//                     <img className="reloadImg" alt="reload" onClick={getWaitData} src={reloadImg} />
//                 </div>

//             </div>
//         </div>
//     );
// };

