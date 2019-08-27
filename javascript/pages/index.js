import React from 'react';
import { Queue } from '../data-structures/queue';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: new Queue()
    };
  }

  render () {
    console.log('%c q.isEmpty():', 'color: #bada55', this.state.q.isEmpty());
    return (
      <div>
        <header>Welcome to next.js!</header>
        <div>test {this.state.q.peek()} test</div>
      </div>
    );
  }
}