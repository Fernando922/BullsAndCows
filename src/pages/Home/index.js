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
  const [bulls, setBulls] = useState(0);
  const [cows, setCows] = useState(0);
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
    setBulls(0);
    setCows(0);
  }

  function winGame() {
    Alert.alert('Parabéns!', 'Você venceu!');
    restartGame();
  }

  function looseGame() {
    Alert.alert('Ops!', 'Você perdeu!');
    restartGame();
  }

  function findBulls() {
    function convertToInteger(list) {
      list.forEach((item, index) => {
        list[index] = parseInt(item, 10);
      });
    }

    let bullCount = 0;
    const secretNumbers = secretNumber.split('');
    convertToInteger(secretNumbers);

    for (let i = 0; i < userNumber.length; i += 1) {
      if (userNumber[i] === secretNumbers[i]) {
        bullCount += 1;
      }
    }
    setBulls(bullCount);
  }

  function sendValue() {
    function verifyNumbers() {
      if (attempt === 1) {
        looseGame();
      } else {
        findBulls();
      }
    }

    const attemptsRemaining = attempt;
    setAttempt(attemptsRemaining - 1);

    const number = [...userNumber];
    const choice = number.join('');
    if (choice === secretNumber) {
      winGame();
    } else {
      verifyNumbers();
    }
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
      {attempt === 10 ? (
        <TextTip start>Escolha uma combinação para começar</TextTip>
      ) : (
        <TextTip>{`${bulls}B${cows}C`}</TextTip>
      )}
      <TextAttempts>{`Restam ${attempt} tentativas`}</TextAttempts>

      <Text style={{ marginTop: 50 }}>{secretNumber}</Text>
      <TouchableOpacity onPress={() => restartGame()}>
        <Text>reset</Text>
      </TouchableOpacity>
    </Container>
  );
}
