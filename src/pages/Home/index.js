import React, { useState, useEffect } from 'react';
import { Text, Alert, TouchableOpacity } from 'react-native';
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
  const [bull] = useState(0);
  const [cow] = useState(0);
  const [attempt, setAttempt] = useState(10);

  function setRandomSecretNumber() {
    let randomNumber = Math.round(Math.random() * 9999).toString();

    if (randomNumber.length < 4) {
      randomNumber = randomNumber.padEnd(4, '0');
    }

    setSecretNumber(randomNumber);
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
    return setUserNumber(fullNumber);
  }

  function restartGame() {
    setUserNumber([0, 0, 0, 0]);
    setRandomSecretNumber();
    setAttempt(10);
  }

  function winGame() {
    Alert.alert('Parabéns!', 'Você venceu!');
    restartGame();
  }

  function looseGame() {
    Alert.alert('Ops!', 'Você perdeu!');
    restartGame();
  }

  function sendValue() {
    function verifyNumbers() {
      if (attempt === 1) {
        return looseGame();
      }

      function findBulls() {
        // let bull = 0
        // const secretNumbers = secretNumber.split('');

        for (let i = 0; i < 4; i += 1) {
          // if (userNumber[i] == secretNumbers[i]) {
          //   bull += 1;
          // }
        }
      }

      return findBulls();
    }

    const attemptsRemaining = attempt;
    setAttempt(attemptsRemaining - 1);

    const number = [...userNumber];
    const choice = number.join('');
    if (choice === secretNumber) {
      return winGame();
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
      <TextTip>{`${bull}B${cow}C`}</TextTip>
      <TextAttempts>{`Restam ${attempt} tentativas`}</TextAttempts>

      <Text style={{ marginTop: 50 }}>{secretNumber}</Text>
      <TouchableOpacity onPress={() => restartGame()}>
        <Text>reset</Text>
      </TouchableOpacity>
    </Container>
  );
}
