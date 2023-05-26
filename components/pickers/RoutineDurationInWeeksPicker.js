import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WeeksPicker = ({ minWeeks, maxWeeks, onValueChange, styles, value }) => {
    const weeks = [];
    for (let i = minWeeks; i <= maxWeeks; i++) {
      weeks.push(<Picker.Item key={i} label={`${i} Semanas`} value={i} />);
    }
  
    return (
        <Picker
            selectedValue={value}
            onValueChange={onValueChange}
            style={styles.daysPicker}
        >
            <Picker.Item label={`Elige...`} enabled={false} />
            <Picker.Item key={0} label={`Sin límite`} value={0} />
            <Picker.Item key={1} label={`1 Semana`} value={1} />
            {weeks}
        </Picker>
    );
  };
  
  export default WeeksPicker;
