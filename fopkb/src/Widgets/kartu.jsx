import Card from 'react-bootstrap/Card';
export default function Kartu({backgr,judul,nilai}){
    return (
    <div>
      <Card
        bg={backgr}
        text={backgr === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-3"
      >
        <Card.Body>
          <Card.Title>{judul}</Card.Title>
          <Card.Text>
            <h2>{nilai}</h2>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    )
}
