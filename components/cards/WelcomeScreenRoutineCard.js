import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';


const RoutineCard = ({ title, week_days, onView, onDelete }) => {
  
    const confirmDelete = () => {
        Alert.alert(
          'Borrar rutina',
          '¿Estás seguro de que deseas eliminar esta rutina?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: onDelete,
            },
          ],
          { cancelable: true }
        );
    };
  
    return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View  style={{backgroundColor: 'white', borderRadius:8, paddingVertical: 10, paddingHorizontal: 5}}>

          <Image source={require('../../assets/workout-icon.png')} />
        </View>
        <View style={{alignItems:'flex-end', width:'70%', backgroundColor:'white', borderRadius: 10, justifyContent: 'center'}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{`Días a la semana: ${week_days}`}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onView}>
          <Text style={styles.buttonText}>Abrir rutina</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trashcan} onPress={confirmDelete}>
          <Image style={{width: 25,height: 25}} source={require('../../assets/trashcan.png')} />  
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    width: 350,
    backgroundColor: '#0091FA',
    borderRadius: 8,
    borderColor: '#0091FA',
    padding: 20,
    marginTop: 16,
    shadowColor: '#0091FA',
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0091FA',
    marginRight: 15,
  },
  text: {
    marginRight: 16,
    fontSize: 16,
    marginBottom: 4,
    color: '#0091FA',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '75%',
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: '#0091FA',
    fontWeight: 'bold',
    fontSize: 17,
  },
  trashcan:{
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  }
};

export default RoutineCard;
