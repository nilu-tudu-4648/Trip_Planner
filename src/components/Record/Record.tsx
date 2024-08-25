import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { Easing } from "react-native-reanimated";

const Record = ({ onSpeechStart, onSpeechEnd }) => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechRecognized = handleSpeechRecognized;
    Voice.onSpeechEnd = handleSpeechEnd;
    Voice.onSpeechError = handleSpeechError;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechPartialResults = handleSpeechPartialResults;
    Voice.onSpeechVolumeChanged = handleSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const handleSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
    setStarted(true);
    onSpeechStart();
  };

  const handleSpeechRecognized = (e) => {
    console.log("onSpeechRecognized: ", e);
  };

  const handleSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
    setStarted(false);
    onSpeechEnd(e.value || []);
  };

  const handleSpeechError = (e) => {
    console.log("onSpeechError: ", e);
  };

  const handleSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
  };

  const handleSpeechPartialResults = (e) => {
    console.log("onSpeechPartialResults: ", e);
  };

  const handleSpeechVolumeChanged = (e) => {
    console.log("onSpeechVolumeChanged: ", e);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start("en-US");
      onSpeechStart();
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {started ? (
        <TouchableOpacity onPress={stopRecognizing}>
          <View style={styles.micContainer}>
            {[...Array(3).keys()].map((index) => (
              <MotiView
                from={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 4 }}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 200,
                  repeatReverse: false,
                  loop: true,
                }}
                key={index}
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.motiView,
                ]}
              />
            ))}
            <FontAwesome name="microphone-slash" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onLongPress={startRecognizing}>
          <View style={styles.micContainer}>
            <FontAwesome name="microphone" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  micContainer: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "#6E01EF",
    alignItems: "center",
    justifyContent: "center",
  },
  motiView: {
    backgroundColor: "#6E01EF",
    borderRadius: 75,
  },
});

export default Record;
