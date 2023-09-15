import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, STYLES } from '../constants/theme';
import { Dialog } from 'react-native-paper';
import AppText from './AppText';
import AppButton from './AppButton';
import { formatDate, formatTimestamp } from '../constants/functions';

const CreateTaskDialog = ({
    visible,
    setvisible,
    showDatepicker,
    showStartTimePicker,
    date,
    startTime,
    onPress,
    name,
    description,
    setName,
    setDescription,
}) => {
    const onPressFunc = () => {
        onPress();
        setvisible(false);
    };
    return (
        <Dialog visible={visible}
            onDismiss={() => setvisible(false)}
            style={styles.modalContainer}>
            <View style={{ padding: SIZES.base }}>
                <AppText bold={true} style={{ bottom: 10 }}>Add Task Details</AppText>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                    <View>
                        <AppText style={styles.smallText}>Name</AppText>
                        <TextInput value={name} style={styles.textInput} onChangeText={(t) => setName(t)} />
                    </View>
                    <TouchableOpacity onPress={showDatepicker}>
                        <AppText style={styles.smallText}>Date</AppText>
                        <TextInput editable={false} value={`${formatDate(date)}`} style={styles.textInput} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showStartTimePicker}>
                        <AppText style={styles.smallText}>Time</AppText>
                        <TextInput editable={false} value={`${formatTimestamp(startTime)}`} style={styles.textInput} />
                    </TouchableOpacity>
                    <View>
                        <AppText style={styles.smallText}>Description</AppText>
                        <TextInput multiline={true} value={description}
                            style={{ ...styles.textInput, height: 100, textAlignVertical: 'top' }} onChangeText={(t) => setDescription(t)} />
                    </View>
                    <AppButton title={'Submit'} onPress={onPressFunc} style={{ marginVertical: SIZES.base }} />
                </ScrollView>
            </View>
        </Dialog>
    );
};

export default CreateTaskDialog;

const styles = StyleSheet.create({
    smallText: {
        fontSize: SIZES.h6,
        alignSelf: "stretch",
        marginVertical: SIZES.base1 * .6
    },

    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 8,
        height: '60%',
        justifyContent: 'center',
    },
    textInput: {
        height: SIZES.largeTitle * .95,
        padding: SIZES.base,
        borderRadius: SIZES.base1,
        borderColor: COLORS.gray,
        borderWidth: .5,
        fontSize: SIZES.h6,
        color: COLORS.gray,

    }
});
