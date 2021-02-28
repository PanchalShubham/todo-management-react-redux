import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import DashboardContext from '../context/DashboardContext';


const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    error: {
        color: "red",
        fontSize: "10px"
    },
    transparent: {
        fontSize: "10px",
        opacity: 0
    }
}));

export default function ModalUI(props) {
    const classes = useStyles();
    const {
        setShowDeleteModal,
        emptyTrashHandler
    } = useContext(DashboardContext);
    const onSubmitHandler = () => {
        setShowDeleteModal(false);
        emptyTrashHandler();
    }
    return (
        <div>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className={classes.header}>
                        <span>Empty Trash</span>
                        <IconButton onClick={() => setShowDeleteModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>
                            Are you sure you want to empty your trash? <br/>
                            This is a potentially destructive operation and changes cannot be undone.
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteModal(false)} 
                        color="secondary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={onSubmitHandler} color="primary">
                        Empty
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
