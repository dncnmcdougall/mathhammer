import weapons from './weapons.js';
import {None, Always, RR1, RRF} from './const.js';

const generic_combat_weapon = weapons.generic;
const d6 = _d(6);
const d3 = _d(3);

function _inc(dict, key, value) {
    if ( key in dict ) {
        dict[key] += value;
    } else {
        dict[key] = value;
    }
}

function _d(sides) {
    let result = {};
    for( let i =1; i<=sides; i++) {
        result[i] = 1;
    }
    return result;
}

function combineAdd(r1, r2) {
    let new_result = {};

    for( const i in r1 ) {
        const ii = parseInt(i);
        const fi = parseFloat(r1[i]);
        for( const j in r2 ) {
            _inc(new_result, ii+parseInt(j), fi+parseFloat(r2[j]));
        }
    }
    return new_result;
}

export function combineMult(r1, r2){
    if ( r1 == undefined || Object.keys(r1).length == 0 ) {
        return r2;
    }
    if ( r2 == undefined || Object.keys(r2).length == 0 ) {
        return r1;
    }

    let new_result = {};

    for( const i in r1 ) {
        const ii = parseInt(i);
        const fi = parseFloat(r1[i]);
        for( const j in r2 ) {
            _inc(new_result, ii+parseInt(j), fi*parseFloat(r2[j]));
        }
    }
    return new_result;
}

function add(r1, r2) {
    let new_result = {};

    for( const i in r1 ) {
        _inc(new_result, i, r1[i]);
    }
    for( const i in r2 ) {
        _inc(new_result, i, r2[i]);
    }
    return new_result;
}

function addOn(values, r, r_to_add) {
    let new_result = {};
    let found = false;
    for( const inx in r ) {
        const i = parseInt(inx);
        if ( values.includes(i) ) {
            found = true;
        } else {
            _inc(new_result, i, r[i]);
        }
    }
    if ( found ) {
        new_result = add(new_result, r_to_add);
    }
    return new_result;
}

function addOnThreshUp(thresh, r, r_to_add) {
    let new_result = {};
    let found = false;
    for( const i in r ) {
        if ( i < thresh ) {
            found = true;
        } else {
            _inc(new_result, i, r[i]);
        }
    }
    if ( found ) {
        new_result = add(new_result, r_to_add);
    }
    return new_result;
}

function binomial(n, k, p) {
    let mn = Math.min(k, (n-k));
    let mx = Math.max(k, (n-k));
    let nk = 1;
    for( let i = n; i>0; i--) {
        if ( i > mx) {
            nk *= i;
        } else if ( i<= mn ){
            nk /= i;
        }
    }
    let prob = nk*Math.pow(p,k)*Math.pow(1-p, (n-k));
    return prob;
}

function modD(d, ignore, mod, reroll, reroll_thresh) {
    let result = d;
    if ( reroll == RR1 ) {
        console.log('rr1');
        result = addOn([1], result, d);
        console.log(result);
    }

    if ( mod == '+1' || mod == '-1' ) {
        const amount = parseInt(mod);
        let new_d = {};
        for( const inx in d) {
            const i = parseInt(inx);
            if ( ignore.includes( i) ) {
                _inc(new_d, i, result[i])
            } else {
                _inc(new_d, i+amount, result[i])
            }
        }
        result = new_d;
    }

    //TODO ask Jed if this is OK.
    if ( reroll == RRF ) {
        result = addOnThreshUp(reroll_thresh, result, d);
    }
    return result;
}

function shift(result, amount, min) {
    min = min || -Infinity
    let new_result = {};
    for( const k in result) {
        let fk = Math.max(parseFloat(k)+amount, min);
        _inc(new_result,fk, result[k]);
    }
    return new_result;
}

function shiftDownToMax(result, max) {
    let new_result = {};
    for( const k in result) {
        let fk = Math.min(parseFloat(k), max);
        _inc(new_result, fk, result[k]);
    }
    return new_result;
}

function threshUp(value, r) {
    let new_result = { '0': 0, '1':0 };
    for( const i in r ) {
        let v = parseInt(i);
        if ( v >= value ) {
            new_result['1'] += r[i];
        } else {
            new_result['0'] += r[i];
        }
    }
    return new_result;
}

