import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {

        backgroundColor: 'lightgray',
        flex: 1,
        flexDirection:"column",
        overflowY:'auto'
    },
    header: {
        backgroundColor: 'white',
        paddingTop:'1rem',
        padding: 18,
        display: 'flex',
        flexDirection:"column",
       
    },
    headerTitle: {
        fontWeight: 600,
        fontSize: '1.2rem',
        marginRight: '0.5rem'
    },
    divider: {
        backgroundColor: "lightblue !important",

    },
    NewTweet: {
        backgroundColor: 'white',
        padding: 18,
        display: 'flex',
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginRight: '1rem',
        flex: 1,
        border: 'none',
        "&:focus": {
            outline: 'unset'
        },

    },

    tweetbtn: {
        borderRadius: '1rem !important',
        fontFamily: 'shabnam !important',
        minHeight: "30px !important"
    },
    tweeetPic: {
        borderRadius: '50%',
        border: "0.5px solid #333",
        //padding:"0.5rem",
        marginLeft: "1rem"
    },
    tweetItem: {
        backgroundColor: 'white',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        marginTop: '0.5rem'
    },
    name: {
        fontWeight: 600,
        marginRight:'1rem', 
    },
    id:{
        marginRight:'1rem'
    },
    tweetImg:{
        width: '10rem', height: '10rem' ,
        marginTop:'1rem',
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat'
    }
    
    
});

export default useStyles;