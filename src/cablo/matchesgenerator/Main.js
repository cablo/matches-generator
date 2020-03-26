import React from 'react';
import MatchesGenerator from './MatchesGenerator';
import * as F from './components';
import './css/bootstrap.min.css';
import './Main.css';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        let players = ['Zetko', 'Cecka', 'Acko', 'Becko'].map(elm => {
            return {
                name: elm,
                wins: 0
            };
        });
        this.state = {
            editing: true,
            playerName: '',
            players: players,
            matches: new MatchesGenerator().generate(players.length),
            matchesPlayed: 0
        };
    }

    _sortPlayers = (players) => {
        return [...players].sort((player1, player2) => {
            let compareWins = player2.wins - player1.wins;
            if (compareWins === 0) {
                return player1.name.localeCompare(player2.name);
            }
            return compareWins;
        });
    };

    onPlayerNameChange = (playerName) => {
        this.setState({playerName: playerName});
    };

    onPlayerAdd = () => {
        let playerName = this.state.playerName.trim();
        if (playerName) {
            let players = this._sortPlayers([...this.state.players, {name: playerName, wins: 0}]);
            this.setState({
                players: players,
                matches: new MatchesGenerator().generate(players.length)
            });
        }
        this.setState({
            playerName: ''
        });
    };

    onPlayerRemove = (index) => {
        if (this.state.editing) {
            let players = this.state.players.filter((_, i) => i !== index);
            this.setState({
                players: players,
                matches: new MatchesGenerator().generate(players.length)
            });
        }
    };

    onMatchChange = (index) => {
        // clear players wins
        let players = [...this.state.players];
        players.forEach((player) => player.wins = 0);

        // update match state
        let matches = [...this.state.matches];
        matches[index].state++;
        if (matches[index].state > 3) {
            matches[index].state = 0;
        }
        // count all wins from matches
        let matchesPlayed = 0;
        matches.forEach((match) => {
            let winTeam = (match.state === 2) ? match.left : (match.state === 3 ? match.right : null);
            if (winTeam) {
                winTeam.forEach((playerIndex) => players[playerIndex].wins++);
                matchesPlayed++;
            }
        });

        // count player wins and update players
        this.setState({
            players: players,
            matches: matches,
            matchesPlayed: matchesPlayed
        });
    };

    render() {
        return <React.Fragment>
            <F.NameInput isEditing={this.state.editing}
                         playerName={this.state.playerName}
                         matchesPlayed={this.state.matchesPlayed}
                         onPlayerNameChange={this.onPlayerNameChange}
                         onPlayerAdd={this.onPlayerAdd}
                         onStartStop={() => this.setState({editing: !this.state.editing})}/>
            <F.Players isEditing={this.state.editing}
                       players={this._sortPlayers(this.state.players)}
                       onPlayerRemove={this.onPlayerRemove}/>
            <F.MatchesTable
                isEditing={this.state.editing}
                matches={this.state.matches}
                players={this.state.players}
                onMatchChange={(index) => this.onMatchChange(index)}/>
        </React.Fragment>
    }
};
