import React, { Component } from 'react';
import setAuthToken from '../authToken';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
class profile extends Component{
    
    componentDidMount(){
        axios.get('/users/data').then(res=>{
          //console.log(res);
          this.setState({
              ...this.state,
              data:res.data
          })
        })
        .catch(err=>console.log(err));
    }
    state={
        data:[],
    }
   
     onClickhandler=(el)=>{
        //console.log(el);
 
    //console.log(this.state);

 const sendElement={
     userId:this.props.location.state.id,
     id:el.id,
     name:el.name,
     phone:el.phone,
     time:el.time
 }

 console.log(sendElement);
  axios.post('/users/book',sendElement).then(res=>{
      //console.log(res);
       alert(res.data.message);
  }).catch(err=>console.log(err));


}

signOuthandler = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  this.props.location.state.id='';
  this.props.history.push('/login');
};

bookingHandler=()=>{
    this.props.history.push({
        pathname:'/bookings',
        state:{
            id:this.props.location.state.id,
            token:this.props.location.state.token
        },
    })
}
    
    
    render(){
        
    
        
        
        if(!this.props.location.state)
        {
            this.props.history.push('/login');
            return(<h1>wtf</h1>)
        }
        else
        {
        if(this.props.location.state&&(this.props.location.state.token!==axios.defaults.headers.common["Authorization"]))
        {localStorage.removeItem("jwtToken");
          setAuthToken(false);
          this.props.history.push('/login');
        }

        //console.log(this.state.data);
         let dArray= this.state.data.map(el=>{
           return( 
           <div  key={el.id} >
            <div >
              <div className="card">
                <span className="card-title center" style={{color:'red'}}>{el.name}</span>
              <div className="card-content">
                  <p>Dr.{el.name} is available on this date and time {el.time}.
                     You can contact him with this number {el.phone}</p>
                </div>
                <div className="card-action">
                  <button className="btn waves-effect"  onClick={()=>this.onClickhandler(el)}>book</button>
                </div>
              </div>
            </div>
          </div>
          )
        })
        return(
            <div>
              <nav>
               <div class="nav-wrapper">
        
            <ul id="nav-mobile" class="left " style={{color:'black', fontSize:'20pc'}}>
          <li><a onClick={this.bookingHandler}>MY BOOKINGS</a></li>
           <li><a onClick={this.signOuthandler}>SIGN OUT</a></li>
        
           </ul>
             </div>
           </nav>
        <h2 style={{color:'blue'}}>Welcome {this.props.location.state.name} to your profile</h2>
        <h4>here are the details of the doctor,u can schedule your booking</h4>
          <div style={{width:'70%',display:'flex'}}>
            <div className="row" style={{flex:'1'}}>
         <div className="col s9 offset-s9" >{dArray.slice(0,7)}</div>
         </div>
         <div className="row" style={{flex:'1'}}>
         <div className="col s9 offset-s9" >{dArray.slice(7,14)}</div>
         </div>
         <div className="row" style={{flex:'1'}}>
         <div className="col s9 offset-s9" >{dArray.slice(14,20)}</div>
         </div>
         </div>

            </div>
        )
        }
        
        
        
        
    }
}

export default withRouter(profile);