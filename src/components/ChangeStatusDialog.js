import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, RadioButton, Button } from "react-native-paper";
import { SIZES } from "../constants/theme";

const ChangeStatusDialog = ({ visible, setVisible, setValueChange }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    setValueChange(status);
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.modalContainer}
      >
        <Dialog.Title>Change Status</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(newValue) => setStatus(newValue)}
            value={status}
          >
            <View style={styles.radioButtonRow}>
              <RadioButton value="true" />
              <Button onPress={() => setStatus("true")}>True</Button>
            </View>
            <View style={styles.radioButtonRow}>
              <RadioButton value="false" />
              <Button onPress={() => setStatus("false")}>False</Button>
            </View>
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={handleSubmit}>Submit</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangeStatusDialog;

const styles = StyleSheet.create({
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base1,
  },
});
