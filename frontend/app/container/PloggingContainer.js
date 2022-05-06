import { connect } from 'react-redux'
import App from '../components/plogging/App'
import * as actions from '../actions/action'


const mapDispatchToProps = dispatch => {
    return {
        setDistSum: distSum => dispatch(actions.setDistSum(distSum)),
        handleIsPlogging: isPlogging => dispatch(actions.IsPlogging(isPlogging)),
        handleShowEndPage: showPloggingEndPage => dispatch(actions.IsEndPage(showPloggingEndPage)),
        setStart: startTime => dispatch(actions.setStart(startTime)),
        setWeatherLoc: weatherLoc => dispatch(actions.setWeatherLoc(weatherLoc)),
        setTimeSum: timeSum => dispatch(actions.setTimeSum(timeSum)),
    }
}

const mapStateToProps = state => {
    return {
        distSum: state.distSum,
        isPlogging: state.isPlogging,
        showPloggingEndPage: state.showPloggingEndPage,
        startTime: state.startTime,
        weatherLoc: state.weatherLoc,
        timeSum: state.timeSum,
    }
}

const PloggingContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default PloggingContainer;