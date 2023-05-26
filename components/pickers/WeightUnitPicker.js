import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UnitPicker = ({ onValueChange, styles, value }) => {
      
    return (
        <Picker
            selectedValue={value}
            onValueChange={onValueChange}
            style={styles.daysPicker}
          >
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lb" value="lb" />
          </Picker>
    );
  };
  
  export default UnitPicker;
