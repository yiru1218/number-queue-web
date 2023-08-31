import "./current-waitline.css"
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import reloadImg from './image/reload.png';

const CurrentWaitLine = () => {
    const [currentNumber, setCurrentNumber] = useState(null);
    const [waitLineNumber, setWaitLineNumber] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    const Current_Number_URL = "http://127.0.0.1:8000/current-number";
    const Wait_Line_Number_URL = "http://127.0.0.1:8000/wait-number";
    const Next_Number_URL = "http://127.0.0.1:8000/next";

    // 參考資料 https://ithelp.ithome.com.tw/articles/10224270
    // useEffect 這個方法的參數中需要帶入一個函式，而這個函式會在「畫面渲染完成」後被呼叫
    useEffect(() => {
        getWaitData();
    }, [])

    // 取得更新時間
    const time = new Date();
    const options = { hour: 'numeric', minute: 'numeric' };
    // let timeString = "";

    const getWaitData = () => {
        // timeString = time.toLocaleTimeString();
        // 參考資料 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        setCurrentTime(time.toLocaleTimeString(undefined, options));

        axios.get(Current_Number_URL)
            .then((res) => {
                // console.log(res.data.currentNumber);
                setCurrentNumber(res.data.currentNumber);
            });

        axios.get(Wait_Line_Number_URL)
            .then((res) => {
                setWaitLineNumber(res.data.waitNumber);
            });
    };

    const clickToAddNumber = () => {
        setCurrentTime(time.toLocaleTimeString(undefined, options));
        
        axios.get(Next_Number_URL)
            .then((res) => {
                setCurrentNumber(res.data.currentNumber);
            });

        axios.get(Wait_Line_Number_URL)
            .then((res) => {
                setWaitLineNumber(res.data.waitNumber);
            });

    };

    return (
        <div className="take-number">
            <div className="top">
                <p>
                    目前號碼 {currentNumber}
                    <br />
                    目前等候人數 {waitLineNumber}
                </p>
            </div>
            <div className="bottom">
                <Button variant="primary" onClick={clickToAddNumber}>下一號</Button>
            </div>
            <div className="footer text-muted">
                最後更新時間: {currentTime}
                <img className="reloadImg" alt="reload" onClick={getWaitData} src={reloadImg} />
            </div>
        </div>

    );
};

export default CurrentWaitLine;