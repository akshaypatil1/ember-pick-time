import Component from '@ember/component';
import { observer } from '@ember/object';
import { warn } from '@ember/debug';
import layout from '../templates/components/ember-time-picker';

const _0 = 0,
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
        if (!this.get('selected')){
            warn('"selected" must be passed into the ember-time-picker component');
            return null;
        }
        this.set('options', []);
        if(!this.get('interval')){
            this.set('interval', _15)
        }
        this.set('isVisible', true);
        if(this.get('startTime')){
            this.set('isVisible', false);
        }
        this.populate();
    },
    startTimeObserver: observer('startTime', function() {
        this.set('isVisible', false);
        this.populate();
    }),
    populate() {
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
                if(this.get('startTime') === `${hours}:${minutes} ${ampm}`){
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