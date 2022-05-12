import React, { Component, Node, useState } from 'react';
import 'react-native-gesture-handler';
import { Chip, ToggleButton } from 'react-native-paper';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { StyleSheet, Modal, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';



const openMeeting3 = () => {
  const navigation = useNavigation();

  // Modal을 표시하거나 숨기기 위한 변수 
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [selectedDate, setSelectedDate] = useState('모임 날짜 선택');
  const [selectedTime, setSelectedTime] = useState('모임 시간 선택');
  const current= getToday();

  function SelectedTime(time){
    setSelectedTime(time);
    setVisibleTimer(false);
  }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>모임 인원</Text>
        <TextInput
          // value={this.state.myTextInput}
          style={styles.input}
          placeholder="모임의 최대인원을 입력해주세요."
          keyboardType='numeric'
          autoFocus
          maxLength={3}
          autoCapitalize='none'
          returnKeyType='next'
          // onChangeText={this.onChangeInput}
        />
        <Text style={[styles.title, {marginTop:40}]}>모임 날짜</Text>

        <Modal animationType="slide" 
          transparent={false} 
          visible={visibleCalendar}> 
          <View style={{ 
            flex: 1, 
            marginHorizontal : 30,
            justifyContent: 'center', 
            alignItems: 'center'}}>

            <DatePicker
            options={{
              mainColor: '#1BE58D',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="calendar"
            configs={{
              dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
              monthNames: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ],
            }}
            minimumDate= {current}
            style={{ borderRadius: 10 }}
            onSelectedChange={date => setSelectedDate(date)}
            />
            {/* Modal 다이얼로그 숨기기 */} 
            <TouchableOpacity activeOpacity={0.8} style={[styles.closeButton, {paddingHorizontal:30}]} onPress={() => setVisibleCalendar(false)}><Text style={styles.text}>선택</Text></TouchableOpacity>

          
          </View> 
        </Modal>

        <View  style={[styles.row, {marginLeft:30}, {marginBottom:10}, {marginTop:20}]}>
          <Chip style={{marginRight:10}} onPress={()=> setVisibleCalendar(true)} icon="calendar" mode="outlined" selectedColor='#232732'> {selectedDate}</Chip>
        </View>

        <Text style={[styles.title, {marginTop:40}]}>모임 시간</Text>
        <View  style={[styles.row, {marginLeft:30}, {marginBottom:10}, {marginTop:20}]}>
          <Chip style={{marginRight:10}} onPress={()=> setVisibleTimer(true)} icon="clock" mode="outlined" selectedColor='#232732'> {selectedTime}</Chip>
        </View>

        <Modal animationType="slide" 
          transparent={false} 
          visible={visibleTimer}> 
          <View style={{ 
            flex: 1, 
            marginHorizontal : 30,
            justifyContent: 'center', 
            alignItems: 'center'}}>

            <DatePicker
            options={{
              mainColor: '#1BE58D',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="time"
            configs={{
              hour: '시간',
              minute: '분',
              timeSelect: '선택'
            }}
            minuteInterval={10}
            style={{ borderRadius: 30 }}
            onTimeChange={date => SelectedTime(date)}
            
            />

          
          </View> 
        </Modal>

        <Text style={[styles.title, {marginTop:40}]}>준비물</Text>
        <View style={[styles.row, {marginLeft:30}, {marginBottom:10}, {marginTop:20}]}>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>쓰레기 봉투</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>집게</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>물티슈</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>면장갑</Text></TouchableOpacity>
        </View>
        <View style={[styles.row, {marginLeft:30}, {marginBottom:10}]}>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>운동화</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>물</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>도시락</Text></TouchableOpacity>
        </View>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('OpenMeeting4')}>
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  input: {
    marginHorizontal: 30,
    fontSize: 15,
    borderBottomWidth: 1
  },
  title: {
    marginTop: 30,
    color: '#313333',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 20,
    marginHorizontal: 30,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical:'top',
    padding: 10,
    height: 150
  },
  button: {
    height: 55,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    height: 42,
    borderRadius : 8,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  chipOver: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 30
  },
  chip: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 30
  },
  text: {
    fontSize: 18,
    color: "#fff"
  },
  
});

export default openMeeting3;