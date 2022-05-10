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
        setImages: images => dispatch(actions.setImages(images)),
        setIsSave: isSave => dispatch(actions.setIsSave(isSave)),
        setPloggingPath: ploggingPath => dispatch(actions.setPloggingPath(ploggingPath)),
        resetPloggingPath: () => dispatch(actions.resetPloggingPath()),
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
        images: state.images,
    }
}

const PloggingContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default PloggingContainer;