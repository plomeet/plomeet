import { connect } from 'react-redux'
import App from '../components/plogging/App'
import * as actions from '../actions/action'


const mapDispatchToProps = dispatch => {
    return {
        setDistSum: distSum => dispatch(actions.setDistSum(distSum)),
        handleIsPlogging: isPlogging => dispatch(actions.IsPlogging(isPlogging)),
    }
}

const mapStateToProps = state => {
    return {
        distSum: state.distSum,
        isPlogging: state.isPlogging
    }
}

const PloggingContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default PloggingContainer;