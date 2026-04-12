import { colors } from "@/styles/colors";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      {...rest}
      placeholderTextColor={colors.gray[200]}
    />
  );
}
