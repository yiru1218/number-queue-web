import Card from 'react-bootstrap/Card';
import "./self-number.css"
import { useSearchParams } from 'react-router-dom'

const SelfNumber = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Card className='card-center text-center'>
            <Card.Header>
                尾熊號碼牌
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted text-size-small">
                    尼好 {searchParams.get('name')} 這是尼的號碼
                </Card.Subtitle>
                {/* <Card.Subtitle className="mb-2 text-muted">尾熊忙碌中 請等候叫號</Card.Subtitle> */}
                <Card.Text className="text-size-large">
                    {searchParams.get('number')}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{`尾熊忙碌中 請等候叫號><`}</Card.Footer>
        </Card>
    );
};

export default SelfNumber;