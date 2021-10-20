import models from './models.js';
import weapons from './weapons.js';
import {calcDamageForRanges, calcUnitDamage, statParam, combineMult} from './math.js';


function addValues(attackUnit, num_attackers, weapons, ranges, defenderUnit, extra) {
    extra = extra || {};
    let result = calcDamageForRanges(attackUnit, num_attackers, weapons, ranges, defenderUnit);
    for( const range in result ){
        let r = result[range];
        let newValue = Object.assign({ 
            'atk': r.attacker,
            'def': r.defender,
            'range': range
        }, statParam(r.damage), extra);

        values.push(newValue);
    }
}

function addUnitValues(unit, ranges, defenderUnit, extra) {
    extra = extra || {};
    let result = calcUnitDamage( unit, ranges, defenderUnit);
    for( const range in result ){
        let r = result[range];
        let newValue = Object.assign({ 
            'atk': r.attacker,
            'def': r.defender,
            'range': range
        }, statParam(r.damage), extra);

        values.push(newValue);
    }
}

let values = [];

const ranges = [
'M', 
    3,
    9, 
    20,
    30
];
const defenders  = [
    models.mortarion, 
    models.primeCaptain, 
    models.necronOverlord,
    models.vDreadnought, 
    models.necronSkDestroyer,
    models.outrider, 
    models.aggressor, 
    models.intercessor, 
    models.necronWarrior, 
    models.deathguardCultist,
    models.poxWalkers,
    // models.necronScarab,
];

const defenders_sort = defenders.map( d => d.name );

const attackers = [
    // [models.primeCaptain, 1, weapons.mcPowerSword, {cat:'M'}],
    [models.intercessor, 5, weapons.chainsword, {cat:'M'}],
    [models.intercessor, 5, weapons.lightningClaws, {cat:'M'}],
    [models.intercessor, 5, weapons.powerSword, {cat:'M'}],
    [models.intercessor, 5, weapons.powerAxe, {cat:'M'}],
    [models.intercessor, 5, weapons.powerMaul, {cat:'M'}],
    [models.intercessor, 5, weapons.powerFist, {cat:'M'}],
    [models.intercessor, 5, weapons.thunderHammer, {cat:'M'}],
    [models.aggressor, 3, weapons.autoBoltstormGM, {cat:'M'}],
    [models.vDreadnought, 1, weapons.dreadCombatWeapon, {cat:'M'}],

    // [models.intercessor, 5, weapons.boltGunHe, {cat:'R'}],
    // [models.intercessor, 5, weapons.boltGunKr, {cat:'R'}],
    // [models.intercessor, 5, weapons.boltGunVg, {cat:'R'}],

    [models.intercessor, 5, weapons.autoBoltRifle, {cat:'R'}],
    [models.intercessor, 5, weapons.boltRifle, {cat:'R'}],
    [models.intercessor, 5, weapons.stalkerBoltRifle, {cat:'R'}],
    // [models.intercessor, 5, weapons.occBoltCarbine, {cat:'R'}],
    // [models.intercessor, 5, weapons.markBoltCarbine, {cat:'R'}],

    // [models.intercessor, 5, weapons.grenadeLauncherFrag, {cat:'R'}],
    // [models.intercessor, 5, weapons.grenadeLauncherKrak, {cat:'R'}],

    // [models.eliminator, 3, weapons.boltSniperRifleEx, {cat:'R'}],
    // [models.eliminator, 3, weapons.boltSniperRifleHy, {cat:'R'}],
    // [models.eliminator, 3, weapons.boltSniperRifleMo, {cat:'R'}],

    // [models.aggressor, 3, weapons.autoBoltstormGR, {cat:'R'}],
    // [models.aggressor, 3, weapons.fragstormGrenadeLaunch, {cat:'R'}],

    // [models.intercessor, 3, weapons.accAutocannon, {cat:'R'}],

    // [models.vDreadnought, 1, weapons.assultCannon, {cat:'R'}],
    // [models.vDreadnought, 1, weapons.heavyPlasmaCannon, {cat:'R'}],
    // [models.vDreadnought, 1, weapons.twinLascannon, {cat:'R'}],
    // [models.vDreadnought, 1, weapons.stormBolter, {cat:'R'}],

    // [models.intercessor, 1, weapons.infernusHvBolterTogether, {cat:'R'}],
    // [models.intercessor, 1, weapons.infernusHvBolter, {cat:'R'}],
    // [models.intercessor, 1, weapons.infernusHvFlamer, {cat:'R'}],
    // [models.outrider, 3, weapons.chainsword, {cat:'M'}],
    // [models.outrider, 3, weapons.twinBolter, {cat:'R'}],
    // [models.necronOverlord, 1, weapons.glaive, {cat:'M'}],
    // [models.necronOverlord, 1, weapons.arrow, {cat:'R'}],
    // [models.intercessor, 5, weapons.pistol, {cat:'R'}],
    // [models.necronWarrior, 10, weapons.reaper, {cat:'R'}],
    // [models.necronWarrior, 10, weapons.flayer, {cat:'R'}],
    // [models.necronSkDestroyer, 2, weapons.threshers, {cat:'M'}],
    // [models.necronSkDestroyer, 1, weapons.reapBlade, {cat:'M'}],
    // [models.deathguardCultist, 10, weapons.autogun, {cat:'R'}],
    // [models.deathguardCultist, 10, weapons.brutalAssultWeapon, {cat:'R'}],
    // [models.deathguardCultist, 1, weapons.heavyStubber, {cat:'R'}],
    // [models.deathguardCultist, 1, weapons.shotgun, {cat:'R'}],
    // [models.deathguardCultist, 1, weapons.flamer, {cat:'R'}],
];

