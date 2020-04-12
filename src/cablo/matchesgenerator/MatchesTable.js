import React from 'react';

const stateToScore = ['&nbsp;&nbsp;:&nbsp;&nbsp;', '0&nbsp;:&nbsp;0', '1&nbsp;:&nbsp;0', '0&nbsp;:&nbsp;1'];

export default class MatchesTable extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.props.matchesTableRenderSwitch === nextProps.matchesTableRenderSwitch);
    }

    render() {
        return (!this.props.matches.length) ? null :
            <div className="table-scroll-wrap">
                <table className="table table-bordered table-striped">
                    <tbody>{
                        this.props.matches.map((match, i) =>
                            <tr key={i}>
                                <td className="col-index"><span className="cell-index">{this.props.matches.length - i}</span></td>
                                {match.left.map(p => <td key={p} className={'state-left-' + match.state}>{this.props.players[p].name}</td>)}
                                <td className="col-state">
                                    <button disabled={this.props.isEditing} className="btn btn-primary button-state" onClick={e => this.props.onMatchChange(i)} dangerouslySetInnerHTML={{__html: stateToScore[match.state]}}/>
                                </td>
                                {match.right.map(p => <td key={p} className={'state-right-' + match.state}>{this.props.players[p].name}</td>)}
                            </tr>
                        )
                    }</tbody>
                </table>
            </div>
    }
}
