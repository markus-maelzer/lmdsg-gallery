import React, { Component } from 'react';
// import posed from 'react-pose';
import GalleryContent from './gallery-content';

const defaultAnimState = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
}

export default class GalleryItem extends Component {
  state = {
    imgRotation: Math.floor(Math.random() * (10 - -10 + 1) + -10),
    active: false,
    animating: false,
    pos: defaultAnimState,
    imgPos: defaultAnimState
  }
  body = document.body;
  docEl = document.documentElement;
  winsize = { width: window.innerWidth, height: window.innerHeight }
  item = React.createRef();
  content = {}

  onImgLoad = () => {
    this.setWidthHeight()
  }
  // Calculates the offsetTop or offsetLeft of an element relative to the viewport
	// (not counting with any transforms the element might have)
	getOffset = (elem, axis) => {
		let offset = 0;
		const type = axis === 'top' ? 'offsetTop' : 'offsetLeft';
		do {
			if ( !isNaN( elem[type] ) )
			{
				offset += elem[type];
			}
		} while( elem = elem.offsetParent );
		return offset;
	}

  getSizePosition = (el, scrolls = true) => {
    const { body, docEl } = this;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    return {
      width: el.offsetWidth,
      height: el.offsetHeight,
      left: scrolls ? this.getOffset(el, 'left') - scrollLeft : this.getOffset(el, 'left'),
      top: scrolls ? this.getOffset(el, 'top') - scrollTop : this.getOffset(el, 'top')
    };
  }

  handleOnClick = (e) => {
    const { active, animating } = this.state;
    if(animating) return;

    this.setState({
      ...this.handleAnim(),
      active: !active,
      animating: !animating
    }, () => {
      setTimeout(() => {
        this.setState({
          animating: animating
        })
      }, 1200);
    })
  }
  setWidthHeight() {
    var { height, width } = this.item.current.getBoundingClientRect();
    this.setState({
      width,
      height
    })
  }

  handleAnim = () => {
    const { winsize, getSizePosition, item} = this;
    const { x, y, width, height } = item.current.getBoundingClientRect();
    const itemDim = getSizePosition(item.current);
    const d = Math.hypot(this.winsize.width, this.winsize.height);
    const content = this.content.imgDimensions();
    console.log(content, x, y);
    return {
      pos: {
        scaleX: d/itemDim.width,
        scaleY: d/itemDim.height,
        x: -x + (winsize.width/2 - (itemDim.left+itemDim.width/2)),
        y: -y
      },
      imgPos: {
        scaleX: content.width / (itemDim.width - 60),
        scaleY: content.height / (itemDim.height - 60),
        x: (content.left+content.width/2)-(itemDim.left+itemDim.width/2),
        y: content.y - y,
      }
    }
  }

  render() {
    const { src } = this.props;
    const { pos, imgPos, active, animating, height, width } = this.state;
    const className = active ? 'open' : 'closed';
    const anim = animating ? 'anim' : '';
    const bgStyles = {
      transform: active ?
        `translate(${pos.x}px, ${pos.y}px) scale(${pos.scaleX}, ${pos.scaleY})` :
        'translate(0, 0)',
    }
    // console.log(imgPos);
    const imgStyles = {
      transform: active ? `translate(${imgPos.x - 30}px, ${imgPos.y - 30}px) scale(${imgPos.scaleX}, ${imgPos.scaleY}) rotate(0deg)` : `translate(0, 0) rotate(${this.state.imgRotation}deg)`,
    }
    return (
      // active ? () => {} :
      <div
        onClick={this.handleOnClick}
        className={`gallery__item ${className} ${anim}`}
        ref={this.item}
        style={{
          width,
          height
        }}
      >
        <div
          style={bgStyles}
          className={`gallery__item-bg `}
        />
        <div
          className="gallery__item-wrapper"
        >
          <div
            className="gallery__item-content row flex-align-center justify-center">
            <img
              onLoad={this.onImgLoad}
              className="gallery__item-img"
              src={src} alt=''
              style={imgStyles}
            />
            <div className="gallery__item-text">

            </div>
          </div>
        </div>
        <GalleryContent
          {...this.props}
          active={active}
          className={className + ' ' + anim}
          content={this.content}
        />
      </div>
    );
  }
}
