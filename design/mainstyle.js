import {StyleSheet } from 'react-native';

const mainStyle = StyleSheet.create({
    formContainer: {
        marginHorizontal:"10%",
        marginVertical:"15%",
      },
      estimateMain: {
        padding:20,
        backgroundColor:"#fff",
        borderRadius:20,
      },
      
      allContainers: {
        
      },
      questionContainer:{
        fontSize:20,
      },
      btns: {
        flexDirection: "row",
        color:"grey",
        padding:20,
        alignSelf: 'center',
      },
      submitBtns: {
        backgroundColor:'black',
        color:"grey",
        
      },
      nextBtns: {
        backgroundColor:'#0C59B6',//main color
        padding:20,
        paddingRight:200,
        alignItems:'center',
      },


})

export default mainStyle;