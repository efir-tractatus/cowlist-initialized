import React from 'react';
import ReactDOM from 'react-dom';
import CowList from './CowList.jsx';
import Modal from './Modal.jsx';
import CowEntry from './CowEntry.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cows: [],
      cowModal: false,
      newCowName: null,
      newCowDescription: null,
      updateCow: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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

  handleSubmit(event) {
    var name = this.state.newCowName;
    var description = this.state.newCowDescription;
    if (name === null || description === null) {
      alert('Please input both name and description of your cow');
    } else {
      axios
        .post('/api/cows', { name, description })
        .then((response) => {
          return axios.get('/api/cows');
        })
        .then((response) =>
          this.setState({
            cows: response.data,
            newCowName: null,
            newCowDescription: null,
          })
        )
        .error((error) => console.error(error));
    }
  }

  handleChange(event, field) {
    if (field === 'name') {
      this.setState({
        newCowName: event.target.value,
      });
    } else if (field === 'description') {
      this.setState({
        newCowDescription: event.target.value,
      });
    }
  }

  handleSelect(cow = null) {
    var cowIdx = this.state.cows.findIndex((element) => element.id === cow);
    var cow = {
      id: this.state.cows[cowIdx].id,
      name: this.state.cows[cowIdx].name,
      description: this.state.cows[cowIdx].description,
    };
    this.setState({
      updateCow: cow,
      cowModal: true,
    });
  }

  handleUpdate(event, field) {
    if (field === 'name') {
      var name = event.target.value;
    } else if (field === 'description') {
      var description = event.target.value;
    }
    this.setState({
      updateCow: {
        name: name,
        description: description
      }
    })
    console.log(this.state.updateCow)
  }

  render() {
    return (
      <div>
        Name
        <div className="cow-name-input">
          <input
            type="text"
            onChange={(e) => {
              this.handleChange(e, 'name');
            }}
          />
        </div>
        Description
        <div className="cow-description-input">
          <input
            type="text"
            onChange={(e) => {
              this.handleChange(e, 'description');
            }}
          />
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        <div className="main-list">
          <CowList cows={this.state.cows} handleSelect={this.handleSelect} />
        </div>
        <Modal cowModal={this.state.cowModal}>
          <CowEntry
            cow={this.state.updateCow}
            handleUpdate={this.handleUpdate}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
