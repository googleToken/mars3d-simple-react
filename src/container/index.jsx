import "./style";
import React from "react";
 

class Box extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box">
     
        <div className="bottom">
          <div className="container">
            <div id="centerDiv" className="container-map">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;

