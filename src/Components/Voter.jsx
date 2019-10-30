import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class Voter extends Component {
  state = { voteChange: 0 };

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
      <section>
        <h4>Votes</h4>
        {loggedInUser.username === 'guest' ? (
          <div>
            <p>{votes}</p>
            <p>
              <Link to="/">
                <i>Log in</i>
              </Link>{' '}
              to vote
            </p>
          </div>
        ) : (
          <div>
            <button
              onClick={this.handleVote}
              disabled={voteChange === 1 ? true : false}
            >
              Upvote
            </button>
            <p>{votes + voteChange}</p>
            <button
              onClick={this.handleVote}
              disabled={voteChange === -1 ? true : false}
            >
              Downvote
            </button>
          </div>
        )}
      </section>
    );
  }

  handleVote = event => {
    const { item_id, voteOn } = this.props;
    const direction = event.target.textContent === 'Upvote' ? 1 : -1;
    if (voteOn === 'Article') {
      api.voteOnArticle(item_id, direction).then(() => {
        this.setState(currentState => {
          return { voteChange: currentState.voteChange + direction };
        });
      });
    } else {
      api.voteOnComment(item_id, direction).then(() => {
        this.setState(currentState => {
          return { voteChange: currentState.voteChange + direction };
        });
      });
    }
  };
}

export default Voter;
