import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Text, View, Modal, Pressable, } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


const TrashcanInfo = ({ showInfoDetail, setShowInfoDetail, setShowThisNum, trashInfoDetail }) => {

    return (
        <View style={styles.topView} >

            <Modal
                animationType="fade"
                transparent={true}
                visible={showInfoDetail}
            >
                <TouchableOpacity style={styles.topView} onPress={() => { setShowInfoDetail(false); setShowThisNum(-1); }} />
                <View style={styles.leftView}>
                    <View style={styles.modalView}>
                        <View style={styles.img}>
                            <Icon name="trash" size={65} color="#1BE58D" />
                        </View>
                        <View style={styles.text}>
                            <Text style={styles.modalText1}>{trashInfoDetail.cityName} {trashInfoDetail.streetName}</Text>
                            <Text style={styles.modalText1}>{trashInfoDetail.detailAddr}</Text>
                            <Text style={styles.modalText2}>{trashInfoDetail.location}</Text>
                            <Text style={styles.modalText3}>{trashInfoDetail.trashCanType}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute"
        //marginTop: 22,
    },
    container: {

    },
    leftView: {
        flex: 1,
        marginTop: 50,
    },
    modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
    },
    img: {
        margin: 15,
        width: 80,
        height: 80,
        borderRadius: 40,
        padding: 8,
        backgroundColor: "#E5E4E4",
        elevation: 0
    },
    text: {
        margin: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText1: {
        fontWeight: "bold",
        color: "black",
        fontSize: 17
    },
    modalText2: {
        textAlign: "left",
        fontSize: 14
    },
    modalText3: {
        marginTop: 15,
        fontSize: 17,
        color: "#12D3DD",
    }
});

export default TrashcanInfo;
