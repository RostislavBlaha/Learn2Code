import React, { Component } from 'react';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {formState: 'empty'};
  }
  formState(){
      this.setState({formState: 'loading'});
  }
  componentDidMount(){
      this.refs.weburl.focus(); 
  }
  render() {
    var loader;
    if (this.state.formState == 'empty'){
        loader = (<img src="./src/arrow.svg" className="arrow"/>);
    } else {
        loader = (<img src="./src/loader.svg" className="rotator"/>);
    }
    return (
            <div className="addForm">
                <form>    
                    <input 
                        ref="weburl"
                        className="weburl"        
                        type="text"
                        placeholder="např. www.seznam.cz"
                    />
                    <button type="button" className="addButton" onClick={this.formState.bind(this)}>
                        {loader}
                    </button>
                </form>
                    
            </div>
    );
  }
}