import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor:'white',
        width:'25%',
        padding:'1.5rem 1rem',
        overflowY:"auto"
    },
    tweeter:{
        backgroundColor:"#f5f8fa",
        marginTop:'3rem',
        borderRadius:'2.5rem',
        padding:'11px 24px',
        display:"flex",
        //overflowY:"auto !important"
    },
    typo:{
        marginBottom:'1rem'
    }
   
});

export default useStyles;