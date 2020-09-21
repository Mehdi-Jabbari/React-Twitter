import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container:{
       backgroundColor:'white',
       width:"30rem",
       margin:"10rem auto",
       display:"flex",
       flexDirection:"column"
    
   },
   headertext:{
       margin:"1rem",
       alignSelf:"center"
   },
   tab:{
       flex:1,
       fontFamily:"shabnam !important"
   },
   containerInput:{
       margin:"1rem 0.8rem",
       display:'flex',
       flexDirection:"column"
   },
   btn:{
       fontFamily:"shabnam !important"
   }
    
});

export default useStyles;