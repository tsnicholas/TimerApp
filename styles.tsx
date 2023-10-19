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
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignContent: "center",
        padding: 10,
        backgroundColor: "#0a84ff",
    },
    plusButton: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
});

export default styles;