for( const d of defenders ) {
    // addUnitValues({
    //     name:'assult intercessor',
    //     models: [
    //         { model: models.intercessor, count: 5, weapons: [ weapons.chainsword, weapons.heavyBoltPistol]},
    //     ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor auto',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.autoBoltRifle]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor stalker',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.stalkerBoltRifle]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.boltRifle]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor auto + 1 frag',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.autoBoltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherFrag]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor stalker + 1 frag',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.stalkerBoltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherFrag]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor + 1 frag',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.boltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherFrag]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor auto + 1 krak',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.autoBoltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherKrak]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor stalker + 1 krak',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.stalkerBoltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherKrak]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'intercessor + 1 krak',
        models: [
            { model: models.intercessor, count: 5, weapons: [ weapons.boltRifle]},
            { model: models.intercessor, count: 1, weapons: [ weapons.grenadeLauncherKrak]},
        ]}, ranges, d, {cat:'U'}); 
    addUnitValues({
        name:'eliminators',
        models: [
            { model: models.eliminator, count: 3, weapons: [ weapons.boltSniperRifleMo]},
        ]}, ranges, d, {cat:'U'}); 
    // addUnitValues({
    //     name:'aggressor',
    //     models: [
    //         { model: models.aggressor, count: 3, weapons: [ 
    //             weapons.autoBoltstormGM, 
    //             weapons.autoBoltstormGR, 
    //             weapons.fragstormGrenadeLaunch
    //         ]},
    //     ]}, ranges, d, {cat:'U'}); 
}


let attackers_sort = attackers.map( d => d[0].name+':'+d[2].name );
const cat_sort = ['M', 'R', 'U'];

for( const d of defenders ) {
    for( const a of attackers) {
        addValues(a[0], a[1], a[2], ranges, d, a[3]);
    }
}



console.log(values);

const colours = ['rgb(230,95,74)', 'rgb(253, 188, 113)', 'rgb(230,227,161)', 'rgb(92,171,173)', 'rgb(27,105,173)'];
const stepWidth = 30;

function layers(bars) {
    let layers = [];
    if ( bars == undefined || bars ) {
        layers.push({
            mark: {type:'bar', opacity:0.3 },
            encoding: {
                y: {field: '0\\.35', type: 'quantitative'},
                y2: {field: '0\\.65', type: 'quantitative'}
            }
        });
    }

    layers.push({
        mark: { type:'line', color:'#000000'},
        encoding: {
            y: {field: '0\\.5', type: 'quantitative'},
        } 
    });
    layers.push({
        mark: { type:'circle', color:'#000000'},
        encoding: {
            y: {field: '0\\.5', type: 'quantitative'},
        } 
    });
    return layers;
}

