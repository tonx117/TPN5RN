// App.js
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const [displayTextIndex, setDisplayTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const displayTexts = [
    '"¡Say hello to mis amigas de tamaños variados y convenientes!"',
    '"Es perdedora, lista para llorar! T-T-T-Ta!"',
    '"¿Jinx? ¡De Jinx! que tonto es."',
    '"Tres armas equivalen a jamas sentirme obligada a pedir disculpas."',
    '"Hay que comportarse...mejor no"',
    '"Y si tuviera una pistola que disparara...otras pistolas!?"',
    '"Tengo un montón de cinturones! y no se para qué."',
    '"Crees que estoy loca deberías de ver a mi hermana."',
    '"Estoy loca tengo un certificado medico y todo."',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [displayText]);

  const navigation = useNavigation();

  const handleButtonPress = () => {
    const newIndex = (displayTextIndex + 1) % displayTexts.length;
    setDisplayTextIndex(newIndex);
    setDisplayText(displayTexts[newIndex]);
  };

  const handleSkinsButtonPress = () => {
    navigation.navigate("PokeAPIComponent");
  };

  return (
    <ImageBackground
      source={require("./public/jinx.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>{displayText}</Text>
        <View style={styles.button}>
          <Button title="Frases de Jinx" onPress={handleButtonPress} />
        </View>
        <View style={styles.button}>
          <Button title="Poke api" onPress={handleSkinsButtonPress} />
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default App;
