import BsTable from 'react-bootstrap/Table'

export const Table = ({ filesData }) => {
  return (
    <BsTable responsive='sm' striped bordered hover>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>

      <tbody>
        {filesData.map(file => {
          return (
            <tr key={file.hex}>
              <td>{file.file}</td>
              <td>{file.text}</td>
              <td>{file.number}</td>
              <td>{file.hex}</td>
            </tr>
          )
        })}
      </tbody>
    </BsTable>
  )
}
