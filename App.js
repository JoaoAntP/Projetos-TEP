import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [result, setResult] = useState('');

  const handleNumberPress = (number) => {
    if (selectedNumbers.includes(number)) return;
    if (selectedNumbers.length >= 6) return;
    
    setSelectedNumbers([...selectedNumbers, number]);
    setResult('');
  };

  const generateRandomNumbers = () => {
    if (selectedNumbers.length !== 6) {
      setResult('Selecione 6 números antes de gerar o sorteio!');
      return;
    }

    let numbers = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 24) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b);
    setRandomNumbers(numbers);
    checkResult(numbers);
  };

  const checkResult = (randomNums) => {
    const matchedNumbers = selectedNumbers.filter(num => randomNums.includes(num));
    const count = matchedNumbers.length;

    let resultText = `Você acertou: ${count} número${count !== 1 ? 's' : ''}`;
    if (count > 0) {
      resultText += ` (${matchedNumbers.join(', ')}) → `;
    }

    switch(count) {
      case 6:
        resultText += 'Isso é uma Sena ✅';
        break;
      case 5:
        resultText += 'Isso é uma Quina ✅';
        break;
      case 4:
        resultText += 'Isso é uma Quadra ✅';
        break;
      default:
        resultText += 'Sem prêmio oficial ❌';
    }

    setResult(resultText);
  };

  const resetGame = () => {
    setSelectedNumbers([]);
    setRandomNumbers([]);
    setResult('');
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mega-Sena Simulator</Text>
      
      <View style={styles.numberButtonsContainer}>
        {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberButton,
              selectedNumbers.includes(num) && styles.selectedNumberButton
            ]}
            onPress={() => handleNumberPress(num)}
            disabled={selectedNumbers.includes(num) || selectedNumbers.length >= 6}
          >
            <Text style={styles.numberButtonText}>{formatNumber(num)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectedContainer}>
        <Text style={styles.sectionTitle}>Seus números:</Text>
        <View style={styles.numbersDisplay}>
          {selectedNumbers.length > 0 ? (
            selectedNumbers.sort((a, b) => a - b).map((num, index) => (
              <View key={index} style={styles.numberDisplay}>
                <Text style={styles.numberDisplayText}>{formatNumber(num)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.placeholderText}>Selecione 6 números</Text>
          )}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.generateButton} 
        onPress={generateRandomNumbers}
        disabled={selectedNumbers.length !== 6}
      >
        <Text style={styles.generateButtonText}>Sortear Números</Text>
      </TouchableOpacity>

      {randomNumbers.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.sectionTitle}>Números sorteados:</Text>
          <View style={styles.numbersDisplay}>
            {randomNumbers.map((num, index) => (
              <View key={index} style={styles.numberDisplay}>
                <Text style={styles.numberDisplayText}>{formatNumber(num)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {result !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>🎯 Resultados possíveis na Mega-Sena</Text>
        <Text style={styles.ruleItem}><Text style={styles.bold}>6</Text> Sena - Prêmio principal</Text>
        <Text style={styles.ruleItem}><Text style={styles.bold}>5</Text> Quina - Acertar 5 dos 6 números</Text>
        <Text style={styles.ruleItem}><Text style={styles.bold}>4</Text> Quadra - Acertar 4 dos 6 números</Text>
        <Text style={styles.ruleItem}><Text style={styles.bold}>3 ou menos</Text> Sem prêmio oficial</Text>
      </View>

      <TouchableOpacity 
        style={styles.resetButton} 
        onPress={resetGame}
      >
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0066b3',
  },
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066b3',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedNumberButton: {
    backgroundColor: '#ff6600',
  },
  numberButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  numbersDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  numberDisplay: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0066b3',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberDisplayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderText: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#0066b3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#add8e6',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  rulesContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff8e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ruleItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#0066b3',
  },
  resetButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});