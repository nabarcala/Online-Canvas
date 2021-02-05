import { makeStyles } from '@material-ui/core/styles'; 

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  search: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));