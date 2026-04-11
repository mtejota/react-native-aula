import Button from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { LinkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleAdd() {
    ///console.log({ name, url, category });
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione a categoria");
      }
      if (!name.trim()) {
        return Alert.alert("Nome", "Informe o nome do site");
      }
      if (!url.trim()) {
        return Alert.alert("URL", "Insira a URL do site");
      }
      await LinkStorage.save({
        id: new Date().getTime().toString(),
        name,
        category,
        url,
      });
      const data = await LinkStorage.get();
      console.log(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o link");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>
      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
        <Input
          placeholder="URL"
          onChangeText={setUrl}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