function facetAtk(filter) {
    return {
        facet: { 
            column: { field:'atk', type:'nominal', sort:attackers_sort }
        },
        spec: {
            transform: [ {filter:filter} ],
            encoding: { 
                x: {field: 'def', type: 'nominal', sort: defenders_sort, axis:{grid:true}},
                y: {axis:{grid:true, tickCount: 11}},
                color: {field: 'range', type: 'nominal', sort: ranges, scale:{range:colours} },
                tooltip: [ 
                    {field: 'def', type: 'nominal'},
                    {field: 'range', type: 'nominal'},
                    {field: '0\\.5', type: 'quantitative'},
                    {field: '0\\.35', type: 'quantitative'},
                    {field: '0\\.65', type: 'quantitative'}
                ]
            },
            layer: layers(true),
        }
    };
}

function facetDef(filter) {
    return {
        facet: { 
            column: { field: 'def', type:'nominal', sort: defenders_sort }
        },
        spec: {
            transform: [ {filter:filter} ],
            encoding: { 
                x: {field: 'atk', type: 'nominal', sort: attackers_sort, axis:{grid:true}},
                y: {axis:{grid:true, tickCount: 11}},
                color: {field: 'range', type: 'nominal', sort: ranges, scale:{range:colours}},
                tooltip: [ 
                    {field: 'atk', type: 'nominal'},
                    {field: 'range', type: 'nominal'},
                    {field: '0\\.5', type: 'quantitative'},
                    {field: '0\\.35', type: 'quantitative'},
                    {field: '0\\.65', type: 'quantitative'}
                ]
            },
            layer: layers(true),
        }
    };
}

function facetAllAtk(filter) {
    return {
        facet: { 
            column: { field: 'range', type:'nominal', sort: ranges }
        },
        spec: {
            transform: [ {filter:filter} ],
            encoding: { 
                x: {field: 'def', type: 'nominal', sort: defenders_sort, axis:{grid:true}},
                y: {axis:{grid:true, tickCount: 11}},
                color: {field: 'atk', type: 'nominal', sort: attackers_sort},
                tooltip: [ 
                    {field: 'atk', type: 'nominal'},
                    {field: 'def', type: 'nominal'},
                    {field: '0\\.5', type: 'quantitative'},
                    {field: '0\\.35', type: 'quantitative'},
                    {field: '0\\.65', type: 'quantitative'}
                ]
            },
            layer: layers(false),
        }
    };
}

function facetAllDef(filter) {
    return {
        facet: { 
            column: { field: 'range', type:'nominal', sort: ranges }
        },
        spec: {
            transform: [ {filter:filter} ],
            encoding: { 
                x: {field: 'atk', type: 'nominal', sort: attackers_sort, axis:{grid:true}},
                y: {axis:{grid:true, tickCount: 11}},
                color: {field: 'def', type: 'nominal', sort: defenders_sort},
                tooltip: [ 
                    {field: 'atk', type: 'nominal'},
                    {field: 'def', type: 'nominal'},
                    {field: '0\\.5', type: 'quantitative'},
                    {field: '0\\.35', type: 'quantitative'},
                    {field: '0\\.65', type: 'quantitative'}
                ]
            },
            layer: layers(false),
        }
    };
}

var firstSpec = {
    description: 'A simple bar chart with embedded data.',
    width: { step:stepWidth},
    data: {
        values: values
    },

    vconcat: [
        facetAtk( 'datum.cat == "M"'),
        facetAtk( 'datum.cat == "R"'),
        facetAtk( 'datum.cat == "U"'),
        facetDef( 'datum.cat == "M"'),
        facetDef( 'datum.cat == "R"'),
        facetDef( 'datum.cat == "U"')
    ]
};
vegaEmbed('#vega', firstSpec);

var secondSpec = {
    description: 'A simple bar chart with embedded data.',
    width: { step:stepWidth},
    data: {
        values: values
    },

    vconcat: [
        facetAllAtk( 'datum.cat != "U"'),
        facetAllDef( 'datum.cat != "U"'),
    ]
};
vegaEmbed('#vega_all_atk', {
    description: 'A simple bar chart with embedded data.',
    width: { step:stepWidth},
    data: {
        values: values
    },

    vconcat: [
        facetAllAtk( 'datum.cat != "U"'),
    ]
});
vegaEmbed('#vega_all_def', {
    description: 'A simple bar chart with embedded data.',
    width: { step:stepWidth},
    data: {
        values: values
    },

    vconcat: [
        facetAllDef( 'datum.cat != "U"'),
    ]
});

