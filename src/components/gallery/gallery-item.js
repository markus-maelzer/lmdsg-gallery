import React, { Component } from 'react';
import posed from 'react-pose';


const ItemBg = posed.div({
  open: {
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
  },
  closed: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
  }
})

export default class GalleryItem extends Component {
  state = {
    imgRotation: Math.floor(Math.random() * (10 - -10 + 1) + -10),
    pos: {
      x: 0,
      y: 0
    }
  }
  item = React.createRef();

  handleOnClick = (e) => {
    const { id, onClick } = this.props;
    onClick(id);
  }

  handleBgAnim = () => {
    var test = this.itemBg.getBoundingClientRect();
    console.log(test);
  }

  render() {
    const { src, active } = this.props;
    const { pos } = this.state;
    return (
      <div ref={this.item} className="gallery__item">
        <ItemBg
          pos={pos}

          pose={active ? 'open' : 'closed'}
          className="gallery__item-bg"
        />
        <div
          onClick={this.handleOnClick}
          className="gallery__item-wrapper"
        >
          <div className="gallery__item-content row flex-align-center justify-center">
            <img
              className="gallery__item-img"
              src={src}
              style={{
                transform: `rotate(${this.state.imgRotation}deg)`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
