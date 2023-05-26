import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import NewSetModal from "../components/modals/CreateNewSetModal";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewExerciseModal from "../components/modals/CreateNewExerciseModal";
import { ScrollView } from "react-native-gesture-handler";
import ExerciseCard from "../components/cards/ExerciseCard";

function DayScreen(route) {
  const defaultJsonValue = {
    exercise0: {
      muscle_group: "",
      exercise_title: "",
      image_url: "",
      sets: {},
    },
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSetVisible, setIsModalSetVisible] = useState(false);
  const [inputMuscleGroupTitle, setInputMuscleGroupTitle] = useState("");
  const [inputExerciseDescriptionTitle, setInputExerciseDescriptionTitle] =
    useState("");
  const [imageOptions, setImageOptions] = useState([]);

  const [inputRepsGroupTitle, setInputRepsGroupTitle] = useState("");
  const [inputExerciseWeightTitle, setInputExerciseWeightTitle] = useState("");

  const [inputGetExerciseName, setInputGetExerciseName] = useState("");

  const [newExerciseData, setNewExerciseData] = useState(defaultJsonValue);
  const [tabName, setTabName] = useState("day1");

  const calculateHeight = (exerciseKey) => {
    const numberOfSets = Object.keys(newExerciseData[exerciseKey].sets).length;
    let totalHeight = 125;
    numberOfSets > 0 ? (totalHeight = 15 + 125 + 5 + numberOfSets * 50) : 125;
    console.log(totalHeight);
    return totalHeight;
  };

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("routine1");
      setTabName("day" + route.route.name.replace("Día ", ""));
      if (jsonData != null) {
        const data = JSON.parse(jsonData);
        console.log(JSON.stringify(data));
        setNewExerciseData(data.week_days[tabName]);
        //console.log(jsonData + ' FETCHED ROUTINE DETAILS ');
      }
    } catch (error) {
      console.log("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabName]);
  //useCustomHookOnFocus(tabScreenName);

  const handleViewExercise = () => {
    console.log(newExerciseData);
    //route.navigation.navigate('DetallesEjercicio', { tabName: tabName, data: newExerciseData });
  };

  const handleCreateNewExercisePress = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    saveNewExercise();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const saveNewExercise = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("routine1");
      const data = JSON.parse(jsonData);

      const setNumber = Object.keys(data.week_days[tabName]).length;
      const setName = "exercise" + setNumber.toString();
      console.log("Ejercicios: " + JSON.stringify(data.week_days[tabName]));
      console.log("NOMBRE EJERCICIO: " + setName);
      data.week_days[tabName][setName] = {
        muscle_group: inputMuscleGroupTitle ? inputMuscleGroupTitle : "Pecho",
        exercise_title: inputExerciseDescriptionTitle
          ? inputExerciseDescriptionTitle
          : "-",
        image_url: "",
        sets: {},
      };
      await AsyncStorage.setItem("routine1", JSON.stringify(data));
      setNewExerciseData(data.week_days[tabName]);
      console.log("Datos guardados en AsyncStorage.");
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  const searchImages = async () => {
    // Implementa aquí tu lógica para buscar imágenes en la base de datos de Google
    // y obtener una lista de opciones de imágenes
    const imageResults = await tuFuncionDeBusquedaDeImagenes(title);

    // Actualiza las opciones de imagen en el estado
    setImageOptions(imageResults);
  };

  const handleCreateNewSetPress = () => {
    setIsModalSetVisible(true);
  };

  const handleModalSetSubmit = () => {
    saveNewSet();
    setIsModalSetVisible(false);
  };

  const handleModalSetCancel = () => {
    setIsModalSetVisible(false);
  };

  const saveNewSet = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("routine1");
      const data = JSON.parse(jsonData);

      console.log("AY LMAO");
      console.log(Object.keys(data.week_days[tabName]).length);

      const setExName = inputGetExerciseName;

      console.log(JSON.stringify(data.week_days[tabName]));
      console.log("madre mia willy " + setExName);

      const setNumber = Object.keys(
        data.week_days[tabName][setExName].sets
      ).length;
      const setName = "set" + setNumber.toString();
      console.log("SETNAME " + setName);

      data.week_days[tabName][setExName].sets[setName] = {
        reps: inputRepsGroupTitle,
        weight: inputExerciseWeightTitle + " kg",
      };

      console.log(
        JSON.stringify("VAYA FETCH" + console.log(data.week_days[tabName]))
      );
      await AsyncStorage.setItem("routine1", JSON.stringify(data));
      setNewExerciseData(data.week_days[tabName]);
      console.log("Datos guardados en AsyncStorage.");
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  const generateExerciseCards = (data, tabName, fetchData, calculateHeight) => {
    const handleValue = (value) => {
      setIsModalSetVisible(value);
    };

    const handleExNameReturn = (exNameReturn) => {
      setInputGetExerciseName(exNameReturn);
    };

    const setExercises = Object.keys(data).map((exerciseKey, index) => {
      const exerciseData = data[exerciseKey];
      const combinedStyles = StyleSheet.compose(styles.exerciseCards, {
        height: calculateHeight(exerciseKey),
      });
      //calculateHeight(exerciseKey);
      return (
        <View key={index} style={combinedStyles}>
          <ExerciseCard
            key={index}
            index={index}
            exKey={exerciseKey}
            data={exerciseData}
            value={handleValue}
            tabName={tabName}
            exNameReturn={handleExNameReturn}
            fetchData={fetchData}
          />
        </View>
      );
    });

    return setExercises;
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <ScrollView style={{ height: "80%" }}>
        {generateExerciseCards(
          newExerciseData,
          tabName,
          fetchData,
          calculateHeight
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateNewExercisePress}
        >
          <Text style={styles.buttonNewExerciseText}>Nuevo ejercicio</Text>
        </TouchableOpacity>

        <NewExerciseModal
          isModalVisible={isModalVisible}
          inputMuscleGroupTitle={inputMuscleGroupTitle}
          setInputMuscleGroupTitle={setInputMuscleGroupTitle}
          inputExerciseDescriptionTitle={inputExerciseDescriptionTitle}
          setInputExerciseDescriptionTitle={setInputExerciseDescriptionTitle}
          handleModalSubmit={handleModalSubmit}
          handleModalCancel={handleModalCancel}
        />
      </View>

      <NewSetModal
        isModalVisible={isModalSetVisible}
        inputRepsGroupTitle={inputRepsGroupTitle}
        setInputRepsGroupTitle={setInputRepsGroupTitle}
        inputExerciseWeightTitle={inputExerciseWeightTitle}
        setInputExerciseWeightTitle={setInputExerciseWeightTitle}
        handleModalSubmit={handleModalSetSubmit}
        handleModalCancel={handleModalSetCancel}
      />
    </View>
  );
}

export default DayScreen;

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
      borderWidth: 2,
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
      borderWidth: 2,
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
      borderWidth: 2,
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
