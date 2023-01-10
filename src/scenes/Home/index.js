import React, {Component} from 'react';
import RequireAuth from "../Auth";

class Home extends Component{
  render(){
    return(
      <RequireAuth>
        
      </RequireAuth>
    )
  }
}

export default Home;