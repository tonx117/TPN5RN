import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

const PokeApi = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const newData = await Promise.all(
        data.results.map(async (result) => {
          const pokemonResponse = await fetch(result.url);
          return pokemonResponse.json();
        })
      );

      setPokemonData((prevData) => [...prevData, ...newData]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error("Error trayendo los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPokemonItem = ({ item }) => {
    return (
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: item.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.text}>Nombre: {item.name}</Text>
          <Text style={styles.text}>
            Tipo: {item.types.map((type) => type.type.name).join(", ")}
          </Text>
          <Text style={styles.text}>Altura: {item.height * 10} cm</Text>
          <Text style={styles.text}>Peso: {item.weight} kg</Text>
        </View>
      </Card>
    );
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      fetchData();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Data:</Text>
      <FlatList
        data={pokemonData}
        renderItem={renderPokemonItem}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.flatListContent}
      />
      <Button
        title={isLoading ? "Cargando..." : "Cargar Más Pokémon"}
        onPress={handleLoadMore}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingBottom: 20,
  },
  card: {
    width: moderateScale(300),
    marginVertical: 10,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
  text: {
    marginVertical: 5,
  },
});

export default PokeApi;
