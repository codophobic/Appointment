import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../authToken';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/8u_2imJaVQs)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  let pemail="",ppassword="";
  let [errors,setErrors]=useState({
    email:'',
    password:''
  });
   let history= useHistory();
  const onSubmitHandler=e=>{
      e.preventDefault();
      const user={
          email:pemail,
          password:ppassword
      }
       
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      axios
    .post("/users/login", user)
    .then(res => {
      //console.log(res.data);
       const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      //console.log(token + " "+ decoded);
      history.push({
        pathname:'/profile',
        state:res.data
      });
      
    })
    .catch(err =>
        { console.log(err.response.data);
        setErrors(err.response.data);
       
        }
      
    );

      //console.log(user);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>pemail=e.target.value}
              error={errors.email?true:false}
              helperText={errors.email?errors.email:""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>ppassword=e.target.value}
              helperText={errors.password}
              error={errors.password?true:false}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmitHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
