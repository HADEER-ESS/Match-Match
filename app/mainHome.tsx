import ImagePicker from "@/components/ImagePicker";
import { StyleSheet, Text, View } from "react-native";

export default function MainHome() {
  return (
    <View
      style={styles.screenView}
    >
      <View style={styles.mainTitleContainer}>
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
    backgroundColor: "#ffffff"
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