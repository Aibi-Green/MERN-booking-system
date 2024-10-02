import PropTypes from 'prop-types'
import NormHeader from '../components/NormHeader'
import NormFooter from '../components/NormFooter'

function NormLayout({children, noFooter}) {
  return (<>
    <NormHeader />
    {children}
    {
      !noFooter && <NormFooter />
    }
  </>)
}

NormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  noFooter: PropTypes.bool
}

export default NormLayout