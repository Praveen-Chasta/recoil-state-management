import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <>
        <Link to="/create">Create</Link>
        <Link to="/cards">Cards</Link>
    </>

  )
}

export default Navbar