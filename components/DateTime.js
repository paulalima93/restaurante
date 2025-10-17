import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTime({date, setDate, hour, setHour}) {
    
    const [showDate, setShowDate] = useState(false);
    const [showHour, setShowHour] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDate(Platform.OS === "ios");
        if (selectedDate) setDate(selectedDate);
    };

    const onChangeHour = (event, selectedHour) => {
        setShowHour(Platform.OS === "ios");
        if (selectedHour) setHour(selectedHour);
    };
    return (
        <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
            <Button title="Selecionar Data" onPress={() => setShowDate(true)} />

            <View style={{marginBottom: 20}}></View>
            
            <Button title="Selecionar Hora" onPress={() => setShowHour(true)} />

            <Text style={{ marginTop: 20, color: 'white' }}>
                Data selecionada: {date.toLocaleDateString()}
            </Text>

            <Text style={{ marginTop: 20, color: 'white' }}>
                Hora selecionada: {hour.toLocaleTimeString()}
            </Text>

            {showDate && (
                <DateTimePicker
                    value={date}
                    mode="date" // "date" | "time" | "datetime"
                    display="default" // "default" | "spinner" | "calendar" | "clock"
                    onChange={onChangeDate}
                />
            )}

            {showHour && (
                <DateTimePicker
                    value={hour}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeHour}
                />
            )}
        </View>
    );
}
