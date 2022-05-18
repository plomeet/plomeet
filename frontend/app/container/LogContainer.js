import { connect } from 'react-redux'
import App from '../components/record/App'
import * as actions from '../actions/action'


const mapDispatchToProps = dispatch => {
    return {
        saveLogs: savedLogs => dispatch(actions.saveLogs(savedLogs)),
        setListMonth: listMonth => dispatch(actions.setListMonth(listMonth)),
    }
}

const mapStateToProps = state => {
    return {
        firstPlogging: state.firstPlogging,
    }
}

const RecordContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default RecordContainer;