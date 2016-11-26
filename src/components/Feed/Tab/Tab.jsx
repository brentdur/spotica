import React from 'react';

import './style.scss';

const Tab = React.createClass({
  componentDidMount() {
    if (this.props.onClick) {
      this.tab.addEventListener('click', () => {
        const isActive = this.tab.classList.contains('tab-selected');

        if (isActive) return;

        const selectedTabs = document.getElementsByClassName('tab-selected');

        for (var i = 0; i < selectedTabs.length; i++) {
          selectedTabs[i].classList.remove('tab-selected');
        }

        this.tab.classList.add('tab-selected');
        this.setState({ isActive: true });
        this.props.onClick();
      });
    }
  },

  render() {
    var className = 'tab';

    if (this.props.isActive) {
      className = 'tab-selected ' + className;
    }

    return (
      <div
        ref={ref => this.tab = ref}
        className={className}>
        {this.props.text}
      </div>
    );
  }
});

export default Tab;
