import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { Constants } from "../../../Constants/Constants"




export const Support = () =>{

    return(
        <View style={styles.container}>
            <Text>Contact Form</Text>
            <View>
                <Text>Name</Text>
                    <TextInput/>
                <Text>Email:</Text>
                    <TextInput/>
                <Text>Contact Number (Optional):</Text>
                    <TextInput/>
                
                <Text>Message</Text>
                    <TextInput multiline={true}
                     numberOfLines={4}/>
                
                


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: Constants.appBackgroundColor
   },
   inputBox: {
    color: "black",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    padding: 10,
    width: "80%",
    alignSelf: "center",

   }

})