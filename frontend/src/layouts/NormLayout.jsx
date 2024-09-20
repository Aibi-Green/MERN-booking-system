import PropTypes from 'prop-types'
import NormHeader from '../components/NormHeader'

function NormLayout({children}) {
  return (<>
    <NormHeader />
    {children}
  </>)
}

NormLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default NormLayout