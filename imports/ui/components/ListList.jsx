/* global alert */

import React from 'react';
import { NavLink } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import BaseComponent from './BaseComponent.jsx';
import { insert } from '../../api/lists/methods.js';

export default class ListList extends BaseComponent {
  constructor(props) {
    super(props);
    this.createNewList = this.createNewList.bind(this);
  }

  createNewList() {
    const { router } = this.context;
    const listId = insert.call({ locale: i18n.getLocale() }, (err) => {
      if (err) {
        router.transitionTo('/');
        /* eslint-disable no-alert */
        alert(i18n.__('components.listList.newListError'));
      }
    });
    router.transitionTo(`/lists/${listId}`);
  }

  render() {
    const { lists } = this.props;
    return (
      <div className="list-todos">
        <a className="link-list-new" onClick={this.createNewList}>
          <span className="icon-plus" />
          {i18n.__('components.listList.newList')}
        </a>
        {lists.map(list => (
          <NavLink
            to={`/lists/${list._id}`}
            key={list._id}
            title={list.name}
            className="list-todo"
            activeClassName="active"
          >
            {list.userId
              ? <span className="icon-lock" />
              : null}
            {list.incompleteCount
              ? <span className="count-list">{list.incompleteCount}</span>
              : null}
            {list.name}
          </NavLink>
        ))}
      </div>
    );
  }
}

ListList.propTypes = {
  lists: React.PropTypes.array,
};

ListList.contextTypes = {
  router: React.PropTypes.object,
};
