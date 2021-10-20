import {None, Always, RR1, RRF} from './const.js';

export default {
    generic: {
        name: 'generic',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: 0,
        D: 1
    },
    combatKnives: {
        name: 'paired combat knives',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: -1,
        D: 1
    },
    mcPowerSword: {
        name: 'mc power sword',
        T: 'M',
        R: 0,
        S: '+1',
        Ap: -3,
        D: 2,
    },
    chainsword : {
        name: 'chainsword',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: -1,
        D: 1,
        mods:{
            A: '+1'
        }
    },
    lightningClaws: {
        name: 'lightning claws',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: -2,
        D: 1,
        mods: {
            A: '+1'
        },
        rerolls: {
            wounds: RRF
        }
    },
    powerSword: {
        name: 'power sword',
        T: 'M',
        R: 0,
        S: '+1',
        Ap: -3,
        D: 1,
    },
    powerAxe: {
        name: 'power axe',
        T: 'M',
        R: 0,
        S: '+2',
        Ap: -2,
        D: 1,
    },
    powerMaul: {
        name: 'power maul',
        T: 'M',
        R: 0,
        S: '+3',
        Ap: -1,
        D: 1,
    },
    powerFist: {
        name: 'power fist',
        T: 'M',
        R: 0,
        S: 'x2',
        Ap: -3,
        D: 2,
        mods: {
            hits: '-1'
        }
    },
    thunderHammer: {
        name: 'thunder hammer',
        T: 'M',
        R: 0,
        S: 'x2',
        Ap: -2,
        D: 3,
        mods: {
            hits: '-1'
        }
    },
    heavyBoltPistol: {
        name: 'heavyBoltPistol',
        T:'P1',
        R:18,
        S:4,
        Ap: -1,
        D:1,
    },
    boltPistol: {
        name: 'bolt pistol',
        T:'P1',
        R:12,
        S:4,
        Ap: 0,
        D:1,
    },
    boltRifle: {
        name: 'bolt rifle',
        T:'R1',
        R:30,
        S:4,
        Ap: -1,
        D:1,
    },
    autoBoltRifle: {
        name: 'auto bolt rifle',
        T:'A3',
        R:24,
        S:4,
        Ap: 0,
        D:1,
    },
    stalkerBoltRifle: {
        name: 'stalker bolt rifle',
        T:'H1',
        R:36,
        S:4,
        Ap: -2,
        D:2,
    },
    markBoltCarbine: {
        name: 'marksrman bolt carbine',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:1,
    },
    mcOccBoltCarbine: {
        name: 'mc occulus bolt carbine',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:2,
    },
    occBoltCarbine: {
        name: 'occulus bolt carbine',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:1,
    },
    grenadeLauncherFrag: {
        name: 'grenade launcher frag',
        T:'Ad6',
        R:30,
        S:3,
        Ap: 0,
        D:1,
    },
    grenadeLauncherKrak: {
        name: 'grenade launcher krak',
        T:'A1',
        R:30,
        S:6,
        Ap: -1,
        D:'d3',
    },
    boltGun: {
        name: 'bolt gun',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:1,
    },
    boltGunHe: {
        name: 'bolt gun hellfire',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:1,
        mods: {
            wounds: '+1'
        }
    },
    boltGunKr: {
        name: 'bolt gun kraken',
        T:'R1',
        R:30,
        S:4,
        Ap: -1,
        D:1,
    },
    boltGunVg: {
        name: 'bolt gun vengence',
        T:'R1',
        R:24,
        S:4,
        Ap: 0,
        D:2,
    },
    infernusHvBolter: {
        name: 'infernus heavy bolter',
        T: 'H3',
        R: 36,
        S: 5,
        Ap: -1,
        D: 2,
    },
    infernusHvBolterTogether: {
        name: 'infernus heavy bolter together',
        T: 'H3',
        R: 36,
        S: 5,
        Ap: -1,
        D: 2,
        mods: {
            hits: '-1'
        }
    },
    infernusHvFlamer: {
        name: 'infernus heavy flamer',
        T: 'Hd6',
        R: 12,
        S: 5,
        Ap: -1,
        D: 1,
        mods: {
            hits: 'always'
        }
    },
    fragCannonFrag: {
        name: 'frag cannon frag',
        T: 'A2d3',
        R: 12,
        S: 6,
        Ap: -1,
        D: 1,
    },
    fragCannonShell: {
        name: 'frag cannon shell',
        T: 'A2',
        R: 24,
        S: 7,
        Ap: -2,
        D: 2,
    },
    twinBolter: {
        name: 'twin bolter',
        T:'R2',
        R:30,
        S:4,
        Ap: -1,
        D:1,
    },
    boltSniperRifleEx: {
        name: 'sniper rifle ex',
        T:'H1',
        R:36,
        S:5,
        Ap: -1,
        D:1,
        mods: {
            hit: '+1'
        }
    },
    boltSniperRifleHy: {
        name: 'sniper rifle hy',
        T:'Hd3',
        R:36,
        S:5,
        Ap: 0,
        D:1
    },
    boltSniperRifleMo: {
        name: 'sniper rifle mo',
        T:'H1',
        R:36,
        S:5,
        Ap: -2,
        D:2,
    },
    dreadCombatWeapon: {
        name:'dreadnought combat weapon',
        T: 'M',
        R: 0,
        S: 'x2',
        Ap: -3,
        D: 3
    },
    stormBolter: {
        name:'storm bolter',
        T: 'R2',
        R: 24,
        S: 4,
        Ap: 0,
        D: 1
    },
    assultCannon: {
        name:'assult cannon',
        T: 'H6',
        R: 24,
        S: 6,
        Ap: -1,
        D: 1
    },
    heavyPlasmaCannon: {
        name:'heavy plasma cannon',
        T: 'Hd3',
        R: 36,
        S: 7,
        Ap: -3,
        D: 2
    },
    twinLascannon: {
        name:'twin lascannon',
        T: 'H2',
        R: 48,
        S: 9,
        Ap: -3,
        D: 'd6'
    },
    accAutocannon: {
        name:'accelerator autocannon',
        T: 'H3',
        R: 48,
        S: 7,
        Ap: -1,
        D: 2
    },
    autoBoltstormGM: {
        name:'auto boltstorm melee',
        T: 'M',
        R: 0,
        S: 'x2',
        Ap: -3,
        D: 2,
        mods: {
            hits: '-1'
        }
    },
    autoBoltstormGR: {
        name:'auto boltstorm range',
        T: 'A3',
        R: 18,
        S: 4,
        Ap: 0,
        D: 1,
    },
    fragstormGrenadeLaunch: {
        name:'fragstom grenade launcher',
        T: 'Ad6',
        R: 18,
        S: 4,
        Ap: 0,
        D: 1,
    },
    flayer: {
        name:'flayer',
        T:'R1',
        R:24,
        S:4,
        Ap: -1,
        D:1,
    },
    reaper: {
        name:'reaper',
        T:'R1',
        R:14,
        S:5,
        Ap: -2,
        D:1,
    },
    glaive: {
        name: 'glaive',
        T: 'M',
        R: 0,
        S: '+2',
        Ap: -3,
        D: 'd3',
    },
    arrow: {
        name: 'arrow',
        T: 'A1',
        R: 120,
        S: '12',
        Ap: -5,
        D: 'd6',
    },
    reapBlade: {
        name: 'reap-blade',
        T: 'M',
        R: 0,
        S: '+2',
        Ap: -4,
        D: '3',
    },
    threshers: {
        name: 'threshers',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: -3,
        D: '2',
    },
    autogun: {
        name: 'autogun',
        T: 'R1',
        R: 24,
        S: 3,
        Ap: 0,
        D: 1,
    },
    autopistol: {
        name: 'autopistol',
        T: 'P1',
        R: 12,
        S: 3,
        Ap: 0,
        D: 1,
    },
    brutalAssultWeapon: {
        name: 'brutal assult weapon',
        T: 'M',
        R: 0,
        S: 'U',
        Ap: 0,
        D: 1,
        mods:{
            A: '+1'
        }
    },
    heavyStubber: {
        name: 'heavy stubber',
        T: 'H3',
        R: 36,
        S: 4,
        Ap: 0,
        D: 1,
    },
    shotgun: {
        name: 'shotgun',
        T: 'A2',
        R: 18,
        S: 3,
        Ap: 0,
        D: 1,
    },
    flamer: {
        name: 'flamer',
        T: 'Ad6',
        R: 12,
        S: 4,
        Ap: 0,
        D: 1,
    }
};