function threshDown(value, r) {
    let new_result = { '0': 0, '1':0 };
    for( const i in r ) {
        let v = parseInt(i);
        if ( v < value ) {
            new_result['1'] += r[i];
        } else {
            new_result['0'] += r[i];
        }
    }
    return new_result;
}

function asD( r ) {
    if ( typeof(r) == 'number' ) {
        let result = {};
        result[r] = 1;
        return result;
    } else {
        return r;
    }
};

function P(r){
    let new_result = {};
    let sum = 0;
    for( const i in r) {
        new_result[i] = 0;
        sum += parseFloat(r[i]);
    }
    for( const i in r) {
        new_result[i] = r[i]/sum;
    }
    return new_result;
}


function combineReroll(rr1, rr2) {
    if ( rr1 == Always || rr2 == Always ) {
        return Always;
    } else if ( rr1 == RRF || rr2 == RRF ) {
        return RRF;
    } else if ( rr1 == RR1 || rr2 == RR1 ) {
        return RR1
    } else {
        return undefined;
    }
}

function combineRerollObjs(rr1, rr2) {
    rr1 = rr1 || {};
    rr2 = rr2 || {};

    let new_rr = {};
    for( const k in rr1) {
        if ( k in rr2 ) {
            new_rr[k] = combineReroll(rr1[k], rr2[k]);
        } else {
            new_rr[k] = rr1[k];
        }
    }
    for( const k in rr2) {
        if ( !(k in rr1) ) {
            new_rr[k] = rr2[k];
        }
    }
    return new_rr;
}

function combineMod(mod1, mod2) {
    if ( mod1 == undefined ) {
        return mod2;
    } else if ( mod2 == undefined ) {
        return mod1;
    } else if ( mod1.startsWith('x') ) {
        if ( mod2.startsWith('x') ) {
            let v1 = parseInt(mod1.slice(1));
            let v2 = parseInt(mod2.slice(1));
            //TODO Is this correct or even possible?
            return 'x'+(v1*v2);
        } else {
            //TODO what happens if there is a +1 mod and a x2 mod?
            return mod1;
        }
    } else if ( mod2.startsWith('x') ) {
        return mod2;
    } else if ( mod1.startsWith('+') || mod1.startsWith('-') ){
        if ( mod2.startsWith('+') || mod2.startsWith('-') ){
            let v = parseInt(mod1) + parseInt(mod2);
            if ( v < 0 ) {
                return ''+v;
            } else if ( v == 0 ) {
                return 'U';
            } else {
                return '+'+(v);
            }
        } else {
            return mod1;
        }
    } else { //not undefined, +# or -#
        return 'U'
    }
}

function combineModObjs(mod1, mod2) {
    mod1 = mod1 || {};
    mod2 = mod2 || {};
    let new_mod = {};
    for( const k in mod1) {
        if ( k in mod2 ) {
            new_mod[k] = combineMod(mod1[k], mod2[k]);
        } else {
            new_mod[k] = mod1[k];
        }
    }
    for( const k in mod2) {
        if ( !(k in mod1) ) {
            new_mod[k] = mod2[k];
        }
    }
    return new_mod;
}

function modValue(val, mod) {
    if ( mod == undefined ) {
        return val;
    } else if ( typeof(mod) == 'number' ) {
        return mod;
    } else if ( mod == 'U' ) {
        return val;
    } else if ( mod.startsWith('+') ) {
        let newMod = parseInt(mod.slice(1));
        return val + newMod;
    } else if (mod.startsWith('x') ) {
        let newMod = parseInt(mod.slice(1));
        return val * newMod;
    } else if (mod.startsWith('-') ) {
        let newMod = parseInt(mod.slice(1));
        return val - newMod;
    } else {
        const newMod = parseInt(mod);
        return isNaN(newMod) ? val : newMod;
    }
}

function strToAttacks(desc) {
    if ( typeof(desc) == 'number') {
        return desc;
    } else if ( desc.includes('d') ) {
        let parts = desc.split('d');
        let num = 0;
        let sides = 0;
        if ( parts.length == 1 ) {
            num = 1;
            sides = parseInt(parts[0])
        } else {
            num = parseInt(parts[0]);
            sides = parseInt(parts[1])
        }
        let atks = _d(sides);
        for(let i=1;i<num;i++) {
            atks = combineMult(atks, _d(sides) );
        }
        return atks;
    } else {
        return parseInt(desc);
    }
}

