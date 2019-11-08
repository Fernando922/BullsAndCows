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

  function randomNumber() {
    let secretRandomNumber = Math.round(Math.random() * 9999).toString();
    if (secretRandomNumber.length < 4) {
      secretRandomNumber = secretRandomNumber.padEnd(4, '0');
    }
    setSecretNumber(secretRandomNumber);
  }

  function verifyRepeatedNumbers() {
    if (secretNumber) {
      const numbers = secretNumber.split('');
      const sortedArray = numbers.slice().sort();
      let repeatedNumber = false;
      for (let i = 0; i < sortedArray.length - 1; i += 1) {
        if (sortedArray[i + 1] === sortedArray[i]) {
          repeatedNumber = true;
        }
      }
      if (repeatedNumber) {
        randomNumber();
      }
    }
  }

  useEffect(() => {
    randomNumber();
  }, []);

  useEffect(() => {
    verifyRepeatedNumbers();
  }, [secretNumber]);

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
    randomNumber();
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

  function convertToInteger(list) {
    list.forEach((item, index) => {
      list[index] = parseInt(item, 10);
    });
  }

  function findBullsAndCows() {
    function updateState(bullCount, cowCount) {
      setBulls(bullCount);
      setCows(cowCount);
    }

    // secretNumbers e userNumber
    let cowCount = 0;
    let bullCount = 0;
    const secretNumbers = secretNumber.split('');
    const userNumbers = [...userNumber];
    const cowList = [];
    convertToInteger(secretNumbers);

    secretNumbers.map((number, index) => {
      for (let i = 0; i < userNumbers.length; i += 1) {
        if (userNumbers[i] === number) {
          if (index === i) {
            bullCount += 1;
            userNumbers.splice(i, 1, -1);
          } else if (userNumbers[index] !== -1) {
            if (cowList.find(pos => pos === i) === undefined && index >= i) {
              cowCount += 1;
              cowList.push(i);
            }
          }
        }
      }
      return updateState(bullCount, cowCount);
    });
  }

  function sendValue() {
    function verifyNumbers() {
      if (attempt === 1) {
        looseGame();
      } else {
        findBullsAndCows();
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
