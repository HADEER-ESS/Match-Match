import ImagePicker from "@/components/ImagePicker";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constant/Color.js";

export default function MainHome() {
  return (
    <View
      style={styles.screenView}
    >
      <View style={styles.mainTitleContainer}>
        <Text style={styles.welcomingText}>Welcome to Matchy Matchy</Text>
        <Text style={styles.mainTextStyle}>MATCHY ... MATCHY</Text>
      </View>
      <ImagePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    marginTop: 22,
    backgroundColor: COLORS.white
  },
  welcomingText: {
    fontFamily: 'regular',
    color: COLORS.gray
  },
  mainTitleContainer: {
    backgroundColor: "#f010f1",
    paddingVertical: 18,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10
  },
  mainTextStyle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  },

})