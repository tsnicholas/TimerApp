import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
    app: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 25,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        margin: 5,
        gap: 5,
    },
    scrollContainer: {
        flex: 1,
        alignSelf: "flex-start", 
        width: "100%",
        padding: 5,
        gap: 5,
        borderWidth: 2,
    },
    textBox: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: "black",
        padding: 3,
        margin: 5,
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignContent: "center",
        padding: 10,
    },
    plusButton: {
        backgroundColor: "#0a84ff",
    },
    plusIcon: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#dddddd",
        padding: 20,
        alignContent: "center",
        justifyContent: "center",
        margin: 10,
        gap: 5,
    },
});

export default sharedStyles;
