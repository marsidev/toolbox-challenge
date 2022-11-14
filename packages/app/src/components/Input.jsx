import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export const Input = ({ onChange }) => {
  return (
    <InputGroup className='mb-3' onChange={onChange}>
      <InputGroup.Text id='inputGroup-label'>Filter by file name</InputGroup.Text>
      <Form.Control aria-describedby='inputGroup-label' aria-labelledby='inputGroup-label' />
    </InputGroup>
  )
}
