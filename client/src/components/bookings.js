import React, { Component } from 'react';
import setAuthToken from '../authToken';
import {withRouter} from 'react-router-dom'
class bookings extends Component {
  
    state={
        books:[]
    }
    
    componentDidMount(){
        let uid= this.props.location.state.id;
        //console.log(uid);
        //console.log(sendData);
        fetch('/users/bookdata/'+uid,{
            method:"GET",
            headers:{
               "Content-Type":"application/json"
            }
        }).then(r=>r.json()).then(res=>{
             //console.log(res + typeof(res));
            
             this.setState({
                 ...this.state,
                 books:res.bookdata
             })
             /*console.log(res);
             console.log(this.state.books);*/


        }).catch(err=>{
             console.log(err);
        })
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

    render() {
       


        let dArray= this.state.books.map(el=>{
            return( 
            <div  key={el.id} >
             <div >
               <div className="card">
                 <span className="card-title center" style={{color:'red'}}>{el.name}</span>
               <div className="card-content">
                   <p>Your appointment with Dr.{el.name} is confirmed.
                       Please visit the doctor on this date and time {el.time}.
                      You can contact him with this number {el.phone}</p>
                 </div>
                
               </div>
             </div>
           </div>
           )
            });
        return(
          <div>
              <nav>
                <div class="nav-wrapper">
        
                <ul id="nav-mobile" class="left ">
         
               <li><a onClick={this.signOuthandler} style={{fontSize:'20px'}}>SIGN OUT</a></li>
          
              </ul>
            </div>
            </nav>
           <h2 style={{color:'blue',alignItems:'center'}}>Here are your appointments :</h2>
           <div className="row" style={{justifyContent:"center"}}>
         <div className="col s4 offset-s4" >{dArray}</div>
         </div>
          </div>
        )
    }
}

export default withRouter(bookings);