import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WeekNOfDaysPicker = ({ onValueChange, styles, value }) => {

    
    return (

        <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.daysPicker}
        >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
        </Picker>
    );
};

export default WeekNOfDaysPicker;
