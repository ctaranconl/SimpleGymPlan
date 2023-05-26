import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import NewExerciseModal from "../components/modals/CreateNewExerciseModal";
import NewSetModal from "../components/modals/CreateNewSetModal";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";


function ExerciseView({ route }) {
  
  const defaultJsonValue = {
    muscle_group: route.params.data.week_days[tabName].muscle_group,
    exercise_title: route.params.data.week_days[tabName].exercise_title,
    image_url: "",
    sets: {
      set1: {
        reps: inputRepsGroupTitle,
        weight: inputExerciseWeightTitle,
      },
    },
  };
  console.log(defaultJsonValue)
  const [tabName, setTabName] = useState(route.params.tabName);
  const [exerciseSetsData, setExerciseSetsData] = useState(JSON.parse(defaultJsonValue));
  const [inputRepsGroupTitle, setInputRepsGroupTitle] = useState('');
  const [inputExerciseWeightTitle, setInputExerciseWeightTitle] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('routine1');
      if (jsonData != null) {
        const data = JSON.parse(jsonData);
        //console.log(JSON.stringify(data) + ' FETCHED Exercise Details');
        setExerciseSetsData(data.week_days[tabName]);
      }
    } catch (error) {
      console.log('Error al obtener los datos:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleCreateNewSetPress = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    saveNewSet();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const saveNewSet = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("routine1");
      const data = JSON.parse(jsonData);
      data.week_days[tabName] = {
        muscle_group: data.week_days[tabName].muscle_group,
        exercise_title: data.week_days[tabName].exercise_title,
        image_url: "",
        sets: {
          set1: {
            reps: inputRepsGroupTitle,
            weight: inputExerciseWeightTitle,
          },
        },
      };
      console.log(JSON.stringify("VAYA FETCH" + data.week_days[tabName]))
      await AsyncStorage.setItem("routine1", JSON.stringify(data));
      setNewSetData(data.week_days[tabName]);
      console.log("Datos guardados en AsyncStorage.");
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  return (
    
    <View style={{justifyContent: 'space-between', height:'100%'}}>
      <View style={{width: '100%', flexDirection: 'row', padding: 15,}}>
        <View style={styles.imageContainer}></View> 
        <View>
        <Text style={styles.title}>{exerciseSetsData.muscle_group}</Text>
        <Text style={styles.text}>{exerciseSetsData.exercise_title}</Text>
        </View>
      </View>
      <View style={{width: '100%', height: '60%'}}>
        <View style={{flexDirection: 'row', width: '100%', height: 80,justifyContent: "space-around", alignItems: "center"}}>
          <Text style={styles.setText}>lol</Text>
          <Text style={styles.setText}>Peso: 15 kg</Text>
        </View>
      </View>
      <View style={{justifyContent: "flex-end", alignItems: "center", marginBottom: 40,}}>
        <TouchableOpacity
          style={styles.button} onPress={handleCreateNewSetPress}
        >
          <Text style={styles.buttonText}>Nuevo set</Text>
        </TouchableOpacity>
      </View>
      <NewSetModal
        isModalVisible={isModalVisible}
        inputRepsGroupTitle={inputRepsGroupTitle}
        setInputRepsGroupTitle={setInputRepsGroupTitle}
        inputExerciseWeightTitle={inputExerciseWeightTitle}
        setInputExerciseWeightTitle={setInputExerciseWeightTitle}
        handleModalSubmit={handleModalSubmit}
        handleModalCancel={handleModalCancel}
      />
    </View>
  );
}

export default ExerciseView;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EE7E8B",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  imageContainer: {
    
    width: 125,
    height: 125,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  title: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    fontWeight: "bold",
  },
  text: {
    marginLeft: 20,
    color: 'black',
    fontSize: 20,
  },
  setText: {
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    fontSize: 22,
  },
});



