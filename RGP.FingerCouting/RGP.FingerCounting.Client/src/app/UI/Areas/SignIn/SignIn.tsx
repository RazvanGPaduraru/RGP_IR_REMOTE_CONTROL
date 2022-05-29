import React, { createRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import AuthContext, { useAuth } from "../../../Contexts/AuthContext";
import {  useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {LinearGradient} from 'expo-linear-gradient';
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../Screens/AuthStackParamsList";
import { useNavigation } from "@react-navigation/native";
import { Constants } from "../../../Constants/Constants";

type authScreens = StackNavigationProp<AuthStackParamList, 'SignIn'>;

const SignIn = () => {
  const { signed, user, signIn } = useAuth();
  const [userName, setuserName] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassowrd] = useState(true);
  const [isValiduserName, setIsValiduserName] = useState(true);
  const [checkTextInputChange, setTextInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { colors } = useTheme();
  const navigation = useNavigation<authScreens>();

  const handleSignIn = async () => {
    const response = await signIn(userName, password).catch(err => {
      Alert.alert(
        'Hey There!',
        err,
        [
          {text: 'Yes', onPress: () => console.log(err)},
          {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    });
  };

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setuserName(val);
      setIsValidPassowrd(true);
      setTextInputChange(true);
    } else {
      setPassword(val);
      setIsValidPassowrd(false);
      setTextInputChange(false);
    }
  };

  const handlePasswordChange = (val: string) => {
    if (val.trim().length >= 8) {
      setPassword(val);
      setIsValidPassowrd(true);
    } else {
      setPassword(val);
      setIsValidPassowrd(false);
    }
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleValidUser = (val: string) => {
    if (val.trim().length >= 4) {
      setIsValiduserName(true);
    } else {
      setIsValiduserName(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ScrollView>

        
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          User Name
        </Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />

          <TextInput
            placeholder="Your username"
            value={userName}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setuserName(val)}
          />
          {checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {isValiduserName ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              userName must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            value={password}
            secureTextEntry={secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#01A7C2", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              handleSignIn();
            }}
          >
            <LinearGradient
              colors={[Constants.appButtonBackground, Constants.appButtonBackground]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[
              styles.signIn,
              {
                borderColor: "#01A7C2",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
            
              style={[
                styles.textSign,
                {
                  color: "#01A7C2",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.appBackgroundColor,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignIn;
