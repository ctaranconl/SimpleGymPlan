import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import NewExerciseModal from "../components/modals/CreateNewExerciseModal";
import NewSetModal from "../components/modals/CreateNewSetModal";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import DayScreen from "./DayScreen";

const Tab = createMaterialTopTabNavigator();

function generateTabs(nTabs, route) {
  const tabScreens = [];
  //onst weekDaysArray = Object.values(week_days);
  for (let i = 1; i <= nTabs; i++) {
    const tabName = `Día ${i}`;
    tabScreens.push(
      <Tab.Screen
        key={i}
        name={tabName}
        component={DayScreen}
        initialParams={route}
      />
    );
  }
  return tabScreens;
}

function RoutineDaysTab({ route }) {
  const nTabs = route.params.nTabs;

  const tabScreens = generateTabs(nTabs, route);

  return <Tab.Navigator>{tabScreens}</Tab.Navigator>;
}




export default RoutineDaysTab;

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
