import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export default function Index() {
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
      <Categories />

      <FlatList
        data={["0", "1", "2"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Link
            name="Rocketseat"
            url="https://rocketseat.com.br"
            onDetails={() => console.log("Clicou no link!")}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />
      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity activeOpacity={0.4}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>Rockeseat</Text>
            <Text style={styles.modalLinkUrl}>https://rocketseat.com.br</Text>
            <View style={styles.modalOptions}>
              <Option name="Excluir" icon="delete" variant="secondary" />
              <Option name="Abrir" icon="language" variant="primary" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
