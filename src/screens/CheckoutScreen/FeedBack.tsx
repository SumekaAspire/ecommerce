import {View,Text,StyleSheet,TextInput} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import LinkHandler from "../../components/LinkHandler";
import { textData } from "../../constants/text";
import Button from "../../components/Button";

/**
 * FeedBack component - contains ratings for the user experience and user space for written feedback
 * @returns Feedback Ui
 */
const Feedback = () => {
  const navigation: any = useNavigation();

  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  //handles submit button
  const handleSubmit = () => {
    console.log("Rating:", rating);
     //navigates to HomeScreen once user clicked Submit Button
    navigation.navigate("HomeTab");
  };
  // Directly navigates to Home Screen once user cliked skip without giving feedback
  const handleSkip = () => {
    navigation.navigate("HomeTab");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textData.textExperience}</Text>

      {/* Rating icons */}
      <View style={styles.ratingContainer}>
        <LinkHandler onPress={() => setRating(3)}iconComponent={ <Ionicons name={textData.happyOutlineIcon} size={40}color={rating === 3 ? colors.green : colors.grey} />}/>
        <LinkHandler onPress={() => setRating(2)}iconComponent={ <Ionicons name={textData.thumbsupOutlineIcon} size={40}color={rating === 2 ? colors.yellow : colors.grey} />}/>
        <LinkHandler onPress={() => setRating(1)}iconComponent={ <Ionicons name={textData.sadOutlineIcon} size={40}color={rating === 1 ? colors.PRIMARY_COLOR : colors.grey} />}/>
      </View>

      {/* Feedback box */}
      <TextInput
        style={styles.input}
        placeholder={textData.yourFeedback}
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      {/* Submit */}
      <Button onPress={handleSubmit} text={textData.submit} containerStyle={styles.submitBtn}/>

      {/* Skip */}
      <LinkHandler onPress={handleSkip} content={textData.skip} textStyle={styles.skipText} />
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  input: {
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: colors.grey,
  },
  submitBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  skipText: {
    marginTop: 15,
    textAlign: "center",
    color: colors.grey,
    fontSize: 14,
    fontWeight:"bold",
  },
});
