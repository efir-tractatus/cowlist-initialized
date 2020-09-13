import React from 'react';
import ReactDOM from 'react-dom';
import CowList from './CowList.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cows: [],
      cowDescription: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/cows')
      .then((response) => {
        this.setState({
          cows: response.data,
        });
      })
      .catch((err) => console.error(err));
  }

  handleSubmit({ name, description }) {}

  handleSelect(cow = null) {
    var cowIdx = this.state.cows.findIndex((element) => element.id === cow);
    this.setState({
      cowDescription: this.state.cows[cowIdx].description,
    });
  }

  render() {
    return (
      <div>
        Name
        <div className="cow-name-input">
          <input type="text" />
        </div>
        Description
        <div className="cow-description-input">
          <input type="text" />
          <button type="submit">Submit</button>
        </div>
        <div className="cow-description">{this.state.cowDescription}</div>
        <div className="main-list">
          <CowList
            cows={this.state.cows}
            handleSelect={this.handleSelect.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
