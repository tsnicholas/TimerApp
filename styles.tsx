import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
    app: {
      flex: 1,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
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
        borderColor: "gray",
        borderWidth: 1,
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
        backgroundColor: "#0a84ff",
    },
    plusButton: {
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
        paddingTop: 10,
        paddingBottom: 20,
        alignContent: "center",
        justifyContent: "center",
        margin: 5,
        gap: 5,
    },
});

export default sharedStyles;
