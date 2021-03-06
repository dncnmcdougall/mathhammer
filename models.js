import {None, Always, RR1, RRF} from './const.js';

export default {
    primeCaptain: {
        name: 'prime captain',
        Ws: 2,
        Bs: 2,
        S: 4,
        T: 4,
        W: 6,
        A: 5,
        Sv: 3,
        Inv: 4
    },
    lieutenant: {
        name: 'prime lieutenant',
        Ws: 2,
        Bs: 2,
        S: 4,
        T: 4,
        W: 5,
        A: 4,
        Sv: 3
    },
    intercessor: {
        name: 'intercessor',
        Ws: 3,
        Bs: 3,
        S: 4,
        T: 4,
        W: 2,
        A: 2,
        Sv: 3,
    },
    aggressor: {
        name: 'aggressor',
        Ws: 3,
        Bs: 3,
        S: 4,
        T: 5,
        W: 3,
        A: 3,
        Sv: 3,
    },
    vDreadnought: {
        name: 'v dreadnought',
        Ws: 2,
        Bs: 2,
        S: 6,
        T: 7,
        W: 8,
        A: 4,
        Sv: 3,
        mods: {
            D: '-1'
        }
    },
    outrider: {
        name: 'outrider',
        Ws: 3,
        Bs: 3,
        S: 4,
        T: 5,
        W: 4,
        A: 2,
        Sv: 3,
    },
    eliminator: {
        name: 'eliminator',
        Ws: 3,
        Bs: 2,
        S: 4,
        T: 4,
        W: 2,
        A: 2,
        Sv: 3,
    },
    necronOverlord: {
        name:'overlord',
        Ws: 2,
        Bs: 2,
        S: 5,
        T: 5,
        W: 5,
        A: 3,
        Sv: 3,
        Inv: 4
    },
    necronSkDestroyer: {
        name: 'skorpeck destroyer',
        Ws: 3,
        Bs: 3,
        S: 5,
        T: 5,
        W: 3,
        A: 3,
        Sv: 3,
    },
    necronWarrior: {
        name: 'necron',
        Ws: 3,
        Bs: 3,
        S: 4,
        T: 4,
        W: 1,
        A: 1,
        Sv: 4,
    },
    necronScarab: {
        name:'scarab',
        Ws: 4,
        Bs: None,
        S: 3,
        T: 3,
        W: 4,
        A: 4,
        Sv: 6,
    },
    mortarion: {
        name: 'mortarion',
        Ws: 2,
        Bs: 2,
        S: 8,
        T: 8,
        W: 18,
        A: 7,
        Sv: 3,
        Inv: 4
    },
    deathguardCultist: {
        name: 'cultist',
        Ws: 4,
        Bs: 4,
        S: 3,
        T: 3,
        W: 1,
        A: 1,
        Sv: 6,
    },
    poxWalkers: {
        name: 'pox walker',
        Ws: 4,
        Bs: 0,
        S: 3,
        T: 4,
        W: 1,
        A: 2,
        Sv: 7,
    }

};
