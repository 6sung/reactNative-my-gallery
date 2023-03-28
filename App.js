import {SafeAreaView, Button, StyleSheet, Text, View ,Image, FlatList, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from './src/TextInputModal';
import BigImgModal from './src/BigImgModal';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;

export default function App() {
  const {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputmodalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    BigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
    
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  }
  const onLongPressImage = (imageId) => {
    deleteImage(imageId);
  }
  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };
  const onPressHeader = () => {
    if(isDropdownOpen){
      closeDropDown();
    }else{
      openDropDown();
    }
  };
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  }
  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressWatchAd = () => {

  };
  const onPressAddAlbum = () => {
    if(albums.length >= 2){
      Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다","",[
        {
          style:"cancel",
          text:"닫기"
        },
        {
          text:"광고 시청",
          onPress : onPressWatchAd,
        }
      ])
    } else{
      openTextInputModal();
    }
    
  };

  const onSubmitEditing =() => {
    if(!albumTitle) return;

    //앨범에 타이틀 추가
    addAlbum();
    // textinput 의 value 초기화
    closeTextInputModal();
    //modal 닫기
    resetAlbumTitle();
  }
  const onPressImage= (image) => {
    selectImage(image);
    openBigImgModal();
  };
  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  };
  const onPressLeftArrow = () => {
    moveToPreviousImage();
  }
  const onPressRightArrow = () => {
    moveToNextImage();
  }

  
  const renderItem = ({item : image, index}) => {
    const {id,uri} = image;
    
    if(id === -1){
      return(
        <TouchableOpacity 
          onPress={onPressOpenGallery}
          style={{
            width:columnSize, 
            height:columnSize,
            backgroundColor:"lightgrey",
            justifyContent : "center",
            alignItems : "center",
          }}>
          <Text style={{fontWeight:"100",fontSize:50}}>+</Text>
        
        </TouchableOpacity>
      )
    }
    return(
      <TouchableOpacity onPress={()=>onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
        <Image source={{uri}} style={{width:columnSize,height:columnSize}} />
      </TouchableOpacity>
    ); 
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼*/}
      <MyDropDownPicker
        onPressHeader={onPressHeader}
        isDropdownOpen={isDropdownOpen}
        selectedAlbum = {selectedAlbum} 
        onPressAddAlbum={onPressAddAlbum}
        albums={albums}  
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />
      
      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal 
        modalVisible={textInputmodalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      {/*이미지를 크게보는 Modal*/}
      <BigImgModal 
        modalVisible={BigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <FlatList 
        data={imagesWithAddButton} 
        renderItem={renderItem} 
        numColumns={3}
        style={{zIndex:-1}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : Platform.OS === 'android' ? 30 : 0,
    //justifyContent:"center",
    //alignItems:"center",
  },
});
