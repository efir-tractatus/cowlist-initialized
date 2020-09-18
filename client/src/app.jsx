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
      updateCow_id: '',
      updateCow_name: '',
      updateCow_description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePUT = this.handlePUT.bind(this);
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

  handleDelete() {
    let cowId = this.state.updateCow_id;
    axios
      .delete(`/api/cows/` + cowId)
      .then((response) => {
        return axios.get('/api/cows/');
      })
      .then((response) => {
        this.setState({
          cows: response.data,
          cowModal: false,
        });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  handlePUT() {
    let cowId = this.state.updateCow_id;
    let options = {
      id: this.state.updateCow_id,
      name: this.state.updateCow_name,
      description: this.state.updateCow_description,
    }
    axios
      .put(`/api/cows/` + cowId, options)
      .then((response) => {
        return axios.get('/api/cows/');
      })
      .then((response) => {
        this.setState({
          cows: response.data,
          cowModal: false,
        });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
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
    this.setState({
      updateCow_id: this.state.cows[cowIdx].id,
      updateCow_name: this.state.cows[cowIdx].name,
      updateCow_description: this.state.cows[cowIdx].description,
      cowModal: true,
    });
  }

  handleUpdate(event, field) {
    this.setState({
      [field]: event.target.value,
    });
    console.log(this.state);
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
            name={this.state.updateCow_name}
            description={this.state.updateCow_description}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDelete}
            handlePUT= {this.handlePUT}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
