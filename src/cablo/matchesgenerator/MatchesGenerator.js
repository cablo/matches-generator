export default class MatchesGenerator {

    constructor() {
        this.matches = [];
    }

    generate(n) {
        let k = Math.ceil(n / 2);
        this.subset(0, k, n, new Array(k));
        return this.matches;
    }

    subset(start, size, n, team) {
        if (size === 0) {
            this.matches.push({
                state: 0,
                left: [...team],
                right: MatchesGenerator.getOppositeTeam(team, n)
            });
            return;
        }
        for (let i = start; i <= (n - size); i++) {
            team[team.length - size] = i;
            this.subset(i + 1, size - 1, n, team);
        }
    }

    static getOppositeTeam(team1, n) {
        let team2 = [];
        for (let i = 0; i < n; i++) {
            if (team1.find(e => e === i) === undefined) {
                team2.push(i);
            }
        }
        return team2;
    }
}