import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

function generateSetCards(exKey, data, tabName, fetchData) {
  
    const setSets = Object.keys(data.sets).map((setKey, index) => {
      console.log("MADRE MIA DATA: " + index);
      const setData = data.sets[setKey];
      const handleDeleteSet = async (setkey) => {
        try {
          const jsonData = await AsyncStorage.getItem("routine1");
          const data = JSON.parse(jsonData);
  
          if (data.week_days[tabName][exKey].sets.hasOwnProperty(setKey)) {
            delete data.week_days[tabName][exKey].sets[setkey];
          }
          let index = 0;
          const updatedSets = {};
          Object.keys(data.week_days[tabName][exKey].sets).forEach((key) => {
            const newKey = `set${index}`;
    
            updatedSets[newKey] = data.week_days[tabName][exKey].sets[key];
            index++;
          });
          data.week_days[tabName][exKey].sets = updatedSets;
          await AsyncStorage.setItem("routine1", JSON.stringify(data));
          fetchData();
          console.log("Datos eliminados de AsyncStorage.");
        } catch (error) {
          console.log("Error al eliminar los datos:", error);
        }
      };
      
      const confirmDelete = () => {
        Alert.alert(
          'Borrar set',
          '¿Estás seguro de que deseas eliminar este set?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: () => handleDeleteSet(setKey),
            },
          ],
          { cancelable: true }
        );
      }
      return (
        <View key={index} style={styles.setContainer}>
          <Text>Repeticiones: {setData.reps}</Text>
          <Text>Peso: {setData.weight}</Text>
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.trashcanSet} onPress={confirmDelete}>
              <Image style={{width: 15,height: 15}} source={require('../../assets/trashcan.png')} />  
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  
    return setSets;
  }
  
  function ExerciseCard({ index, exKey, data, value, tabName, exNameReturn, fetchData }) {
    const handleCreateNewSetPress = () => {
      value(true);
      exNameReturn(exKey);
      fetchData();
    };
    const handleDeleteExercise = async (setkey) => {
      try {
        const jsonData = await AsyncStorage.getItem("routine1");
        const data = JSON.parse(jsonData);
        if (data.week_days[tabName].hasOwnProperty(exKey)) {
          delete data.week_days[tabName][exKey];
        }
        let index = 0;
        const updatedExercises = {};
        Object.keys(data.week_days[tabName]).forEach((key) => {
          const newKey = `exercise${index}`;
          
          updatedExercises[newKey] = data.week_days[tabName][key];
          index++;
        });
        data.week_days[tabName] = updatedExercises;
        await AsyncStorage.setItem("routine1", JSON.stringify(data));
        fetchData();
        console.log("Datos eliminados de AsyncStorage.");
      } catch (error) {
        console.log("Error al eliminar los datos:", error);
      }
    };
  
    const confirmDelete = () => {
      Alert.alert(
        'Borrar ejercicio',
        '¿Estás seguro de que deseas eliminar este ejercicio?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: handleDeleteExercise,
          },
        ],
        { cancelable: true }
      );
  };
    
  
    return (
      <View key={index} style={styles.cardContainer}>
        <View style={{ flexDirection: "row", justifyContent:"space-between", alignItems:"center", paddingBottom: 9, }}>
          
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.imageArea}>
              <Text style={{ color: "#0091FA", }}>+ image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={{}}>
              <Text style={styles.title}>{data.muscle_group}</Text>
              <Text style={styles.text}>{data.exercise_title}</Text>
            </View>
  
            <TouchableOpacity style={styles.buttonNewSet}>
              <Text style={styles.buttonText} onPress={handleCreateNewSetPress}>
                Nuevo set
              </Text>
            </TouchableOpacity>
            
          </View >
          <View style={{height: '100%', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.trashcan} onPress={confirmDelete}>
              <Image style={{width: 25,height: 25}} source={require('../../assets/trashcan.png')} />  
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          {generateSetCards(exKey, data, tabName, fetchData)} 
        </View>
      </View>
    );
  }

  export default ExerciseCard;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#0091FA",
      borderRadius: 4,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignItems: "center",
      marginBottom: 15,
    },
    buttonNewSet: {
      backgroundColor: 'white',
      borderRadius: 4,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignItems: "center",
      width: 120,
    },
    buttonText: {
      fontWeight: 'bold',
      color: '#0091FA',
      borderRadius: 4,
    },
    buttonNewExerciseText: {
      color: "white",
      height: 20,
      borderRadius: 4,
    },
    buttonContainer:{
      flex:1,
      justifyContent: 'flex-end',
    },
    cardContainer: {
      height: 125,
      borderRadius: 8,
      borderColor: '#0091FA',
      backgroundColor: '#0091FA'
    },
    statsContainer: {
      justifyContent: "space-around",
      width: "45%",
      height: "100%",
      borderRadius: 10,
    },
    imageContainer: {
      width: 100,
      height: 100,
      justifyContent: "center",
      borderRadius: 10,
      borderColor: "white",
      marginLeft: 15,
    },
    setContainer: {
      flexDirection: "row",
      width: "80%",
      height: 50,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#0091FA',
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: 5,
    },
    imageArea: {
      width: "100%",
      height: "100%",
      backgroundColor:"white",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    title: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
    },
    text: {
      color: "white",
      fontSize: 12,
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
      marginRight: 10,
      marginBottom: 12,
    },
    trashcanSet:{
      width: 30,
      height: 30,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#722fba',
      alignItems: 'center',
      justifyContent: 'center',
    },
    exerciseCards:{
      marginTop: 10,
    }
  });