import React, { useCallback, useState, useRef} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS
} from "react-native-reanimated";
import MIcon from 'react-native-vector-icons/MaterialIcons';

function CollapsibleView (props) {
    const { sectionTitle, content, maxLine } = props;
    const [ isEnableCollapsible, setIsEnableCollapsible ] = useState(true);
    const [ isFirst, setIsFirst ] = useState(true);
    const [ contentLineHeight, setContentLineHeight ] = useState(0);
    const [ contentLineCnt, setContentLineCnt ] = useState(0);
    const [ contentNumberOfLines, setContentNumberOfLines ] = useState(maxLine);
    const isOpen = useRef(false);
    
    const contentContainerHeight = useSharedValue(0);
    const moreButtonDeg = useSharedValue(0);

    const contentContainerAnimatedStyle = useAnimatedStyle(()=>{
        return {
            height: isFirst? undefined: contentContainerHeight.value,
        }
    }, [ isFirst ]);

    const moreButtonAnimatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [ 
                { 
                    rotate: `${moreButtonDeg.value}deg`,
                },
            ]
        }
    }, []);

    const onPress = useCallback(()=>{
        if(isOpen.current) {
            moreButtonDeg.value = withSpring(0, {});
            contentContainerHeight.value = withTiming(contentLineHeight*maxLine+5, { duration: 250 }, () => { runOnJS(setContentNumberOfLines)(maxLine) });
        } else {
            moreButtonDeg.value = withSpring(180, {});
            setContentNumberOfLines(contentLineCnt);
            contentContainerHeight.value = withTiming(contentLineHeight*contentLineCnt+5, { duration: 250 });
        }
        isOpen.current = !isOpen.current;
    }, [ contentLineCnt, contentLineHeight ]);

    const onTextLayout = useCallback((event) => {
        if(isFirst) {
            const { lines } = event.nativeEvent;

            if(lines.length >= maxLine) {
                setIsEnableCollapsible(false);
            }

            setContentLineCnt(lines.length);
            setContentLineHeight(lines[0].height);
            contentContainerHeight.value = lines[0].height*maxLine;
            setIsFirst(false);
        }
    }, [ isFirst ]);

    function popup(){
        Alert.alert("니 띄웠다ㅋ","ㅇ");
    }

    return (
        <View style={styles.rootContainer}>
            <TouchableWithoutFeedback onPress={popup} disabled={isEnableCollapsible}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTItle}>{sectionTitle}</Text>
                    <Animated.View style={moreButtonAnimatedStyle}>
                        <MIcon name="expand-more" size={30}/>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View style={[ styles.contentContainer, contentContainerAnimatedStyle]}>
                <Text style={styles.content} onTextLayout={onTextLayout} numberOfLines={isFirst? undefined: contentNumberOfLines} ellipsizeMode={"tail"}>
                    {content}
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionContainer: {
        minHeight: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTItle: {
        fontFamily: "AppleSDGothicNeo-SemiBold",
        fontSize: 18,
        lineHeight: 20,
        color: "rgb(26, 26, 26)"
    },
    contentContainer: {
        overflow: "hidden"
    },
    content: {
        fontFamily: "AppleSDGothicNeo-Regular",
        fontSize: 15,
        lineHeight: 17,
        color: "rgb(26, 26, 26)"
    }
});

export default CollapsibleView;