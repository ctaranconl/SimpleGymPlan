import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

const NewSetModal = ({
  isModalVisible,
  inputRepsGroupTitle,
  setInputRepsGroupTitle,
  inputExerciseWeightTitle,
  setInputExerciseWeightTitle,
  handleModalSubmit,
  handleModalCancel,
}) => {
  return (
    <Modal isVisible={isModalVisible}
      backdropColor="#000"
      style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.text}>Repeticiones</Text>
            <TextInput
              value={inputRepsGroupTitle}
              keyboardType='numeric'
              onChangeText={setInputRepsGroupTitle}
              placeholder=""
              style={styles.textInput}
              />
            <Text style={styles.text}>Peso</Text>
            <TextInput
              value={inputExerciseWeightTitle}
              keyboardType='numeric'
              onChangeText={setInputExerciseWeightTitle}
              placeholder=""
              style={styles.textInput}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleModalCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleModalSubmit}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: 300,
    padding: 20,
    backgroundColor:'white',
    borderRadius: 10,
  },
  textInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 100,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#73acbf',
  },
  picker: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  buttonText: {

    color: '#73acbf',
  },
  button: {
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
  
});

export default NewSetModal;
