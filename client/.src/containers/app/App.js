import React from 'react';
import reactDOM from 'react-dom';
import AppStyles from './AppStyles';
import axios from 'axios';
import Title from '../title/Title.js';
import Viewer from '../viewer/Viewer.js';
const port = '/api/';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      photos: []
    }
    this.getItem = this.getItem.bind(this)
    this.getPhotosByItemID = this.getPhotosByItemID.bind(this);
  }

  getItem (i) {
    console.log('this is the get request');
    var id = i;
    var self = this;
    axios.get(port + 'item', {
      headers: {
        id: id
      }
    }).then(function(data) {
      console.log(data.data.rows[0]);
      //self.setState({product: data.data[0]});
    }).catch(function(err) {
      console.log(err);
    });
    //this.setState({product: self});
    // let options = {
    //   method: 'get',
    //   url: '/api/items',
    //   headers
    // }

    // axios(options)
    //   .then((response) => {
    //     let item =  response.data[Math.floor(Math.random() * response.data.length)];

    //     let id = window.location.pathname;
    //     if (id.length > 1) {
    //       id = id.split('');
    //       id.shift();
    //       id = Number.parseInt(id.join(''));
    //       item = response.data[id]
    //     }

    //     console.log(item);
    //     this.setState({
    //       item
    //     });
    //     this.getPhotosByItemID();
    //   })

  }

  getPhotosByItemID () {
    let itemID = this.state.item.id;

    let options = {
      method: 'post',
      url: '/api/photos',
      data: {itemID}
    }
    axios(options)
      .then((response) => {
        this.setState({
          photos: response.data
        });
      })
  }

  componentDidMount () {
    this.getItem();
  }


  render () {
    return (
      <div>
      <div>
      <AppStyles.app>Welcome to Guitar Centaur</AppStyles.app>
      </div>
      <div>
      <Title item={this.state.item} />
      </div>
      <div>
        <Viewer photos={this.state.photos} />
      </div>
      </div>
    );
  }
}

export default App;
