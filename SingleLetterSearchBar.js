import React from 'react';


// Use this class to allow the user to enter a letter
// this class needs a function passed as a prop called onSearch to handle the user's request
class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

    handleInputChange = (event) => {
        const value = event.target.value.charAt(0).toUpperCase(); // Get only the first character
        this.setState({
            inputValue: value}
        );
    };

    /*handleSearchClick = () => {
        if (this.state.inputValue.length === 1) {
            this.props.onSearch(this.state.inputValue);
        } else {
            alert('Please enter a single letter.');
        }
        // Clear input after search
        this.setState({
            inputValue: ''
        });
    }; */

    
  handleSearchClick = () => {
    if (this.props.gameOver) {
      alert("Game over! Start a new game.");
      return;
    }
    if (this.state.inputValue.length === 1) {
      this.props.onSearch(this.state.inputValue);
    } else {
      alert('Please enter a single letter.');
    }
    this.setState({ inputValue: '' }); // Clear input
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
          disabled={this.props.gameOver}
        />
        <button onClick={this.handleSearchClick} disabled={this.props.gameOver} >Search</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;