import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
    },
    box: {
        width: '100%',
        marginBottom: '30px',
    },
    input: {
        margin: '30px 0',
    },
    item: {
        margin: '5px',
    }

}));