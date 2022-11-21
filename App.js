import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Text, Button, TouchableOpacity, Alert, SafeAreaView, Modal } from 'react-native';

//apk build
//eas build -p android --profile preview

const DATA = [
  {
    id: '1',
    title: '빨강',
    color: 'rgb(255,0,0)'
  },
  {
    id: '2',
    title: '파랑',
    color: 'rgb(0,0,255)'
  },
  {
    id: '3',
    title: '초록',
    color: 'rgb(0,255,0)'
  },
  {
    id: '4',
    title: '검정',
    color: 'rgb(0,0,0)'
  }
];

const intToString = (num) => {
  return String(num).padStart(2, "0");
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const App = ({ hh, mm, ss }) => {

  const [count, setCount] = useState(0); //초깃값 = 0
  const [rdColor, setRdColor] = useState(3);
  const [rdTitle, setRdTitle] = useState(getRandomInt(0, 4));

  const HH = hh ? parseInt(hh) : 0;
  const MM = mm ? parseInt(mm) : 0;
  const SS = ss ? parseInt(ss) : 0;

  const counter = useRef(HH * 60 * 60 + MM * 60 + SS);
  const interval = useRef(null);

  const [hour, setHour] = useState(intToString(HH));
  const [minute, setMinute] = useState(intToString(MM));
  const [second, setSecond] = useState(intToString(SS));
  const [disable, setDisable] = useState(false)
  const [disable_color, setDisableColor] = useState(true)
  const [ready_text, setReady] = useState('준비');
  const [vertical, setVertical] = useState(200);
  const [horizontal, setHorizontal] = useState(130);
  const [buttonColor, setBtnColor] = useState("#CCCCCC");
  const [buttonStart, setBtnStart] = useState("#000000");
  const [evaluation, setEvaluation] = useState("");

  const [visibleMoal, setVisibleModal] = useState(false);
  


  function onIncrease() {
    setCount(count + 1);
    setRdColor(getRandomInt(0, 4));
    setRdTitle(getRandomInt(0, 4));
    setVertical(getRandomInt(0, 400));
    setHorizontal(getRandomInt(0, 200));
    setReady(DATA[rdTitle].title);
  }

  function reset() {
    setVisibleModal(false)
    setCount(0);
    counter.current = 0;
    setHour(intToString(parseInt(counter.current / 3600)));
    setMinute(intToString(parseInt((counter.current % 3600) / 60)));
    setSecond(intToString((counter.current % 60)));
    setDisableColor(true);
    setDisable(false);
    setRdColor(3);
    setHorizontal(130);
    setVertical(200);
    setBtnColor("#CCCCCC");
    setBtnStart("#000000");
    setReady('준비');
  }

  function evaluation_result() {
    clearInterval(interval.current);
    (count < 10) ? (setEvaluation("Bad..")) : (counter.current < 10 ? (setEvaluation("Perfect!!!")) : (setEvaluation("Great Job!")));
    setVisibleModal(true);
  }

  function restart() {
    setDisableColor(false);
    setDisable(true);
    setCount(0);
    setVertical(getRandomInt(0, 400));
    setHorizontal(getRandomInt(0, 200));
    setBtnColor("#000000");
    setBtnStart("#CCCCCC");
    interval.current = setInterval(() => {
      counter.current += 1;

      setHour(intToString(parseInt(counter.current / 3600)));
      setMinute(intToString(parseInt((counter.current % 3600) / 60)));
      setSecond(intToString((counter.current % 60)));
    }, 1000);
  }

  function ready() {
    setReady(DATA[rdTitle].title);
  }
  return (

    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" //모달창 애니메이션 효과 slide|fade|none
        transparent={true} //Modal의 배경을 투명하게 true|false
        visible={visibleMoal} //Modal 표시 또는 숨기기
      > 
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            flex: 0.98,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderColor: '#000000',
            borderWidth: 10,
            backgroundColor: '#ffffff',
            padding: 5,
          }}>
            <Text style={{ fontSize: 50}}>결과</Text>
            <Text style={{ fontSize: 30}}>성공 횟수: {count}회</Text>
            <Text style={{ fontSize: 30}}>소요 시간: {hour}시간 {minute}분 {second}초</Text>
            <Text style={{ fontSize: 30}}>평가: {evaluation}</Text>
            <TouchableOpacity style={{ alignSelf: "center", marginBottom: 10, overflow: 'hidden', borderColor: "#000000", borderWidth: 5}} onPress={() => reset()}>
              <Text style={{ fontSize: 30}}>  닫기  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.item}>
        <Text style={styles.countTimer}>{hour} : {minute} : {second}</Text>
        <Text style={styles.countText}>정답 횟수: {count}</Text>
      </View>
      <View style={styles.textArea}>
        <Text style={{ position: 'absolute', top: vertical, left: horizontal, fontSize: 70, color: DATA[rdColor].color }}>{ready_text}</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={{ alignSelf: "center", marginLeft: 4, overflow: 'hidden', borderColor: buttonColor, borderWidth: 5, borderRadius: 50 }} disabled={disable_color}
          onPress={() => (rdColor == 0) ? (onIncrease()) : evaluation_result()}
        >
          <Text style={{ fontSize: 30, color: buttonColor }}>  빨강  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginLeft: 4, overflow: 'hidden', borderColor: buttonColor, borderWidth: 5, borderRadius: 50 }} disabled={disable_color}
          onPress={() => (rdColor == 1) ? (onIncrease()) : evaluation_result()}
        >
          <Text style={{ fontSize: 30, color: buttonColor }}>  파랑  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginLeft: 4, overflow: 'hidden', borderColor: buttonColor, borderWidth: 5, borderRadius: 50 }} disabled={disable_color}
          onPress={() => (rdColor == 2) ? (onIncrease()) : evaluation_result()}
        >
          <Text style={{ fontSize: 30, color: buttonColor }}>  초록  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginLeft: 4, overflow: 'hidden', borderColor: buttonColor, borderWidth: 5, borderRadius: 50 }} disabled={disable_color}
          onPress={() => (rdColor == 3) ? (onIncrease()) : evaluation_result()}
        >
          <Text style={{ fontSize: 30, color: buttonColor }}>  검정  </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ alignSelf: "center", marginBottom: 10, overflow: 'hidden', borderColor: buttonStart, borderWidth: 5, borderRadius: 50 }} disabled={disable}
          onPress={() => { restart(), ready() }
          }
        >
          <Text style={{ fontSize: 30, color: buttonStart }}>    시작    </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  item: {
    height: 100,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    height: 500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
  },
  countText: {
    margin: 1,
    fontSize: 30,
  },
  countTimer: {
    margin: 20,
    fontSize: 30,
  }
});

export default App;