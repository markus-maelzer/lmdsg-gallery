import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class GalleryContent extends Component {
  img = React.createRef();

  componentDidMount() {
    this.props.content.imgDimensions = this.imgDimensions;
  }

  imgDimensions = () => {
    return this.img.current.getBoundingClientRect();
  }

  render() {
    const { src, active, className } = this.props;

    return (
      <Portal active={active}>
        <div className={`gallery__content row flex-align-center justify-center ${className}`}>
          <img onLoad={this.onImgLoad} ref={this.img} src={src} alt="" />
        </div>
      </Portal>
    );
  }
}



const rootDOM = document.getElementById('root');

const Portal = ({ children, active }) => {
  return ReactDOM.createPortal(
    children,
    rootDOM
  )
}
