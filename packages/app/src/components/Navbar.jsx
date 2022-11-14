import BsNavbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export const Navbar = () => {
  return (
    <BsNavbar expand='lg' variant='dark' className='bg-gradient my-navbar'>
      <Container fluid className='max-w-1200'>
        <BsNavbar.Brand className='brand-text'>React Test App</BsNavbar.Brand>
      </Container>
    </BsNavbar>
  )
}
