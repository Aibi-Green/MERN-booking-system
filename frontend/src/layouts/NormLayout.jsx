import PropTypes from 'prop-types'
import NormHeader from '../components/NormHeader'
import NormFooter from '../components/NormFooter'

function NormLayout({children}) {
  return (<>
    <NormHeader />
    {children}
    <NormFooter />
  </>)
}

NormLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default NormLayout