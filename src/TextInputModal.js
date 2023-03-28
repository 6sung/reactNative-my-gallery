import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, TextInput, View } from "react-native";

export default ({modalVisible, albumTitle, setAlbumTitle,onSubmitEditing, onPressBackdrop}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <KeyboardAvoidingView  
                behavior = {Platform.OS === "ios" ? "paddind" : "height"+10} 
                style={{flex:1}}>
                
                <Pressable onPress={onPressBackdrop} style={{flex:1}}>
                    <SafeAreaView style={{width : "100%", position:"absolute", bottom :0}}>
                        <TextInput 
                            style={{
                                width:"100%", 
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderWidth:0.5,
                                borderColor:"lightgrey"
                            }}
                            value ={albumTitle}
                            onChangeText = {setAlbumTitle}
                            placeholder = "앨범명을 입력해주세요"
                            onSubmitEditing={onSubmitEditing}
                            autoFocus={true}
                        />
                    </SafeAreaView>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal> 
        
    )
}