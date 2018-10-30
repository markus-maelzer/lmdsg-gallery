import React, { Component } from 'react';
import GalleryItem from './gallery-item';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import MasonryLayout from 'react-masonry-layout'

import './index.min.css';

import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/1.jpg';
import img5 from '../../assets/2.jpg';
import img6 from '../../assets/3.jpg';

export default class Gallery extends Component {
  state = {
    perPage: 10,
    gallery: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6
    ]
  }
  componentWillMount() {
    console.log(uuidv4(), 'asd');
    this.setState({
      gallery: _.mapValues(
        _.keyBy(
          this.state.gallery,
          () => uuidv4()
        ),
        (src, key) => ({
          src,
          id: key
        }
      )),
    })
  }
  componentDidMount() {
    const bricksInstance = this.instance.getBricksInstance();
    setTimeout(function () {
      bricksInstance.pack()
    }, 300);
  }

  loadItems = () => {
    this.setState({
      items: this.state.items.concat(Array(this.state.perPage).fill())
    });
  }


  render() {
    const { gallery } = this.state;
    return (
      <div className="gallery__container">
        <MasonryLayout
          id="masonry-layout"
          ref={instance => this.instance = instance}
          sizes={[
            {
              columns: 1,
              gutter: 20
            },
            {
              mq: '632px',
              columns: 2,
              gutter: 30
            },
            {
              mq: '970px',
              columns: 3,
              gutter: 30
            },
            {
              mq: '1270px',
              columns: 4,
              gutter: 30
            }
          ]}
          >
          {_.map(gallery, ({id, src, children = '', active = false}) => (
            <GalleryItem
              key={id}
              id={id}
              src={src}
              active={active}
            >
              {children}
            </GalleryItem>
          ))}
        </MasonryLayout>
      </div>
    )
  }
}
