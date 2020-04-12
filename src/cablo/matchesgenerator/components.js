import React from 'react';

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
