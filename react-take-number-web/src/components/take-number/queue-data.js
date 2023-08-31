import "./queue-data.css";
import {
    Current_Number_URL,
    Wait_Line_Number_URL,
    Take_Number_URL,
    Next_Number_URL
} from "../../api";
import PostNumber from "./post-number-data";
import CurrentQueue from "./current-queue";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import SelfNumber from '../self-number/self-number';
import {
    Routes,
    Route
} from 'react-router-dom';

const GetQueueData = () => {
    const [currentNumber, setCurrentNumber] = useState(null);
    const [waitLineNumber, setWaitLineNumber] = useState(null);
    const [nextNumber, setNextNumber] = useState(null);

    // 取得更新時間
    const options = { hour: 'numeric', minute: 'numeric' };
    let time = new Date().toLocaleTimeString('zh-TW', options);
    const [currentTime, setCurrentTime] = useState(time);

    // 參考資料 https://ithelp.ithome.com.tw/articles/10224270
    // useEffect 這個方法的參數中需要帶入一個函式，而這個函式會在「畫面渲染完成」後被呼叫
    useEffect(() => {
        getQueueData();
    }, []);

    const getQueueData = () => {
        time = new Date().toLocaleTimeString('zh-TW', options);
        // 參考資料 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        setCurrentTime(time);

        axios.get(Current_Number_URL)
            .then((res) => {
                // console.log(res.data.currentNumber);
                setCurrentNumber(res.data.currentNumber);
            });

        axios.get(Wait_Line_Number_URL)
            .then((res) => {
                setWaitLineNumber(res.data.waitNumber);
            });

        axios.get(Next_Number_URL)
            .then((res) => {
                setNextNumber(res.data.nextNumber);
            });

        // console.log(`${time.toLocaleTimeString('zh-TW', options)} ${currentTime} 資料已更新!`);
    };

    const handleTakeNumber = () => {
        axios.get(Take_Number_URL)
            .then((res) => {
                console.log("抽一張號螞牌!");
            });

        axios.get(Next_Number_URL)
            .then((res) => {
                setNextNumber(res.data.nextNumber);
            });
    };

    return (
        <div className="queue-data">
            <PostNumber
                currentNumber={currentNumber}
                waitLineNumber={waitLineNumber}
                nextNumber={nextNumber}
                handleTakeNumber={handleTakeNumber}
                getQueueData={getQueueData}
            />
            <CurrentQueue
                currentNumber={currentNumber}
                waitLineNumber={waitLineNumber}
                currentTime={currentTime}
                getQueueData={getQueueData}
            />
            <Routes>
                <Route path="waitline" element={<SelfNumber />} />
            </Routes>
        </div>
    );
};

export default GetQueueData;