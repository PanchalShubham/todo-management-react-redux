import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import Logo from '../../assets/logo.jpg';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: "0px 10px"
    }
}));

export default function HomepageUI(props) {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(null);
    if (redirect)   return redirect;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} src={Logo} />
                <Typography component="h1" variant="h5">
                    TodoApp
                </Typography>
                <div>
                    <p>
                        A simple todo-management system written for tutorial/blog purposes!
                        The following are the major concepts covered: <br />
                    </p>
                    <ul>
                        <li>ReactJs functional components and hooks</li>
                        <li>Routing in ReactJs</li>
                        <li>Private & Public routes</li>
                        <li>Use of Context API</li>
                        <li>Use of Redux</li>
                        <li>Deployment to GitHub Pages</li>
                    </ul>
                    <p><strong>For demonstration purposes no database is used and your data is lost if you reload the page!</strong></p>
                    <div>
                        <Button variant="contained"
                            color="primary" className={classes.button}
                            onClick={() => setRedirect(<Redirect to="/signin" />)}>
                            SignIn
                        </Button>
                        <Button variant="contained"
                            color="primary" className={classes.button}
                            onClick={() => setRedirect(<Redirect to="/signup" />)}>
                            SignUp
                        </Button>
                    </div>
                </div>

            </div>
        </Container>
    );
}
