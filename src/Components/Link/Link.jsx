import React, { Component, PropTypes } from 'react';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}


function isAbsoluteUrl(url = '') {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
}


class Link extends Component {
  static defaultProps = {
    children: null,
    onClick: null,
    to: null,
    href: null,
  }
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  // static contextTypes = {
  //   history: PropTypes.object.isRequired,
  // };

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
      return;
    }

    if (e.defaultPrevented === true) {
      return;
    }

    const url = this.props.to || this.props.href;
    if (url == null) {
      return;
    }
    if (this.props.target === '_blank' || isAbsoluteUrl(url)) {
      return;
    }
    e.preventDefault();
    this.props.history.push(url);
  };

  render() {
    const { to, href, children, history, ...props } = this.props;
    return <a href={to || href} {...props} onClick={this.handleClick}>{children}</a>;
  }

}

export default Link;
