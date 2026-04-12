import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { LinkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { categories } from "@/utils/categories";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [category, setCategory] = useState(categories[0].name);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);

  async function getLinks() {
    try {
      const response = await LinkStorage.get();
      const filteredLinks = response.filter(
        (link) => link.category === category,
      );
      setLinks(filteredLinks);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os links.");
    }
  }
  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setLink(selected);
  }
  async function linkRemove() {
    try {
      await LinkStorage.remove(link.id);
      setShowModal(false);
      getLinks();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o link.");
    }
  }
  function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir este link?", [
      { style: "cancel", text: "Cancelar" },
      { text: "sim", onPress: linkRemove },
    ]);
  }
  async function openUrl() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o link.");
      console.log(error);
    }
  }
  function handleOpenUrl() {
    Alert.alert("Abrir Link", "Deseja abrir este link?", [
      { style: "cancel", text: "cancelar" },
      { text: "sim", onPress: openUrl },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => router.navigate("/add")}
        >
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => setShowModal(false)}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalLinkUrl}>{link.url}</Text>
            <View style={styles.modalOptions}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option
                name="Abrir"
                icon="language"
                variant="primary"
                onPress={handleOpenUrl}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
