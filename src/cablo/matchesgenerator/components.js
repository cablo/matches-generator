import React from 'react';

const stateToScore = ['&nbsp;&nbsp;:&nbsp;&nbsp;', '0&nbsp;:&nbsp;0', '1&nbsp;:&nbsp;0', '0&nbsp;:&nbsp;1'];

export const NameInput = (props) => {
    return <div className="form-line">
        {
            props.isEditing &&
            <React.Fragment>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    props.onPlayerAdd();
                }}>
                    <input type="text" className="form-control"
                           placeholder="Player Name"
                           value={props.playerName}
                           onChange={e => props.onPlayerNameChange(e.target.value)}
                           ref={input => input && input.focus()}/>
                </form>
                <button disabled={!props.playerName.length} type="submit" className="btn btn-primary button-add" onClick={props.onPlayerAdd}>Add</button>
            </React.Fragment>
        }
        {
            !props.isEditing &&
            <div>{props.matchesPlayed}&nbsp;matches</div>
        }
        <button className="btn btn-danger button-start-stop" disabled={!props.matchesLength} onClick={props.onStartStop}>{props.isEditing ? 'Start!' : 'Stop!'}</button>
    </div>
};

export const Players = (props) => {
    return (!props.players.length) ? null :
        <div className="players">
            {props.players.map((player, index) =>
                <button disabled={!props.isEditing} key={index} className="btn btn-secondary button-player"
                        onClick={() => props.onPlayerRemove(index)}>{player.name + ((props.isEditing) ? "" : (" (" + player.wins + ")"))}
                </button>)}
        </div>
};

export const MatchesTable = (props) => {
    return (!props.matches.length) ? null :
        <div className="table-scroll-wrap">
            <table className="table table-bordered table-striped">
                <tbody>{
                    props.matches.map((match, i) =>
                        <tr key={i}>
                            <td className="col-index"><span className="cell-index">{props.matches.length - i}</span></td>
                            {match.left.map(p => <td key={p} className={'state-left-' + match.state}>{props.players[p].name}</td>)}
                            <td className="col-state">
                                <button disabled={props.isEditing} className="btn btn-primary button-state" onClick={e => props.onMatchChange(i)} dangerouslySetInnerHTML={{__html: stateToScore[match.state]}}/>
                            </td>
                            {match.right.map(p => <td key={p} className={'state-right-' + match.state}>{props.players[p].name}</td>)}
                        </tr>
                    )
                }</tbody>
            </table>
        </div>
};
