import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import ItemArchiveList from './ItemArchiveList';

class ArchiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: false,
      notes: [],
    }
  }

  loadData() {
    fetch('http://localhost:3001/api/archive')
      .then(response => response.json())
      .then(data => { this.setState({ loadedData: true, notes: data }) }).catch(console.log);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loadedData !== this.state.loadedData) {
      this.loadData();
    }
  }

  handleChildChange = () => {
    this.setState({ loadedData: false });
  }

  render() {
    const { loadedData, notes } = this.state;
    const filteredNotes = notes.filter(note => note.archive);//just in case 
    if (!loadedData) { return (<div>Loading</div>) }
    else {
      return (
        <Container className="my-list">
          <Row>
            {filteredNotes.map(note => (
              <div className='col-6 mb-4' key={note.id}>
                <ItemArchiveList
                  title={note.title}
                  text={note.text}
                  id={note.id}
                  onChange={this.handleChildChange}
                />
              </div>
            ))}
          </Row>
        </Container>
      )
    }
  }
}

export default ArchiveList;