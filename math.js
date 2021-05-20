import {none} from './const.js';
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

function toD(desc) {
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
            atks = combineAdd(atks, _d(sides) );
        }
        return atks;
    } else {
        return parseInt(desc);
    }
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
    for( const i in r ) {
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
function addOnThresh(thresh, r, r_to_add) {
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

function shift(result, amount, min) {
    min = min || -Infinity
    let new_result = {};
    for( const k in result) {
        let fk = Math.max(parseFloat(k)+amount, min);
        _inc(new_result,fk, result[k]);
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


function computeValue(val, mod) {
    if ( typeof(mod) === 'number' ) {
        return mod;
    }
    if ( mod == 'U' ) {
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
        return parseInt(mod);
    }
}

function calculateAttacker( unit, weapon, range) {
    let name = unit.name+':'+weapon.name;
    let attacker = {name:name};
    let atks = 0;
    let ws = 0;
    if ( range!= 'M' ) {
        range = parseInt(range);
    }
    if ( weapon.T == 'M' ) {
        if ( range == 'M' ) {
            ws = unit.Ws;
            if ( weapon.mods && weapon.mods.Ws ) {
                ws = computeValue(ws, weapon.mods.Ws);
            }
            atks = unit.A;
            if ( weapon.mods && weapon.mods.A ) {
                atks = computeValue(atks, weapon.mods.A);
            }
        } else {
            return { name:name, Ws: none, S: 0, Ap: 0, A:0, D: 0 };
        }
    } else {
        if ( range == 'M' && !weapon.T.startsWith('P') ) {
            return { name:name, Ws: unit.Ws, S: unit.S, Ap: 0, A:unit.A, D: 1 };
        } else if ( range == 'M' || weapon.R >= range ) {
            atks = toD(weapon.T.slice(1));
            if ( weapon.T.startsWith('R') && (2*weapon.R) >= range ) {
                atks *= 2;
            }
            ws = unit.Bs;
            if ( weapon.mods && weapon.mods.Bs ) {
                ws = computeValue(ws, weapon.mods.Bs);
            }
        } else {
            return { name:name, Ws: none, S: 0, Ap: 0, A:0, D: 0 };
        }
    }
    attacker.Ws = ws;
    attacker.S = computeValue(unit.S, weapon.S);
    attacker.Ap = weapon.Ap;
    attacker.A = atks
    attacker.D = weapon.D;
    attacker.R = range;
    if ( unit.mods || weapon.mods ) {
        attacker.mods = Object.assign({}, unit.mods, weapon.mods);
    }
    if ( unit.rerolls || weapon.rerolls ) {
        attacker.rerolls = Object.assign({}, unit.rerolls, weapon.rerolls);
    }
    return attacker;
}

function calculateDefender(unit) {
    let defender = {
        name: unit.name+':deff',
        T: unit.T,
        Sv: unit.Sv,
    };
    if ( unit.Inv ) {
        defender.Inv = unit.Inv;
    }
    if ( unit.mods ) {
        defender.mods = Object.assign({}, unit.mods);
    }
    if ( unit.rerolls ) {
        defender.rerolls = Object.assign({}, unit.rerolls);
    }
    return defender;
}

function chanceToDamage(attacker, defender) {
    let ws = attacker.Ws;
    if ( attacker.mods && attacker.mods.ws ) {
        ws = computeValue(ws, attacker.mod.ws);
    }
    let d = d6;
    if ( attacker.rerolls ) {
        if ( attacker.rerolls.hits == 'rr 1' ) {
            d = addOn([1], d, d6);
        } else if ( attacker.rerolls.hits == 'rr fail' ) {
            d = addOnThresh(ws, d, d6);
        }
    }
    let hits = undefined;
    if ( attacker.mods ) {
        if ( attacker.mods.hits == 'always' ) {
            hits = {0:0, 1:1};
        } else if ( attacker.mods.hit  == '-1' ) {
            d = shift(d, -1);
        } else if ( attacker.mods.hit  == '+1' ) {
            d = shift(d, 1);
        }
    }
    hits = hits || P(threshUp(ws, d));

    let woundThresh = 1;
    if ( attacker.S >= (2*defender.T) ) {
        woundThresh = 2;
    } else if ( attacker.S > defender.T )  {
        woundThresh = 3;
    } else if ( attacker.S == defender.T )  {
        woundThresh = 4;
    } else if ( attacker.S < defender.T && (2*attacker.S) >= defender.T )  {
        woundThresh = 5;
    } else {
        woundThresh = 6;
    }
    d = d6;
    if ( attacker.rerolls ) {
        if ( attacker.rerolls.W == 'rr 1' ) {
            d = addOn([1], d, d6);
        } else if ( attacker.rerolls.W == 'rr fail' ) {
            d = addOnThresh(woundThresh, d, d6);
        }
    }
    //TODO unmodified wound effects
    let wounds = undefined;
    if ( attacker.mods ) {
        if ( attacker.mods.wounds == 'always' ) {
            wounds = {0:0, 1:1};
        } else if ( attacker.mods.wounds  == '-1' ) {
            d = shift(d, -1);
        } else if ( attacker.mods.wounds  == '+1' ) {
            d = shift(d, 1);
        }
    }
    wounds = wounds || P(threshUp(woundThresh, d));

    //TODO save re-rolls
    //TODO save modifiers
    let saveThresh = defender.Sv - attacker.Ap;
    if ( defender.Inv ) {
        saveThresh = Math.min(saveThresh, defender.Inv);
    }
    let saves = P(threshUp(saveThresh, d6));

    let applyDamage = {}
    applyDamage[1] = hits[1]*wounds[1]*saves[0];
    applyDamage[0] = hits[0] + hits[1]*wounds[0] + hits[1]*wounds[1]*saves[1];

    return applyDamage;
};

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

function attacks(attacker, num_attackers, p) {
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

function damage(attacker, defender, atks) {

    let d = asD(toD( attacker.D));
    if ( defender.mods && defender.mods.D == '-1' ){
        d = shift(d,-1,1);
    }

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

export function calcDamage(attackUnit, num_attackers, weapon, ranges, defenderUnit) {
    let result = {}
    for( const i in ranges ) {
        let r = ranges[i];
        const attacker = calculateAttacker(attackUnit, weapon, r);
        const defender = calculateDefender(defenderUnit);
        const p = chanceToDamage(attacker, defender);
        const a = attacks(attacker, num_attackers, p[1]);
        const d = damage(attacker, defender, a);
        result[r] = {
            attacker: attacker,
            defender: defender,
            hitProbablility: p,
            attacks: a,
            damage: d};
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


