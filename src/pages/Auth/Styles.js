

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(4),
        width: '1',
        marginBottom: '20px',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center'
      },
    },
}));