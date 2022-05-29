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

type Props = StackScreenProps<DashboardStackParamsList, "Buttons">;
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const ButtonsView = (props: Props) => {
  const remoteId = props.route.params.remoteId;
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [buttons, setButtons] = useState<AppButton[]>([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [buttonDescription, setButtonDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [buttonId, setButtonId] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { colors } = useTheme();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        setError("");
        setLoading(false);
        setVisible(false);
        setButtonName("");
        setButtonDescription("");
        setIsEditMode(false);
        setButtonId("");
      };
    }, [])
  );

  const fetchButtons = async () => {
    setLoading(true);
    try {
      const response = await ButtonsService.getAllButtons(remoteId);
      setButtons(response);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchButtons();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await ButtonsService.insertButton({
        name: buttonName,
        description: buttonDescription,
        remoteId: remoteId,
      });
      setButtonDescription("");
      setButtonName("");
      hideModal();
      fetchButtons();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await ButtonsService.updateButton({
        id: buttonId,
        name: buttonName,
        description: buttonDescription,
        remoteId: remoteId,
      });
      setButtonDescription("");
      setButtonName("");
      hideModal();
      fetchButtons();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const onButtonClick = (button: AppButton) => {
    setIsEditMode(true);
    setButtonName(button.name as any);
    setButtonDescription(button.description as any);
    showModal();
  };

  const renderButtons = () => {
    if (loading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <View>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
          </DataTable.Header>
          {buttons.map((button) => (
            <DataTable.Row
              key={button.id}
              onPress={() => onButtonClick(button)}
            >
              <DataTable.Cell>{button.name}</DataTable.Cell>
              <DataTable.Cell>{button.description}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
  };

  const editButtonModal = () => {
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
              style={styles.input}
              placeholder="Button Name"
              value={buttonName}
              onChangeText={(text) => setButtonName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Button Description"
              value={buttonDescription}
              onChangeText={(text) => setButtonDescription(text)}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => {
                  handleUpdate();
                }}
              >
                update
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setIsEditMode(false);
                }}
              >
                Cancel
              </Button>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                setIsEditMode(false);
              }}
              style={{
                marginTop: 10,
                width: "80%",
              }}
            >
              Press Button
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has now been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Button name"
            onChangeText={(text) => setButtonName(text)}
            value={buttonName}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            onChangeText={(text) => setButtonDescription(text)}
            placeholder="Description"
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
                hideModal();
              }}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        >
        <View style={styles.container}>
          {editButtonModal()}
          {renderModal()}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              showModal();
            }}
          >
            <Text style={styles.buttonText}>Add Button</Text>
          </TouchableOpacity>
          {renderButtons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    color: "#2AC062",
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
