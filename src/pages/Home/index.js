import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { Container } from '../../utils/styles';
import {
  Title,
  ContainerButtons,
  Button,
  NumberButton,
  TextTip,
  TextAttempts,
  ButtonSend,
  TextButtonSend,
} from './styles';

export default function Home() {
  const [secretNumber, setSecretNumber] = useState('');
  const [userNumber, setUserNumber] = useState([0, 0, 0, 0]);

  function setRandomSecretNumber() {
    const randomNumber = Math.round(Math.random() * 9999);
    setSecretNumber(randomNumber.toString());
  }

  useEffect(() => {
    setRandomSecretNumber();
  }, []);

  function changeNumber(position) {
    const fullNumber = [...userNumber];
    let number = fullNumber[position];

    if (number === 9) {
      number = 0;
    } else {
      number += 1;
    }

    fullNumber[position] = number;
    setUserNumber(fullNumber);
  }

  function verifyNumbers() {}

  function sendValue() {
    function restartGame() {
      setUserNumber([0, 0, 0, 0]);
      setRandomSecretNumber();
    }

    const number = [...userNumber];
    const choice = number.join('');
    if (choice === secretNumber) {
      restartGame();
      return Alert.alert('Parabéns!', 'Você acertou!');
    }
    return verifyNumbers();
  }

  return (
    <Container>
      <Title>Bulls And Cows</Title>
      <ContainerButtons>
        <Button onPress={() => changeNumber(0)}>
          <NumberButton>{userNumber[0]}</NumberButton>
        </Button>
        <Button onPress={() => changeNumber(1)}>
          <NumberButton>{userNumber[1]}</NumberButton>
        </Button>
        <Button onPress={() => changeNumber(2)}>
          <NumberButton>{userNumber[2]}</NumberButton>
        </Button>
        <Button onPress={() => changeNumber(3)}>
          <NumberButton>{userNumber[3]}</NumberButton>
        </Button>
      </ContainerButtons>
      <ButtonSend onPress={() => sendValue()}>
        <TextButtonSend>ENVIAR</TextButtonSend>
      </ButtonSend>
      <TextTip>1B0C</TextTip>
      <TextAttempts>Restam 10 tentativas</TextAttempts>

      <Text style={{ marginTop: 50 }}>{secretNumber}</Text>
    </Container>
  );
}
