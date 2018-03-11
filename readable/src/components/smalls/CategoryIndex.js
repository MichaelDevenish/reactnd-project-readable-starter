import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategoryIndex extends Component {
  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <div className="category" key={categories[category].path}>
            <Link to={`/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
            </Link>
          </div>
        );
      });
    }
  }

  get home () {
    if (this.props.showReturnHome) {
      return <Link to={`/`}>
        <h2>Return Home</h2>
      </Link>
    }
  }

  render () {
    const {
      categories
    } = this.props;

    return (
      <div className="categories">
        {this.home}
        <h2>Categories</h2>
        {this.renderCategories(categories)}
      </div>
    );
  }
}
