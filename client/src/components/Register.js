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

  let history=useHistory();
  let [errors,setErrors]=useState("");
  
  let pname="",pemail="",ppassword="";

  const submitHandler=(e)=>{
       e.preventDefault();

       const newUser={
           name:pname,
           email:pemail,
           password:ppassword
       };
       
       document.getElementById("name").value = "";
       document.getElementById("email").value = "";
       document.getElementById("password").value = "";
    

       axios.post('/users/register',newUser).then(res=>{
           //console.log("going to login");
           history.push('/login');
       }).catch(err=>{
       // console.log(err.response.data);
           setErrors(err.response.data);
           
       })
       //console.log(newUser);
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="text"
              autoComplete="text"
              autoFocus
               helperText={errors.name}
              onChange={(e)=>{pname=e.target.value}}
              error={errors.name?true:false}
            />
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
              helperText={errors.email}
              onChange={(e)=>{pemail=e.target.value}}
              error={errors.email?true:false}
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
              helperText={errors.password}
              onChange={(e)=>{ppassword=e.target.value}}
              error={errors.password?true:false}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Sign Up
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/login">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
