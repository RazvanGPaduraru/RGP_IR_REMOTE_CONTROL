import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  Text,
  TouchableOpacity,

} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, DataTable, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../../../Contexts/AuthContext";
import { Remote } from "../../../Models/Remote";
import { DashboardStackParamsList } from "../../../Screens/DashboardStackParamsList";
import RemotesService from "../../../Services/Core/RemotesService";
import { CommonActions } from '@react-navigation/native';
type Props = StackScreenProps<DashboardStackParamsList, "Remotes">;

type authScreens = StackNavigationProp<DashboardStackParamsList, 'Remotes'>;

const RemotesView = (props) => {
  const navigation = useNavigation<authScreens>();
  const [remotes, setRemotes] = useState<Remote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [remoteName, setRemoteName] = useState("");
  const [description, setDescription] = useState("");
  const { colors } = useTheme();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused

  //     return () => {
  //       setError("");
  //       setLoading(false);
  //       setVisible(false);
  //       setRemotes([]);

  //     };
  //   }, [])
  // );

  useEffect(() => {
    fetchRemotes();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      fetchRemotes();
  });

  return willFocusSubscription;
  }, []);

  const fetchRemotes = async () => {
    setLoading(true);
    try {
      const response = await RemotesService.getAllRemotes();
      setRemotes(response);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await RemotesService.insertRemote({
        name: remoteName,
        description: description,
      });
      setDescription("");
      setRemoteName("");
      hideModal();
      fetchRemotes();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRemoteDelete = async (remoteId: string) => {
    setLoading(true);
    try {
      await RemotesService.deleteRemote(remoteId);
      fetchRemotes();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    fetchRemotes();
  }, []);

  const onRemotePress = (remoteId, remoteName) =>{
    props.navigation.setParams({remoteId:undefined, remoteName:undefined});
    //navigation.navigate('Buttons', {remoteId: remoteId, remoteName : remoteName})
    console.log(remoteId)
    navigation.dispatch(CommonActions.navigate({
      name: 'Buttons',
      params : {
        remoteId: remoteId, remoteName : null

      }
    }))
  }

  const renderRemotes = () => {
    if (loading) {
      return <ActivityIndicator />;
    }

    if (error) {
      return <View>{error}</View>;
    }

    return (
      <View style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Description</DataTable.Title>
          </DataTable.Header>
          {remotes.map((remote) => (
            <DataTable.Row key={remote.id} onPress = {() => {onRemotePress(remote.id, remote.name)}}>
              <DataTable.Cell>{remote.name}</DataTable.Cell>
              <DataTable.Cell numeric>{remote.description}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
  };
  const renderModal = () => {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has now been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
         
          
          <TextInput
            style={styles.input}
            placeholder="Remote name"
            placeholderTextColor="lightgray" 
            value={remoteName}
            onChangeText={(text) => setRemoteName(text)}
          />
          <TextInput
            style={[styles.input, { height: 100}]}
            placeholder="Description"
            placeholderTextColor="lightgray" 
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
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

        </View>
      </Modal>
    );
  };

  if(loading){
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {renderModal()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          showModal();
        }}
      >
        <Text style={styles.buttonText}>Add remote</Text>
      </TouchableOpacity>
      {renderRemotes()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  table: {
    width: "100%",
    marginTop: 20,
    display: "flex",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
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
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    padding: 35,
    alignItems: "center",

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

export default RemotesView;
function useFocusEffect(arg0: () => () => void) {
  throw new Error("Function not implemented.");
}

