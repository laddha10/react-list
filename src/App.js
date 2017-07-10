import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import  data from './data.json';

//var data = require('./data.json');


// create-react-app specific
import logo from './logo.svg';
import './App.css';
console.log({data});
//const FRAMEWORKS = ['React', 'Angular', 'Vue', 'Ember'];

// ACTION CREATORS
function setFilter(by) {
  return { type: 'SET_FILTER',by: by };
}

// REDUCER
const initialState = {
  filterBy: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FILTER':
      console.log(`Our filter was ${state.filterBy} but is now ${action.by}!`);
      // return a new object
      return Object.assign({}, state, {
        filterBy: action.by
      })
    default:
      return state
  }
}

// STORE
const store = createStore(reducer);

// react-redux
const mapStateToProps = (state) => {
  return {
    filterBy: state.filterBy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (ev) => dispatch(setFilter(ev.target.value))
  }
}

class FilterList extends Component {
  render() {
    const { filterBy, updateFilter } = this.props;
    return (
      <div>
        <input type="text" onChange={updateFilter}/>
        <List items={data.name} filterBy={filterBy} />
      </div>
    )
  }
}


FilterList = connect(mapStateToProps, mapDispatchToProps)(FilterList);

const List = ({ items, filterBy }) => {
  return (
    <ul>
      {
        items
          .filter(item => item.indexOf(filterBy) === 0)
          .map((item, i) => <li key={i}>{item}</li>)
      }
    </ul>
  )
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            <FilterList />
          </div>
        </div>
      </Provider>
    );
  }
}


export default App;
