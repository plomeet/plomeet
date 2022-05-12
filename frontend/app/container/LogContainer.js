import { connect } from 'react-redux'
import App from '../components/record/App'
import * as actions from '../actions/action'


const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => {
    return {

    }
}

const RecordContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default RecordContainer;