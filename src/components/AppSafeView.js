
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

const AppSafeView = ({ children, style }) => {
  const theme = useColorScheme() ?? "light";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor:
              theme == "light" ? "#FFFFFF" : theme == "dark" && COLORS.black,
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppSafeView;
