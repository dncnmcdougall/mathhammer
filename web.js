import units from './units.js';
import  weapons from './weapons.js';
import  {calcDamage, statParam, combineMult} from './math.js';


function addValues(attackUnit, num_attackers, weapons, ranges, defenderUnit, extra) {
    extra = extra || {};
    let result = calcDamage(attackUnit, num_attackers, weapons, ranges, defenderUnit);
    for( const range in result ){
        let r = result[range];
        let newValue = Object.assign({ 
            'atk': r.attacker.name,
            'def': r.defender.name,
            'range': range
        }, statParam(r.damage), extra);

        values.push(newValue);
    }
}

function addCombinedValues(name, combined, ranges, defenderUnit, extra) {
    extra = extra || {};
    let results = [];
    for( const c of combined) {
        results.push(calcDamage(c[0], c[1], c[2], ranges, defenderUnit));
    }
    let i =0;
    for( const r of ranges ){
        let damage = results[0][r].damage
        for(i=1;i<results.length;i++) {
            damage = combineMult(damage, results[i][r].damage)
        }

        let newValue = Object.assign({ 
            'atk': name,
            'def': results[0][r].defender.name,
            'range': r
        }, statParam(damage), extra);

        values.push(newValue);
    }
}

let values = [];

const ranges = [
'M', 
    9, 
    14,
    20
];
const defenders  = [
    units.captain, 
    units.necronOverlord,
    units.vDreadnought, 
    units.necronSkDestroyer,
    units.outrider, 
    units.intercessor, 
    units.necronWarrior, 
    units.necronScarab,
    units.deathguardCultist,
];

const defenders_sort = defenders.map( d => d.name );

const attackers = [
    // [units.captain, 1, weapons.mcPowerSword, {cat:'M'}],
    [units.intercessor, 5, weapons.chainsword, {cat:'M'}],
    [units.intercessor, 5, weapons.lightningClaws, {cat:'M'}],
    [units.intercessor, 5, weapons.powerSword, {cat:'M'}],
    [units.intercessor, 5, weapons.powerAxe, {cat:'M'}],
    [units.intercessor, 5, weapons.powerMaul, {cat:'M'}],
    [units.intercessor, 5, weapons.powerFist, {cat:'M'}],
    // [units.intercessor, 5, weapons.thunderHammer, {cat:'M'}],
    [units.intercessor, 5, weapons.boltRifle, {cat:'R'}],
    [units.intercessor, 5, weapons.boltGunKr, {cat:'R'}],
    [units.intercessor, 5, weapons.boltGunVg, {cat:'R'}],
    [units.eliminator, 3, weapons.boltSniperRifleEx, {cat:'R'}],
    [units.eliminator, 3, weapons.boltSniperRifleHy, {cat:'R'}],
    [units.eliminator, 3, weapons.boltSniperRifleMo, {cat:'R'}],
    // [units.intercessor, 1, weapons.infernusHvBolterTogether, {cat:'R'}],
    // [units.intercessor, 1, weapons.infernusHvBolter, {cat:'R'}],
    // [units.intercessor, 1, weapons.infernusHvFlamer, {cat:'R'}],
    // [units.outrider, 3, weapons.chainsword, {cat:'M'}],
    // [units.outrider, 3, weapons.twinBolter, {cat:'R'}],
    // [units.necronOverlord, 1, weapons.glaive, {cat:'M'}],
    // [units.necronOverlord, 1, weapons.arrow, {cat:'R'}],
    // [units.intercessor, 5, weapons.pistol, {cat:'R'}],
    // [units.necronWarrior, 10, weapons.reaper, {cat:'R'}],
    // [units.necronWarrior, 10, weapons.flayer, {cat:'R'}],
    // [units.necronSkDestroyer, 2, weapons.threshers, {cat:'M'}],
    // [units.necronSkDestroyer, 1, weapons.reapBlade, {cat:'M'}],
    // [units.deathguardCultist, 10, weapons.autogun, {cat:'R'}],
    // [units.deathguardCultist, 10, weapons.brutalAssultWeapon, {cat:'R'}],
    // [units.deathguardCultist, 1, weapons.heavyStubber, {cat:'R'}],
    // [units.deathguardCultist, 1, weapons.shotgun, {cat:'R'}],
    // [units.deathguardCultist, 1, weapons.flamer, {cat:'R'}],
];

for( const d of defenders ) {
    let v = 
    addCombinedValues('veterens Kr', [
        [units.intercessor,1,weapons.infernusHvBolter],
        // [units.intercessor,1,weapons.infernusHvBolterTogether],
        // [units.intercessor,1,weapons.infernusHvFlamer],
        [units.intercessor,4,weapons.boltGunKr]
    ], ranges, d, {cat: 'R'});
    addCombinedValues('veterens 4c 1t', [
        [units.intercessor,1,weapons.thunderHammer],
        // [units.intercessor,1,weapons.infernusHvBolterTogether],
        // [units.intercessor,1,weapons.infernusHvFlamer],
        [units.intercessor,4,weapons.chainsword]
    ], ranges, d, {cat: 'M'});
}

let attackers_sort = attackers.map( d => d[0].name+':'+d[2].name );
attackers_sort.push('veterens Kr', 'veterens Vg');
const cat_sort = ['M', 'R'];

for( const d of defenders ) {
    for( const a of attackers) {
        addValues(a[0], a[1], a[2], ranges, d, a[3]);
    }
}



console.log(values);

function spec(filter) {
    return {
        transform: [ {filter:filter} ],
        encoding: { 
            x: {field: 'def', type: 'nominal', sort: defenders_sort, axis:{grid:true}},
            y: {axis:{grid:true, tickCount: 11}},
            color: {field: 'range', type: 'nominal', sort: ranges, scale:{scheme:'spectral'}},
            tooltip: [ 
                {field: 'def', type: 'nominal'},
                {field: 'range', type: 'nominal'},
                {field: '0\\.5', type: 'quantitative'},
                {field: '0\\.35', type: 'quantitative'},
                {field: '0\\.65', type: 'quantitative'}
            ]
        },
        layer:[
            // {
            //     mark: 'rule',
            //     encoding: {
            //         y: {field: '0', type: 'quantitative'},
            //         y2: {field: '1', type: 'quantitative'}
            //     } 
            // },
            {
                mark: {type:'area', opacity:0.3 },
                encoding: {
                    y: {field: '0\\.35', type: 'quantitative'},
                    y2: {field: '0\\.65', type: 'quantitative'}
                }
            },
            {
                mark: { type:'line', color:'#000000'},
                encoding: {
                    y: {field: '0\\.5', type: 'quantitative'},
                } 
            },
        ]
    };
}

var yourVlSpec = {
    description: 'A simple bar chart with embedded data.',
    data: {
        values: values
    },

    vconcat: [
        {
            facet: { 
                column: { field: 'atk', type:'nominal', sort: attackers_sort},
            },
            spec: spec( 'datum.cat == "M"')
        },
        {
            facet: { 
                column: { field: 'atk', type:'nominal', sort: attackers_sort},
            },
            spec: spec( 'datum.cat == "R"')
        },
    ]
};
vegaEmbed('#vega', yourVlSpec);
