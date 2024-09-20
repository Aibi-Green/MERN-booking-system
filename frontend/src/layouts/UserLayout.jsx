import UserHeader from "../components/UserHeader.jsx";
import PropTypes from 'prop-types'

function UserLayout({ children }) {
  return (<>
    <UserHeader />
    {children}
  </>)
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserLayout