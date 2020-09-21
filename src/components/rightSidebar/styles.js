import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles({
   

    root:{
        backgroundColor:'white',
        width:'18%',
        padding:'1.5rem 1rem',
        overflowX:"hidden",
        overflowY:'auto'
    },

    logoType:{
        fontSize:'1.25rem !important' ,
        fontWeight:'600 !important',
        paddingRight:'20px',
        color:'#5ea9dd'
    
    },
    hashTagTitle:{
        fontSize:'1.25rem !important' ,
        fontWeight:'600 !important',
        marginTop:'1.5rem',
        marginBottom:'3rem'
    },
    hashTag:{
        marginRight:"0.8rem"
    },
    button:{
        width:'100% !important',
        marginBottom:'1rem'
    }
});

export default useStyles;