import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import MapSvg from '../icons/map.svg';
import TimeSvg from '../icons/timer.svg';
import SunSvg from '../icons/weather/sun.svg'


const PloggingStatusBar = ({ mm = 0, ss = 0, distSum, isPlogging, setTimeSum, showPloggingEndPage, timeSumString }) => {
  const layout = useWindowDimensions();
  const countInterval = useRef(null);
  const [minutes, setMinutes] = useState(parseInt(mm));
  const [seconds, setSeconds] = useState(parseInt(ss));

  useEffect(() => {
    countInterval.current = setInterval(() => {
      if (isPlogging) {
        if (parseInt(seconds) >= 0) {
          setSeconds(parseInt(seconds) + 1);
        }
        if (parseInt(seconds) === 59) {
          setMinutes(parseInt(minutes) + 1);
          setSeconds(0);
        }
      }
    }, 1000);
      return () => {
      clearInterval(countInterval.current);
    };
  }, [minutes, seconds, isPlogging]);

  useEffect(() => {
    if (showPloggingEndPage) { 
      setTimeSum(minutes + ":"+ seconds);
    }
  }, [showPloggingEndPage])

    return (
      <PloggingStatusBarBlock width={layout.width}>
        <View style={styles.statusView}>
          <MapSvg width={20} height={20} fill={"#FFF"} />
          <Text style={styles.statusText}>{distSum}km</Text>
        </View>
        <View style={styles.statusView}>
          <TimeSvg width={20} height={20} fill={"#FFF"} /> 
          <Text style={styles.statusText}>
            {timeSumString}
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds }</Text>
        </View>   
        <View style={styles.statusView}>
          <SunSvg width={20} height={20} fill={"#FFF"} /> 
          <Text style={styles.statusText}>18℃</Text>
        </View>

        </PloggingStatusBarBlock>
  );
};

export default PloggingStatusBar;


const styles = StyleSheet.create({
  statusView: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: { 
    marginLeft: 10
  }
})

const PloggingStatusBarBlock = styled.View`
  display: flex;
  flex-direction: row;
  width: ${props => props.width}px;
  height: 72px;
  background-color: #ffffff;
  padding: 26px 20px 26px 20px;
`

// const ProgressBarBlock = styled.View`
//   height: 8px;
//   flex-direction: row;
//   width: ${props => props.width - 50}px;
//   background-color: #ffffff;
//   border-radius: 10px;
// `;

 