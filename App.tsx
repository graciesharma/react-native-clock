import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const AnalogClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const secondDegrees = (second / 60) * 360;
  const minuteDegrees = (minute / 60) * 360 + (second / 60) * 6;
  const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30;

  return (
    <Svg height="200" width="200" viewBox="0 0 200 200">
      <Circle cx="100" cy="100" r="95" stroke="black" strokeWidth="2" fill="white" />
      <Line x1="100" y1="100" x2={100 + 80 * Math.sin(Math.PI * hourDegrees / 180)} y2={100 - 80 * Math.cos(Math.PI * hourDegrees / 180)} stroke="black" strokeWidth="4" />
      <Line x1="100" y1="100" x2={100 + 90 * Math.sin(Math.PI * minuteDegrees / 180)} y2={100 - 90 * Math.cos(Math.PI * minuteDegrees / 180)} stroke="grey" strokeWidth="3" />
      <Line x1="100" y1="100" x2={100 + 100 * Math.sin(Math.PI * secondDegrees / 180)} y2={100 - 100 * Math.cos(Math.PI * secondDegrees / 180)} stroke="red" strokeWidth="2" />
    </Svg>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <Text style={styles.digitalClock}>
      {time.toLocaleTimeString()}
    </Text>
  );
};

const App = () => (
  <View style={styles.container}>
    <AnalogClock />
    <DigitalClock />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  digitalClock: {
    fontSize: 30,
    marginTop: 20,
  },
});

export default App;
