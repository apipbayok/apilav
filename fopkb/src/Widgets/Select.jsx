import Form from 'react-bootstrap/Form';

export default function selectOp(props) {
  var properti = props.nilai;
  return (
    <div>
      <Form.Label>{props.judul}</Form.Label>
      <Form.Select title={props.judul} aria-label="Default select" name={props.nama} id={props.nama}>
        {properti.map(({nil, lab}, index) => <option value={nil}>{lab}</option>)}
      </Form.Select>
    </div>
  )
}
