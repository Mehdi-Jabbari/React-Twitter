import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
       
        display:'flex',
       
        width:'100%',
        height:'100vh',
        overflow:'hidden'
    },

   

    leftSidebar:{
        backgroundColor:'white',
        width:'25%',
    },
    mainPart:{
        backgroundColor:'gray',
        flex:1,
        
        overflowY:'auto',
    },

    divider:{
        backgroundColor:"lightblue !important",
        width:'1px !important',
        height:'100%',

    },
    waitParent:{
        display:'flex',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center", 
        position:"absolute",
        top:0,
        left:0,
        width:'100%',
        height:'100vh'
    }
});

export default useStyles;