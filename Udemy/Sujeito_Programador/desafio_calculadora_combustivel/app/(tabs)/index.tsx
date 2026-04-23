import { useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';


export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [precoAlcool, setPrecoAlcool] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');
  const [compensa, setCompensa] = useState('');

  function calcular() {
    if (precoAlcool && precoGasolina) {
      const precoAlcoolFloat = parseFloat(precoAlcool);
      const precoGasolinaFloat = parseFloat(precoGasolina);
      const resultado = precoAlcoolFloat / precoGasolinaFloat;
      if (resultado < 0.7) {
        setCompensa('Álcool');
      } else {
        setCompensa('Gasolina');
      }
      setModalVisible(true);
    }
  }

  function handleModalToggle() {
    calcular();
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text>Qual a melhor opção?</Text>
      <View>
        <Text>Álcool (preço por litro)</Text>
        <TextInput
          placeholder='3,50'
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType='numeric'
          onChangeText={setPrecoAlcool}
          value={precoAlcool}
        />
        <Text>Gasolina (preço por litro)</Text>
        <TextInput
          placeholder='3,50'
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType='numeric'
          onChangeText={setPrecoGasolina}
          value={precoGasolina}
        />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
      // transparent={true}
      >
        <View style={styles.modalContainer}>
          <Image source={require('@/assets/images/gas.png')} style={styles.logo} />
          <Text>Compensa usar {compensa}</Text>
          <Button title="Fechar" onPress={() => handleModalToggle()} />
        </View>
      </Modal>
      <Button title="Calcular" onPress={() => handleModalToggle()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
