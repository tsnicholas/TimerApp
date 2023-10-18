import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    app: {
      flex: 1,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        gap: 5,
    },
    scrollContainer: {
        flex: 1,
        alignSelf: "flex-start", 
        width: "100%",
    },
    input: {
        fontSize: 20,
        flex: 1,
        borderWidth: 1,
        padding: 3,
        width: 100,
    },
    TimerInput: {
        flexDirection: "row",
    },
    avoidingView: {
        flex: 1,
    }
});

export default styles;
