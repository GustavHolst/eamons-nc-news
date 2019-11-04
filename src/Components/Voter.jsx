import React, { Component } from 'react';
import * as api from '../api';

class Voter extends Component {
  state = { voteChange: 0, err: null };

  render() {
    const { votes, loggedInUser } = this.props;
    const { voteChange, err } = this.state;

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
            {err ? <p>Error</p> : null}
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
        .catch(err => {
          err = { status: err.response.status, msg: err.response.data.msg };
          this.setState({ err, isLoading: false });
        });
    } else {
      api.voteOnComment(item_id, direction).catch(err => {
        err = { status: err.response.status, msg: err.response.data.msg };
        this.setState({ err, isLoading: false });
      });
      this.setState(currentState => {
        return { voteChange: currentState.voteChange + direction };
      });
    }
  };
}

export default Voter;
