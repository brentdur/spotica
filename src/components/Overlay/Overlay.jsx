import React from 'react';

import './style.scss';

const Overlay = React.createClass({
  componentDidMount() {
    // Initialize close listeners
    this.overlay.addEventListener('click', (e) => {
      // Bubble up through the dividers to check that we clicked
      // outside of the content
      var currTarget = e.target;

      while (!currTarget.classList.contains(this.componentName)) {
        if (currTarget.classList.contains(this.containerName)) {
          return;
        }

        currTarget = currTarget.parentNode;
      }

      this.props.close();
    });

    window.addEventListener('keyup', this.closeOnEsc);
  },

  closeOnEsc(e) {
    if (e.keyCode === 27) {
      this.props.close();
    }
  },

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEsc);
  },

  render() {
    this.componentName = 'overlay';
    this.containerName = 'overlay__container';

    return (
      <div
        ref={ref => this.overlay = ref}
        className={this.componentName}>
        <div className="overlay__container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Overlay;
