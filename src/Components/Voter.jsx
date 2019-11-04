import React, { Component } from 'react';
import * as api from '../api';
import ErrorPage from './ErrorPage';

class Voter extends Component {
  state = { voteChange: 0, err: null };

  render() {
    const { votes, loggedInUser } = this.props;
    const { voteChange, err } = this.state;

    if (err) return <ErrorPage err={err} />;

    return (
      <section id="voter">
        <h4 className="votes-header">Votes</h4>
        {loggedInUser.username === 'guest' ? (
          <p>{votes}</p>
        ) : (
          <div>
            <button
              className="vote-button-up"
              onClick={this.handleVote}
              disabled={voteChange === 1 ? true : false}
            >
              ↑
            </button>
            <p>{votes + voteChange}</p>
            <button
              className="vote-button-down"
              onClick={this.handleVote}
              disabled={voteChange === -1 ? true : false}
            >
              ↓
            </button>
          </div>
        )}
      </section>
    );
  }

  handleVote = event => {
    const { item_id, voteOn } = this.props;
    const direction = event.target.textContent === '↑' ? 1 : -1;
    if (voteOn === 'Article') {
      api
        .voteOnArticle(item_id, direction)
        .then(() => {
          this.setState(currentState => {
            return { voteChange: currentState.voteChange + direction };
          });
        })
        .catch(err => this.setState({ err }));
    } else {
      api
        .voteOnComment(item_id, direction)
        .then(() => {
          this.setState(currentState => {
            return { voteChange: currentState.voteChange + direction };
          });
        })
        .catch(err => this.setState({ err }));
    }
  };
}

export default Voter;
