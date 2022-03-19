import React, {Component} from 'react';
import RequireAuth from "../Auth";

class Home extends Component{
  render(){
    return(
      <RequireAuth>
        <h1>HOME</h1>
      </RequireAuth>
    )
  }
}

export default Home;