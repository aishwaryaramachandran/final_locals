import React, {Component} from 'react';
import ItineraryCard from "./ItineraryCard.jsx";
import {render} from '../../../node_modules/react-dom';
import {SortableContainer, SortableElement, arrayMove} from '../../../node_modules/react-sortable-hoc';
import RemoveCard from "./RemoveCard.jsx";

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : this.props.cards
    }
  }

  
  
  onSortEnd = ({oldIndex, newIndex}) => {
    const move = arrayMove(this.state.items, oldIndex, newIndex)
    this.setState({
      items: move,
    });
    // console.log('ITEM:', this.state.items[0].title, 'ITEM DURATION:', this.state.items[0].duration)
    
  };

  setCardHeight(items) {
    if (items.duration > 100) {
      return 'big-card';
    } else {
      return 'small-card';
    }
  }
  renderSize(duration){
    if (  duration > 100) {
      return (
        'large'
      );
    } else {
      return (
       'small'
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("cWRP nextProps");
    // To avoid reseting order on new-card-add:
    //  0) make a copy of this.state.items
    //  1) loop through nextProps.cards
    //  2) for each nextProps.card, see if it already exists in this.state.items
    //  3) if yes, *APPEND* it to the copy
    //  4) setState to the copy
    let last = (nextProps.cards).length - 1
    let newProp = nextProps.cards[last]
    let oldState = this.state.items
    let newestAddition = oldState.concat(newProp)
    console.log('newest', newestAddition)
    console.log(oldState)
    
    this.setState({
      items : nextProps.cards
    })
  }
  render() {
<<<<<<< HEAD

    const cards = this.props.cards;
    const renderedItems = cards.map(card =>
=======
    
    const items = this.props.cards;
    const renderedItems = this.state.items.map(card =>
>>>>>>> feature/timeline
          <div className='box'>
            <article className='media large'>
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="http://bulma.io/images/placeholders/128x128.png"></img>
              </p>
            </figure>
            <div className={`media-content ${this.renderSize(card.duration)}`}>
              <div className="content">
                <p>
                  <strong>{card.title}</strong>
                  <br className="subtitle"></br>
                  {card.location.x + card.location.y}
                  <br></br><small>{card.duration}</small>
                </p>
              </div>
            </div>
              <div className="media-right">
                <RemoveCard  />
              </div>
          </article>
        </div>
    )

    return <SortableList items={renderedItems} onSortEnd={this.onSortEnd} />;
  }
}

// render(<SortableComponent/>, document.getElementById('reactRoot'));

export default SortableComponent;
