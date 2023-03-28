import { KeyboardAvoidingView, Modal, Pressable, SafeAreaView, View, Text ,Image, TouchableOpacity} from "react-native"
import {SimpleLineIcons} from '@expo/vector-icons';

const ArrowButton = ({iconName, onPress, disabled}) => {
    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{justifyContent:"center" ,paddingHorizontal:20, height:"100%"}} >
            <SimpleLineIcons 
                name={iconName}
                size = {20}
                color ={disabled ? "transparent" : "black"} 
            />
        </TouchableOpacity>
    )
}

export default ({
    modalVisible,
    onPressBackdrop,
    selectedImage,
    onPressLeftArrow,
    onPressRightArrow,
    showPreviousArrow,
    showNextArrow,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <Pressable 
                onPress={onPressBackdrop} 
                style={{
                    flex:1, 
                    backgroundColor:"rgba(115,115,115,0.5)",
                    justifyContent : "center",
                    alignItems : "center",
                }}>
                <View style={{flexDirection:"row", alignItems:"center"}} >
                    
                    <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow}/>
                    
                    
                    <Pressable>
                        <Image 
                            source={{uri:selectedImage?.uri}} 
                            style={{width : 300, height:300, backgroundColor:"white"}} 
                            resizeMode="contain"/>
                    </Pressable>
                    
                    <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow}/>
                    

                    
                </View>
                
                

            </Pressable>
        </Modal> 
        
    )
}