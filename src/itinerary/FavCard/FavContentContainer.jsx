import React, {Component} from 'react';
import FavStar from "./FavStar.jsx";
import FavRating from "./FavRating.jsx";
import FavImage from "./FavImage.jsx";
import FavAdd from "./FavAdd.jsx";

//Contains
class FavContentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isRotated: false,
      isVisible: false
    };
  }

  findIconCategory(categoryName){
    const iconCategories = {
      1: 'fa-tree',
      4: 'fa-binoculars',
      3: 'fa-shopping-bag',
      2: 'fa-cutlery',
    }

    return iconCategories[categoryName] || '';
  };

  toggleDescription(event){
    this.setState({
      isExpanded: !this.state.isExpanded,
      isRotated: !this.state.isRotated,
      isVisible: !this.state.isVisible
    });
  }


  render() {
    const expandedToggle = this.state.isExpanded ? 'expanded'  : '';
    const rotatedToggle = this.state.isExpanded ? 'is-rotated'  : '';
    const detailsVisible = this.state.isVisible ? 'visible'  : '';

    let card = this.props.cardContent;
    return (
      <div className={`content-container ${expandedToggle}`}>
        <FavImage images={card.photos} id={card.id} removeFavorite={this.props.removeFavorite.bind(this)}/>
        <div className="card-content">
              <p className="itinerary-card-title">{card.title}</p>
               <p className="category duration"><span className={`icon is-small fa ${this.findIconCategory(card.category)}`}>&nbsp;</span>&nbsp;~{card.duration} minutes</p>
                <FavAdd add={this.props.add.bind(this)} card={card}/>
            </div>
          </div>
    );
  }
}
export default FavContentContainer;