function calculateAttacks( unit, weapon, range ) {
    let result = {
        Ws: 0,
        S: 0,
        Ap: 0,
        A: 0,
        D: 0
    };

    if ( range!= 'M' ) {
        range = parseInt(range);
    }

    if ( range == 'M' && weapon.T == 'M' ) {

        result.Ws = modValue(unit.Ws, weapon.mods && weapon.mods.Ws);
        result.A = modValue(unit.A, weapon.mods && weapon.mods.A );

    } else if ( (range == 'M' && weapon.T.startsWith('P')) 
        || (range != 'M' && weapon.R >= range) ) {

        result.Ws = modValue(unit.Bs, weapon.mods && weapon.mods.Bs);
        result.A = strToAttacks(weapon.T.slice(1));
        if ( weapon.T.startsWith('R') && weapon.R >= (2*range) ) {
            result.A *= 2;
        }

    } else {
        return result;
    }

    result.S = modValue(unit.S, weapon.S );
    result.Ap = weapon.Ap;
    result.D = weapon.D;

    return result;
}

function calculateAttacker( unit, weapon, range) {
    let name = unit.name+':'+weapon.name;
    let attacker = {name:name};

    const attacks = calculateAttacks(unit, weapon, range);
    attacker.Ws = attacks.Ws;
    attacker.S = attacks.S;
    attacker.Ap = attacks.Ap;
    attacker.A = attacks.A;
    attacker.D = attacks.D;

    attacker.R = range;
    attacker.mods = combineModObjs(unit.mods, weapon.mods);
    attacker.rerolls = combineRerollObjs(unit.rerolls, weapon.rerolls);
    return attacker;
}

function calculateDefender(unit) {
    let defender = {
        name: unit.name,
        T: unit.T,
        W: unit.W,
        Sv: unit.Sv,
    };
    defender.Inv = unit.Inv;
    defender.mods = Object.assign({}, unit.mods);
    defender.rerolls = Object.assign({}, unit.rerolls);

    return defender;
}

function rollHits(ws, mods, rerolls) {
    mods = mods || {};
    rerolls = rerolls || {};

    if ( mods.hits == Always ) {
        return {0:0,1:1};
    }

    ws = modValue(ws, mods.Ws);

    let d = modD(d6, [1,6], mods.hits, rerolls.hits, ws);

    return P(threshUp(ws,d));
}

function rollWounds(S, T, mods, rerolls) {
    mods = mods || {};
    rerolls = rerolls || {};

    if ( mods.wounds == Always ) {
        return {0:0,1:1};
    }

    S = modValue(S, mods.S);
    T = modValue(T, mods.T);

    let wt = 1;
    if ( S >= (2*T) ) {
        wt = 2;
    } else if ( S > T )  {
        wt = 3;
    } else if ( S == T )  {
        wt = 4;
    } else if ( (2*S) <= T ) {
        wt = 6;
    } else if ( S < T)  {
        wt = 5;
    } else {
        console.error(S+' <-> ' + T);
        throw new Error('WAT?!');
    }

    let d = modD(d6, [1,6], mods.wounds, rerolls.wounds, wt);

    return P(threshUp(wt, d));
}

function rollSaves(Sv, Ap, Inv, mods, rerolls) {
    mods = mods || {};
    rerolls = rerolls || {};

    if ( mods.saves == Always ) {
        return {0:0,1:1};
    }

    Sv = modValue(Sv, mods.Sv);
    Ap = modValue(Ap, mods.Ap);

    let d = modD(d6, [1], mods.saves, rerolls.saves);

    let st = Sv - Ap;
    if ( Inv ) {
        st = Math.min(st, Inv);
    }

    return P(threshUp(st,d));
}


function chanceToDamage(attacker, defender) {
    const hits = rollHits(attacker.Ws, attacker.mods , attacker.rerolls);

    const wounds = rollWounds(attacker.S, defender.T, attacker.mods, attacker.rerolls);

    const mods = combineModObjs(attacker.mods, defender.mods);
    const rerolls = combineRerollObjs(attacker.rerolls, defender.rerolls);
    const saves = rollSaves(defender.Sv, attacker.Ap, defender.Inv, mods, rerolls);

    let applyDamage = {}
    applyDamage[1] = hits[1]*wounds[1]*saves[0];
    applyDamage[0] = hits[0] + hits[1]*wounds[0] + hits[1]*wounds[1]*saves[1];

    return applyDamage;
};

