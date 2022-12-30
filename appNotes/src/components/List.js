import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import ItemList from './ItemList';
class List extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      loadedData: false,
      notes: []
    }
  }

  loadData() {
    if(this.props.filter===0){ fetch('http://localhost:3001/api/notes')
      .then(response => response.json())
      .then(data => { this.setState({ loadedData: true, notes: data }); }).catch(console.log);
   }
      else {
         fetch(`http://localhost:3001/api/notes/${this.props.filter}/filter`)
      .then(response => response.json())
      .then(data => { this.setState({ loadedData: true, notes: data }); }).catch(console.log);
      }
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loadedData !== this.state.loadedData) {
      this.loadData();
    }
    if (prevProps.refresh !== this.props.refresh) {
      this.loadData();
    }
    if (prevProps.filter !== this.props.filter) {
      this.loadData();
    }
  }

  handleChildChange = () => {
    this.setState({ loadedData: false });
    
  }

  render() {
    const { loadedData, notes } = this.state;
    const filteredNotes = notes.filter(note => !note.archive);//just in case 
    if (!loadedData) { return (<div>Loading</div>) }
    else {
      return (
        <Container className="my-list">
          <Row>
            {filteredNotes.map(note => (
              <div className='col-6 mb-4' key={note.id}>
                <ItemList
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

export default List;