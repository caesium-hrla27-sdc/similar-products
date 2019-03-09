import React, { Component } from 'react';
import styles from './ModalBottomRight.css';
import Love from '../../Love';

class ModalBottomRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.hoverLove = this.hoverLove.bind(this);
  }

  hoverLove() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    return(
      <div className={ styles.container }>
        <div className={ styles.priceContainer }>
          <div className={ styles.price }>
            { `$${this.props.price}` }
          </div>
          <div className={ styles.promo }>
            { this.props.free ? 'Free shipping' : '' }
          </div>
        </div>
        <div className={ styles.shopContainer }>
          <div>
            <div className={ styles.selectContainer }>
              <select className={ styles.select }>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
              <span className={ styles.arrowBox }></span>
            </div>
          </div>
          <div className={ styles.addContainer }>
            <button type='button' className={ styles.basket }>
              Add to basket
            </button>
            <div className={ styles.loveContainer }>
              <button
              type='button'
              className={ styles.loveButton }
              onClick={ () => this.props.handleLove() }
              onMouseEnter={ this.hoverLove }
              onMouseLeave={ this.hoverLove }
              >
              <Love
              hover={ this.state.hover }
              loved={ this.props.loved }
              style={{ 'marginRight': '0.375em' }}
              />
              <span className={ !this.props.loved ? styles.span1 : styles.span2 }></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalBottomRight;