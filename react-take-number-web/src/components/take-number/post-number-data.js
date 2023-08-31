import "./queue-data.css";
import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';
import axios from "axios";

const PostNumber = (props) => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = event => {
        axios.post('http://localhost:8000/post-number', {
            name: inputValue,
            number: props.nextNumber
        });

        navigate({
            pathname: '/waitline',
            search: `?name=${inputValue}&number=${props.nextNumber}`
        });

        // Form submit 不刷新頁面
        event.preventDefault();

        // Form submit 後移除 input value
        setInputValue('');

        // 刷新目前號碼
        props.getQueueData();
    };

    // 參考資料 https://www.jiyik.com/tm/xwzj/web_1845.html
    return (
        <div className='take-number'>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Group controlId='formName'>
                    <Form.Control 
                        placeholder='Enter your name' 
                        autoComplete="off" 
                        value={inputValue}
                        onChange={event => setInputValue(event.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary"
                    className="mx-3"
                    onClick={event => {props.handleTakeNumber()}}
                    style={{ height: "38px", weight: "450px" }}
                    type="submit">
                    抽一張
                </Button>
            </Form>

        </div>
    );
}

export default PostNumber;