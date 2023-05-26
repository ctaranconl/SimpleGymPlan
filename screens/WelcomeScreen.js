import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoutineCard from "../components/cards/WelcomeScreenRoutineCard";
import NewRoutineModal from "../components/modals/CreateNewRoutineModal";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";

export default function ShowWelcomeScreen({ navigation }) {
  const [routineData, setRoutineData] = useState(null);

  const [isButtonPressed, setIsButtonPressed] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputRoutineTitle, setInputRoutineTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState("1");



  const handleCreateNewRoutinePress = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    saveNewRoutine();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("routine1");
      if (jsonData != null) {
        const data = JSON.parse(jsonData);
        console.log(JSON.stringify(data) + " FETCHED WELCOME SCREEN");
        setRoutineData(data);
      }
    } catch (error) {
      console.log("Error al obtener los datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleViewRoutine = () => {
    console.log(
      Object.keys(routineData.week_days).length +
        " --- " +
        JSON.stringify(routineData)
    );
    navigation.navigate("DetallesRutina", {
      nTabs: Object.keys(routineData.week_days).length,
      data: routineData,
    });
  };

  const handleDeleteRoutine = async () => {
    const keyToRemove = "routine1";

    try {
      await AsyncStorage.removeItem(keyToRemove);
      setRoutineData(null);
      console.log("Datos eliminados de AsyncStorage.");
    } catch (error) {
      console.log("Error al eliminar los datos:", error);
    }
  };

  const saveNewRoutine = async () => {
    console.log("DA ROUTINES" + ROUTINES);
    const formRoutineData = {
      title: inputRoutineTitle
        ? inputRoutineTitle
        : "Rutina " + (ROUTINES.length + 1).toString(),
      week_days: {},
    };

    for (let i = 1; i <= selectedValue; i++) {
      const dayKey = `day${i}`;
      formRoutineData.week_days[dayKey] = {};
    }
    try {
      console.log(JSON.stringify(formRoutineData));
      await AsyncStorage.setItem("routine1", JSON.stringify(formRoutineData));
      setRoutineData(formRoutineData);
      
      console.log("Datos guardados en AsyncStorage.");
      //navigation.goBack();
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  //week_days={routineData.week_days}
  //weight_unit={routineData.weight_unit}
  //routine_description={routineData.routine_description}
  //onView={handleViewRoutine}
  //onDelete={handleDeleteRoutine}

  return (
    <SafeAreaView style={styles.container}>
      {routineData ? (
        <View>
          <View style={styles.routinesContainer}>
            <RoutineCard
              title={routineData.title}
              week_days={Object.keys(routineData.week_days).length}
              onView={handleViewRoutine}
              onDelete={handleDeleteRoutine}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateNewRoutinePress}
            >
              <Text style={styles.buttonText}>Crear nueva rutina</Text>
            </TouchableOpacity>
            <NewRoutineModal
              isModalVisible={isModalVisible}
              inputRoutineTitle={inputRoutineTitle}
              setInputRoutineTitle={setInputRoutineTitle}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              handleModalSubmit={handleModalSubmit}
              handleModalCancel={handleModalCancel}
            />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainerOnly}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateNewRoutinePress}
          >
            <Text style={styles.buttonText}>Crear nueva rutina</Text>
          </TouchableOpacity>
          <NewRoutineModal
            isModalVisible={isModalVisible}
            inputRoutineTitle={inputRoutineTitle}
            setInputRoutineTitle={setInputRoutineTitle}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            handleModalSubmit={handleModalSubmit}
            handleModalCancel={handleModalCancel}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  routinesContainer: {
    flex: 0.9,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainerOnly: {
    flex: 1,
    justifyContent: "flex-end",
    width: "90%",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0091FA",
    marginBottom: 15,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

// PALETTE FROM DARKER TO LIGHTER
//03045e
//023E8A
//0077b6
//0096C7
//00b4d8
//48CAE4
//90e0ef
//ADE8F4
//caf0f8
