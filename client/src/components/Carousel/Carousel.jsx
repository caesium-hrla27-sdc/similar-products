import React, { Component } from 'react';
import CarouselItem from '../CarouselItem';
import styles from './Carousel.css';
import Modal from '../Modal/ModalContainer';
import ArrowL from './ArrowL.jsx';
import ArrowR from './ArrowR.jsx';
import Bottom from '../Bottom';
import axios from 'axios';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      scroll: 0,
      loved: false,
      show: null
    };
    this.clickBottom = this.clickBottom.bind(this);
    this.clickLeft = this.clickLeft.bind(this);
    this.clickRight = this.clickRight.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleLove = this.handleLove.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/similar/${this.props.id}`, { params: { id: this.props.id }})
      .then(({ data }) => {
        this.setState({ list: [...data] });
      })
      .catch(err => console.log(err));
  }

  clickBottom(num) {
    this.setState({ scroll: num });
  }

  clickLeft(e) {
    this.setState({ scroll: this.state.scroll - 1 });
  }

  clickRight(e) {
    this.setState({ scroll: this.state.scroll + 1 });
  }

  showModal(index) {
    this.setState({ show: index });
  }

  handleLove() {
    this.setState({ loved: !this.state.loved });
  }

  render() {
    let { scroll } = this.state;
    let move = styles.innerContainer;

    if (scroll === 1) {
      move = styles.r1;
    } else if (scroll === 2) {
      move = styles.r2;
    }
    if (this.state.list.length) {
      return (
        <div className={styles.outerWrapper}>
          <div className={styles.innerWrapper}>
            <div className={styles.outerContainer}>
              <div className={move}>
                {this.state.list.map((item, i) => (
                  <CarouselItem
                    key={i}
                    index={i}
                    showModal={this.showModal}
                    handleLove={this.handleLove}
                    loved={this.state.loved}

                    name={item.product_name}
                    category={item.category}
                    size={item.size}
                    description={item.description}
                    sku={item.sku}
                    stars={item.stars}
                    reviews={item.reviews}
                    badge={item.badge}
                    loves={item.loves}
                    exclusive={item.exclusive}
                    online={item.online_only}
                    limited={item.limited_edition}
                    free={item.free_shipping}
                    price={item.price}
                    image={item.image}
                  />
                ))}
              </div>
            </div>

            {this.state.list.map((item, i) => (
              <Modal
              key={i}
              onClose={this.showModal}
              loved={this.state.loved}
              handleLove={this.handleLove}

              show={this.state.show === i}
              name={item.product_name}
              category={item.category}
              size={item.size}
              description={item.description}
              sku={item.sku}
              stars={item.stars}
              reviews={item.reviews}
              badge={item.badge}
              loves={item.loves}
              exclusive={item.exclusive}
              online={item.online_only}
              limited={item.limited_edition}
              free={item.free_shipping}
              price={item.price}
              image={item.image}
            />
            ))}

            <button
              className={styles.buttonL}
              onClick={this.clickLeft}
              disabled={scroll === 0}
            >
              <ArrowL className={styles.arrow} />
            </button>
            <button
              className={styles.buttonR}
              onClick={this.clickRight}
              disabled={scroll === 2}
            >
              <ArrowR className={styles.arrow} />
            </button>
          </div>
          <Bottom
            disabledL={scroll === 0}
            disabledM={scroll === 1}
            disabledR={scroll === 2}
            click={this.clickBottom}
          />
        </div>
      );
    }
    return <div/>;
  }
}

export default Carousel;