function rollAttacks(attacker, num_attackers, p) {
    let num_attacks = P(asD(attacker.A));

    let result = {};

    for( const a in num_attacks ) {
        const nA = parseInt(a)*num_attackers;
        const pA = num_attacks[a];
        for( let i = 0; i<= nA; i++){
            let b = binomial(nA, i, p);
            _inc(result, i, b*pA);
        }
    }
    let sum = 0;
    for( const r in result ) {
        sum += result[r];
    }
    return result;
}

function rollDamage(attacker, defender, atks) {

    let d = asD(strToAttacks( attacker.D));
    if ( defender.mods && defender.mods.D == '-1' ){
        d = shift(d,-1,1);
    }
    d = shiftDownToMax(d, defender.W);

    let num_damage = P(d);
    let result = {}
    for( const a in atks ) {
        const nA = parseInt(a);
        const pA = atks[a];
        for( const d in num_damage ) {
            _inc(result, parseInt(d)*nA, num_damage[d]*pA);
        }
    }
    let sum = 0;
    let wsum = 0;
    for( const r in result ) {
        sum += result[r];
        wsum += parseInt(r)*result[r];
    }

    return result;
}

export function calcDamage(model, count, weapon, range, defender) {

    const attacker = calculateAttacker(model, weapon, range);
    const p = chanceToDamage(attacker, defender);
    const a = rollAttacks(attacker, count, p[1]);
    const d = rollDamage(attacker, defender, a);

    return {
        attacker: attacker.name,
        defender: defender.name,
        attacks: a,
        damage: d};
}

export function calcDamageForRanges(model, count, weapon, ranges, defendingModel) {
    const defender = calculateDefender(defendingModel);

    let result = {}
    for( const r of ranges ) {
        result[r] = calcDamage(model, count, weapon, r, defender);
    }
    return result;
}

export function calcUnitDamage(unit, ranges, defendingModel) {
    let result = {}

    const defender = calculateDefender(defendingModel);

    for( const model of unit.models) {

        const attacking_model = model.model;
        const count = model.count;

        let melee_weapons = [];
        let range_weapons = [];
        for( const weapon of model.weapons ) {
            if ( weapon.T == 'M' || weapon.T.startsWith('P') ) {
                melee_weapons.push(weapon);
            }
            if ( weapon.T != 'M' ) {
                range_weapons.push(weapon);
            }
        }
        if ( range_weapons.length > 1 ){
            range_weapons = range_weapons.filter( w => !w.T.startsWith('P'));
        }
        if ( melee_weapons.length == 0 ){
            melee_weapons.push(generic_combat_weapon);
        }

        for( const r of ranges ) {
            if ( !( r in result ) ) {
                result[r] = { attacker: unit.name, defender:defendingModel.name };
            }

            for( const weapon of (r=='M'? melee_weapons: range_weapons)) {
            // for( const weapon of (model.weapons)) {

                let new_result = calcDamage(attacking_model, count, weapon, r, defender);
                // result[r].attacks = combineMult(new_result.attacks, result[r].attacks);
                result[r].damage = combineMult(new_result.damage, result[r].damage);
            }
        }
    }
    return result;
}


export function statParam (data) {
    const keys = Object.keys(data).sort( (e1, e2) => parseInt(e1) - parseInt(e2));
    const values = [0.35,0.5,0.65];
    let result = { '0':parseInt(keys[0]) };
    let value = data[keys[0]];
    let vi = 0;
    let wsum = 0;

    while( values[vi] < value ) {
        result[values[vi]] = 0;
        vi++;
    }

    for( let i=1; vi<values.length && i<keys.length; i++) {
        const k = parseInt(keys[i]);
        const v = data[k];
        wsum += k*v;
        while ( value+v > values[vi] ) {
            const interpol = (values[vi] - value)/v;
            const r = k - parseInt(keys[i-1]);
            result[values[vi]] = parseInt(keys[i-1]) + r*interpol;
            vi++;
        }
        value += v;
    }
    result['1'] = parseInt(keys[keys.length-1]);
    return result;
}
