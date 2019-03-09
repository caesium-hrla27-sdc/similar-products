import React, { Component } from 'react';
import styles from './CarouselItem.css';
import Image from '../Image';
import Stars from '../Stars';
import Love from '../Love';

class Entry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ styles.entry }>
        <div className={ styles.itemContainer1 }>
          <div className={ styles.itemContainer2 }>
            <div className={ styles.itemContainer3 }>
              <Image image={ this.props.image } />

              <button
              type='button'
              className={ styles.moreInfo }
              onClick={ () => this.props.showModal(this.props.index) }>
                Quick Look
              </button>
              <div className={ styles.loveContainer }>
                <button
                className={ styles.loveButton }
                onClick={ () => this.props.handleLove() }>
                  <Love loved={ this.props.loved } />
                </button>
              </div>
            </div>

            <div
            className={ styles.badgeContainer }
            style={ this.props.badge ? { opacity: 1 } : { opacity: 0 } }>
              <div className={ styles.badge }>New</div>
            </div>

            <div className={ styles.name }>
              <span className={ styles.category }>
                {this.props.category}
              </span>
              <br />
              <span>
                {this.props.name}
              </span>
              <div className={ styles.price }>
                ${this.props.price}
              </div>
            </div>

            <div className={ styles.starContainer }>
              <Stars stars={ this.props.stars }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;