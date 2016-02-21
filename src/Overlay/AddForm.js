import React, { Component } from 'react';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
        formState: 'default',
        value: {}
        };
  }
  formState(){
      if (this.validURL(this.state.value)){
        this.setState({formState: 'loading'});
      } else {
        this.setState({formState: 'fail'});  
      }
  }
    
  handleChange(evt) {
    this.setState({
      value: evt.target.value,
      formState: 'default'
    });

  }
    
  handleKeyPress(evt){
      evt.preventDefault();
      if (evt.keyCode == 13) {
          this.formState(this);
      }
  }
    
  validURL(url){
      return /^(.*[a-zA-Z0-9]+((\.|\:)[a-zA-Z0-9]+)+.*)$/.test(url);  //bacha, to jsem si zbastlil sám, radši ještě zkontroluj, jestli tím projde to, co má!!
  }
    
  componentDidMount(){
      this.refs.weburl.focus(); 
  }
    
  render() {    
    var loader;
    if (this.state.formState == 'default'){
        loader = (<img src="./src/arrow.svg" className="arrow"/>);
    } else if (this.state.formState == 'loading'){
        loader = (<img src="./src/loader.svg" className="rotator"/>);
    } else if (this.state.formState == 'fail'){
        loader = (<img src="./src/fail.svg" className="arrow"/>);
        this.refs.weburl.focus(); 
    }
    return (
            <div className="addForm">
                <form>    
                    <input 
                        ref="weburl"
                        className={"weburl " + this.state.formState}        
                        type="text"
                        placeholder="např. www.seznam.cz"
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyPress.bind(this)}
                    />
                    <button type="button" className="addButton" onClick={this.formState.bind(this)}>
                        {loader}
                    </button>
                </form>
                    
            </div>
    );
  }
}