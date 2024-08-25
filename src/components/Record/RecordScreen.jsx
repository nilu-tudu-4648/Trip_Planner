import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
} from "react-native";
import Record from './Record';

export default function RecordScreen() {
  const [speechText, setSpeechText] = useState("");

  const handleSave = async () => {
    console.log("Saved: ", speechText);
    // Add your save logic here
    Keyboard.dismiss(); // Hide the keyboard after saving
  };

  const handleClear = () => {
    setSpeechText("");
    Keyboard.dismiss(); // Hide the keyboard after clearing
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Speech Text</Text>
        <TextInput
          multiline
          style={styles.textInput}
          numberOfLines={6}
          value={speechText}
          maxLength={500}
          editable={true}
          onChangeText={(text) => setSpeechText(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            color={"#007AFF"}
            onPress={handleSave}
          />
          <Button
            title="Clear"
            color={"#007AFF"}
            onPress={handleClear}
          />
        </View>
      </View>
      <View style={styles.voiceContainer}>
        <Record
          onSpeechEnd={(value) => {
            if (value && value.length > 0) {
              setSpeechText(value[0]);
            }
          }}
          onSpeechStart={() => {
            setSpeechText("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
  },
  textInput: {
    padding: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  voiceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
