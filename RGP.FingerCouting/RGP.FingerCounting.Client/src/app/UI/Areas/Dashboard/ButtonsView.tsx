import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable, useTheme, Button } from "react-native-paper";
import { AppButton } from "../../../Models/AppButton";
import { DashboardStackParamsList } from "../../../Screens/DashboardStackParamsList";
import ButtonsService from "../../../Services/Core/ButtonsService";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Feather";

type Props = StackScreenProps<DashboardStackParamsList, "Buttons">;


const ButtonsView = ({navigation, route}) => {
  const {remoteId} = route.params;
  //const { navigation } = props;
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const [buttons, setButtons] = useState<AppButton[]>([]);
  const [error, setError] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonDescription, setButtonDescription] = useState("");
  const [buttonId, setButtonId] = useState<string>("");

  const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const [isInsertModalVisible, setIsInsertModalVisibl] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(true);


  const showEditModal = () => setisEditModalVisible(true);
  const hideEditModal = () => setisEditModalVisible(false);

  const showInsertModal = () => setIsInsertModalVisibl(true);
  const hideInsertModal = () => setIsInsertModalVisibl(false);
  


  const { colors } = useTheme();

  const [isEditMode, setIsEditMode] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchButtons();
  }, []);

  // useEffect(() => {
  //   fetchButtons();
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     fetchButtons();
  // },[]);

  // return willFocusSubscription;
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        setError("");
        setisLoading(false);
        setisEditModalVisible(false);
        setButtonName("");
        setButtonDescription("");
        setIsEditMode(false);
        setButtonId("");
        
      };
    }, [])
  );

  const fetchButtons = async () => {
    console.log('-----' + remoteId);
    setisLoading(true);
    try {
      const response = await ButtonsService.getAllButtons(remoteId);
      setButtons(response);
    } catch (err: any) {
      setError(err.message);
    }
    setisLoading(false);
  };

 

  const handleSubmit = async () => {
    setisLoading(true);
    try {
      await ButtonsService.insertButton({
        name: buttonName,
        description: buttonDescription,
        remoteId: remoteId,
      });
      setButtonDescription("");
      setButtonName("");
      hideInsertModal();
      fetchButtons();
    } catch (err: any) {
      setError(err.message);
    }
    setisLoading(false);
  };

  const handleUpdate = async () => {
    setisLoading(true);
    try {
      await ButtonsService.updateButton({
        id: buttonId,
        name: buttonName,
        description: buttonDescription,
        remoteId: remoteId,
      });
      setButtonDescription("");
      setButtonName("");
      hideEditModal();
      fetchButtons();
    } catch (err: any) {
      setError(err.message);
    }
    setisLoading(false);
    setButtonDescription("");
    setButtonName("");
    hideEditModal();
  };

  const onButtonClick = (button: AppButton) => {
    setButtonId(button.id);
    setButtonName(button.name);
    setButtonDescription(button.description);   
    setIsEditMode(true);
    showEditModal();
  };


  const renderButtons = () => {
   
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <View>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title>Send command</DataTable.Title>
          </DataTable.Header>
          {buttons.map((button) => (
            <DataTable.Row
              key={button.id}
              onPress={() => onButtonClick(button)}
            >
              <DataTable.Cell>{button.name}</DataTable.Cell>
              <DataTable.Cell>{button.description}</DataTable.Cell>
              <DataTable.Cell style={styles.centeredInDiv} onPress={() => pressButton(button.id)}><Icon name="send" style={styles.centeredInDiv} size={20}/> </DataTable.Cell>
              {/* <DataTable.Cell><Button mode="contained" onPress={() => onButtonPress(button)}> Press</Button></DataTable.Cell> */}
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
  };

  const renderEditButtonModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditMode}
        onRequestClose={() => {
          setIsEditMode(false);
          
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Button</Text>
            <TextInput
              style={isReadOnly ? styles.readonlyInput : styles.input}
              editable = {!isReadOnly}
              placeholder="Button Name"
              placeholderTextColor="lightgray" 
              value={buttonName}
              onChangeText={(text) => setButtonName(text)}
            />
            <TextInput
              style={isReadOnly ? styles.readonlyInput : styles.input}
              placeholder="Button Description"
              placeholderTextColor="lightgray" 
              editable = {!isReadOnly}
              value={buttonDescription}
              onChangeText={(text) => setButtonDescription(text)}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={isReadOnly ? () => setIsReadOnly(false) : () => {
                  handleUpdate();
                }}
              >
                {isReadOnly? "Edit" : "Update"}
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setIsEditMode(false);
                  setIsReadOnly(true);
                }}
              >
                Cancel
              </Button>
            </View>
            
          </View>
        </View>
      </Modal>
    );
  };

  const renderCreateButtonModal = () => {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isInsertModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has now been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholderTextColor="lightgray" 
            placeholder="Button name"
            onChangeText={(text) => setButtonName(text)}
            value={buttonName}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            onChangeText={(text) => setButtonDescription(text)}
            placeholder="Description"
            placeholderTextColor="lightgray" 
            multiline={true}
            numberOfLines={4}
            value={buttonDescription}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => {
                handleSubmit();
              }}
            >
              Add
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                hideInsertModal();
              }}
            >
              Cancel
            </Button>
           
          </View>
        </View>
        </View>
      </Modal>
    );
  };

  const pressButton = async (buttonId:string) =>{
    setisLoading(true);
    try {
      console.log(buttonId)
      await ButtonsService.pressButton(buttonId);
      
    } catch (err: any) {
      setError(err.message);
    }
    setIsEditMode(false);
    setisLoading(false);
  }

  return(
    isLoading == true ? <ActivityIndicator /> : 
    <SafeAreaView>
    <ScrollView
      >
      <View style={styles.container}>
        {renderEditButtonModal()}
        {renderCreateButtonModal()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setButtonDescription(null)
            setButtonId(null)
            setButtonName(null)
            showInsertModal();
          }}
        >
          <Text style={styles.buttonText}>Add Button</Text>
        </TouchableOpacity>
        <View>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title>Send command</DataTable.Title>
          </DataTable.Header>
          {buttons.map((button) => (
            <DataTable.Row
              key={button.id}
              onPress={() => onButtonClick(button)}
            >
              <DataTable.Cell>{button.name}</DataTable.Cell>
              <DataTable.Cell>{button.description}</DataTable.Cell>
              <DataTable.Cell style={styles.centeredInDiv} onPress={() => pressButton(button.id)}><Icon name="send" style={styles.centeredInDiv} size={20}/> </DataTable.Cell>
              {/* <DataTable.Cell><Button mode="contained" onPress={() => onButtonPress(button)}> Press</Button></DataTable.Cell> */}
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      </View>
    </ScrollView>
  </SafeAreaView>

  )
}
    


const styles = StyleSheet.create({

  centeredInDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    padding: 25,
    flex: 1,
  },
  button: {
    display: "flex",
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  table: {
    marginTop: 20,
    display: "flex",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    padding: 35,
    alignItems: "center",
  },
  input: {
    color: "black",
    borderColor: "#2AC062",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
  readonlyInput:{
    backgroundColor: "#E5E4E2",
    color: "black",
    borderColor: "#2AC062",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    padding: 10,
    width: "80%",
    alignSelf: "center",

  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
    height: 300,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ButtonsView;
