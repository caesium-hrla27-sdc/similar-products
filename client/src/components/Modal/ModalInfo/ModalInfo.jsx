import React, { Component } from 'react';
import styles from './ModalInfo.css';


class ModalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: true
    }
  }

  componentDidMount() {
    if (this.props.size.split(' ').length > 1) {
      this.setState({ single: false });
    }
  }

  render() {
    const oz = (ml) => {
      return (ml * 0.033814).toFixed(1);
    }

    let { single } = this.state;
    let { selected, hovered, hoverIndex, variationSKU } = this.props;
    let sizeArray = this.props.size.split(' ');
    let sizeSpan;
    if (!hovered) {
      sizeSpan = <span>SIZE { oz(sizeArray[selected]) } oz/ { sizeArray[selected] } mL
        <span className={ styles.bullet }>•</span></span>;
    }

    let variationSize;
    if (!single && !hovered) {
      variationSize = <span className={ styles.variationText }>
        SIZE { oz(sizeArray[selected]) } oz/ { sizeArray[selected] } mL
      </span>
    } else if (!single && hovered) {
      variationSize = <span className={ styles.variationText }>
        SIZE { oz(sizeArray[hoverIndex]) } oz/ { sizeArray[hoverIndex] } mL
      </span>
    }

    return (
      <div className={ styles.productInfo }>
        <div className={ styles.productNameContainer }>
        <span className={ styles.category }>{ this.props.category }</span>
        <span className={ styles.name }>{ this.props.name }</span>
        </div>
        <div className={ styles.sizeSKU }>
          <span>
            { single ? sizeSpan : '' }
            </span>
            ITEM { variationSKU }
        </div>
        <div className={ styles.description }>
          <div className={ styles.descriptionText }>
            { this.props.description }
          </div>
          <div className={ styles.productLinkContainer }>
            <span className={ styles.productLink }>
              See product details
            </span>
          </div>
        </div>
        { variationSize }
        <div className={ single ? styles.hidden : styles.variationBox }>
          <div className={ styles.variationWrapper }>
            {sizeArray.map((item, i) => {
              return (
                <div
                key={ i }
                className={ styles.variationItem }>
                  <button
                  id={ i }
                  className={ item === sizeArray[selected] ? styles.variationButtonSelect : styles.variationButton }
                  onMouseEnter={ e => this.props.onHover(e) }
                  onMouseLeave={ e => this.props.resetSelect(e) }
                  >
                    <div
                    id={ i }
                    className={ styles.buttonContent }
                    onClick={ e => this.props.selectSize(e) }
                    >
                      { oz(item) } oz/ { item } mL
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalInfo;