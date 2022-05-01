import { connect } from 'react-redux'
import App from '../components/plogging/App'
import * as actions from '../actions/action'


const mapDispatchToProps = dispatch => { 
    return {
        setDistSum: distSum => dispatch(actions.setDistSum(distSum))
    }
}

const mapStateToProps = state => { 
    return {
        distSum: state.distSum
    }
}
  
const PloggingContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default PloggingContainer;