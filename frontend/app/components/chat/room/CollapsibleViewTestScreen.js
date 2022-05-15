import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import CollapsibleView from './CollapsibleView';

// 린스타트업 개념 출처: https://ko.wikipedia.org/wiki/린스타트업
const SECTION_TITLE = "자세한 정보"
const CONTENT = "린 스타트업(Lean Startup)은 제품이나 시장을 발달시키기 위해 기업가들이 사용하는 프로세스 모음 중 하나로서, 애자일 소프트웨어 개발과, 고객 개발(Customer Development), 그리고 기존의 소프트웨어 플랫폼 (주로 오픈소스) 등을 활용한다.\n\n린 스타트업은 우선 시장에 대한 가정(market assumptions)을 테스트하기 위해 빠른 프로토타입(rapid prototype)을 만들도록 권한다. 그리고 고객의 피드백을 받아 기존의 소프트웨어 엔지니어링 프랙티스(폭포수 모델 같은)보다 훨씬 빠르게 프로토타입을 진화시킬 것을 주장한다. 린 스타트업에서 하루에도 몇 번씩 새로운 코드를 릴리즈하는 것은 드문 일이 아니다. 이를 위해서 지속적 배포(Continuous Deployment)라는 기법을 사용한다.\n\n린 스타트업은 때로 린 사고방식(Lean Thinking)을 창업 프로세스에 적용한 것으로 설명되기도 한다. 린 사고방식의 핵심은 낭비를 줄이는 것이다. 린 스타트업 프로세스는 고객 개발(Customer Development)을 사용하여, 실제 고객과 접촉하는 빈도를 높여서 낭비를 줄인다. 이를 통해 시장에 대한 잘못된 가정을 최대한 빨리 검증하고 회피한다. 이 방식은 역사적인 기업가들의 전략을 발전시킨 것이다. 시장에 대한 가정들을 검증하기 위한 작업들을 줄이고, 시장 선도력(market traction)을 가지는 비즈니스를 찾는데 걸리는 시간을 줄인다. 이것을 최소 기능 제품 (Minimum Viable Product)이라고도 한다. 다른 말로는 최소 기능 셋 (Minimum Features Set) 이라고 불린다"
const INITIAL_MAX_LINE = 2;

function CollapsibleViewTestScreen (props) {
    return (
        <View  style={styles.rootContainer}>
            <CollapsibleView sectionTitle={SECTION_TITLE} content={CONTENT} maxline={INITIAL_MAX_LINE}/>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ffffff"
    }
})
export default CollapsibleViewTestScreen