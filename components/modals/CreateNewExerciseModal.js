import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

const NewExerciseModal = ({
  isModalVisible,
  inputMuscleGroupTitle,
  setInputMuscleGroupTitle,
  inputExerciseDescriptionTitle,
  setInputExerciseDescriptionTitle,
  handleModalSubmit,
  handleModalCancel,
}) => {
  return (
    <Modal isVisible={isModalVisible}
      backdropColor="#000"
      style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Grupo muscular</Text>
          
          <Picker
            style={styles.picker}
            selectedValue={inputMuscleGroupTitle}
            onValueChange={(itemValue) => {setInputMuscleGroupTitle(itemValue)}}
          >
            <Picker.Item label="Pecho" value="Pecho" />
            <Picker.Item label="Espalda" value="Espalda" />
            <Picker.Item label="Bíceps" value="Bíceps" />
            <Picker.Item label="Triceps" value="Triceps" />
            <Picker.Item label="Hombros" value="Hombros" />
            <Picker.Item label="Antebrazo" value="Antebrazo" />
            <Picker.Item label="Trapecio" value="Trapecio" />
            <Picker.Item label="Abdominales" value="Abdominales" />
            <Picker.Item label="Cuádriceps" value="Cuádriceps" />
            <Picker.Item label="Femoral" value="Femoral" />
            <Picker.Item label="Gemelos" value="Gemelos" />
          </Picker>
          <Text style={styles.text}>Nombre del ejercicio</Text>
          <TextInput
            value={inputExerciseDescriptionTitle}
            onChangeText={setInputExerciseDescriptionTitle}
            placeholder=""
            style={styles.textInput}
          />
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
//<TextInput
//            value={inputMuscleGroupTitle}
//            onChangeText={setInputMuscleGroupTitle}
//            placeholder=""
//            style={styles.textInput}
//          />
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

export default NewExerciseModal;
