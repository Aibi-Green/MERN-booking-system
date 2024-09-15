import Header from "../components/Header.jsx";
import PropTypes from 'prop-types'

function UserLayout({ children }) {
  return (<>
    <Header />
    {children}
  </>)
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserLayout