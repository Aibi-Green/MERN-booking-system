import UserHeader from "../components/UserHeader.jsx";
import PropTypes from 'prop-types'
import { useIfNoToken } from '../hooks/useIfNoToken.jsx'

function UserLayout({ children }) {
  useIfNoToken()
  
  return (<>
    <UserHeader />
    {children}
  </>)
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserLayout