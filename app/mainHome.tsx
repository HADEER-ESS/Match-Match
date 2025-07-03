import ImagePicker from "@/components/ImagePicker";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "../constant/Color.js";

export default function MainHome() {
  return (
    <ScrollView
      style={styles.screenView}
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
    >
      <View style={styles.mainTitleContainer}>
        <Text style={styles.welcomingText}>Welcome to Matchy Matchy</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 1, width: '100%' }}>
          <Text style={styles.mainTextStyle} numberOfLines={2}>
            {"Discover Your Best \nCloth "}
            <Text style={[styles.mainTextStyle, { color: COLORS.pink, fontFamily: 'odd' }]}>MATCH!</Text>
          </Text>

          <Image
            source={require("../assets/images/header_start.webp")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>

      </View>
      <ImagePicker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%'
  },
  welcomingText: {
    fontFamily: 'regular',
    color: COLORS.gray,
    fontSize: 13
  },
  mainTitleContainer: {
    paddingVertical: 18,
    marginTop: 32,
    marginBottom: 32,
  },
  mainTextStyle: {
    color: COLORS.black,
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'semi_bold',
  },

})