import Component from '@ember/component';
import { observer } from '@ember/object';
import { warn } from '@ember/debug';
import layout from '../templates/components/ember-pick-time';

const _0 = 0,
    _1 = 1,
    _5 = 5,
    _30 = 30,
    _10 = 10,
    _1440 = 1440,
    _60 = 60,
    _12 = 12,
    _15 = 15,
    _24 = 24;

export default Component.extend({
    layout,
    init() {
        this._super(...arguments);
        if (typeof this.get('selected') === 'undefined'){
            warn('"selected" must be passed into the ember-pick-time component',false,{id:'ember-pick-time'});
            return null;
        }
        this.set('options', []);
        this.set('startTimeMinutes',null);
        if(!this.get('interval')){
            this.set('interval', _15)
        }
        if(![_5,_15,_30,_60].includes(this.get('interval'))){
            warn(`${this.get('interval')} is not expected input for interval.`,false,{id:'ember-pick-time'});
                return null;
        }
        this.set('isVisible', true);
        if(this.get('startTime')){
            let pattern = /(^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
            if(!pattern.test(this.get('startTime')) || this.get('startTime').trim().indexOf(' ') === -_1){
                warn(`${this.get('startTime')} is not in correct format.`,false,{id:'ember-pick-time'});
                return null;
            }
            this.timeToMinutes(this.get('startTime').trim());
            this.set('isVisible', false);
        }
        this.populateOptions();
    },
    startTimeObserver: observer('startTime', function() {
        this.timeToMinutes(this.get('startTime').trim());
        this.set('isVisible', false);
        this.populateOptions();
    }),
    timeToMinutes(time){
        let hmap = time.split(':');
        let hr = hmap[_0];
        let ampm = hmap[_1].split(' ');
        let minutes = parseInt(ampm[_0]);
        if(ampm[_1] === 'PM' || ampm[_1] === 'pm'){
            minutes = ((parseInt(hr) + _12)*_60)+minutes;
        }else{
            if(parseInt(hr) !== _12){
                minutes = (parseInt(hr)*_60)+minutes;
            }
        }
        this.set('startTimeMinutes',minutes);
    },
    populateOptions() {
        let hours, minutes, ampm;
        let options = [];
        for(let i = _0; i < _1440; i += this.get('interval')){
            hours = Math.floor(i / _60);
            minutes = i % _60;
            if (minutes < _10){
                minutes = '0' + minutes; // adding leading zero
            }
            ampm = hours % _24 < _12 ? 'AM' : 'PM';
            hours = hours % _12;
            if (hours === _0){
                hours = _12;
            }
            if(this.get('startTime') && !this.get('isVisible')){
                if(this.get('startTimeMinutes') <= i){
                    if(this.get('startTimeMinutes') < i){
                        options.push(`${hours}:${minutes} ${ampm}`);
                    }
                    this.set('isVisible', true);
                }
            }else{
                options.push(`${hours}:${minutes} ${ampm}`);
            }
        }
        if(this.get('selected') && !options.includes(this.get('selected'))){
            this.set('selected', '');
        }
        this.set('options', options);
    }
});