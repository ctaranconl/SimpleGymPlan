import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

const NewRoutineModal = ({
  isModalVisible,
  inputRoutineTitle,
  setInputRoutineTitle,
  selectedValue,
  setSelectedValue,
  handleModalSubmit,
  handleModalCancel,
}) => {
  return (
    <Modal isVisible={isModalVisible}
      backdropColor="#000"
      style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <TextInput
            value={inputRoutineTitle}
            onChangeText={setInputRoutineTitle}
            placeholder="Nueva rutina"
            style={styles.textInput}
          />
          <Text style={styles.text}>Días de entreno semanal</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="1 día" value="1" />
            <Picker.Item label="2 días" value="2" />
            <Picker.Item label="3 días" value="3" />
            <Picker.Item label="4 días" value="4" />
            <Picker.Item label="5 días" value="5" />
            <Picker.Item label="6 días" value="6" />
            <Picker.Item label="7 días" value="7" />
          </Picker>
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

export default NewRoutineModal;
