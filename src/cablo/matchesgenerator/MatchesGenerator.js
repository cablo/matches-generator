export default class MatchesGenerator {

    static generate(n) {
        let matches = [];
        if (n > 1) {
            let k = Math.ceil(n / 2);
            MatchesGenerator._subset(0, k, n, new Array(k), matches);
        }
        return matches;
    }

    static _subset(start, size, n, team, matches) {
        if (size === 0) {
            matches.push({
                left: [...team],
                right: MatchesGenerator._getOppositeTeam(team, n)
            });
            return;
        }
        for (let i = start; i <= (n - size); i++) {
            team[team.length - size] = i;
            MatchesGenerator._subset(i + 1, size - 1, n, team, matches);
        }
    }

    static _getOppositeTeam(team1, n) {
        let team2 = [];
        for (let i = 0; i < n; i++) {
            if (team1.find(e => e === i) === undefined) {
                team2.push(i);
            }
        }
        return team2;
    }
}