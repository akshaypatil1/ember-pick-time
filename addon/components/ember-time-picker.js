import Component from '@ember/component';
import { observer } from '@ember/object';
import layout from '../templates/components/ember-time-picker';

export default Component.extend({
  layout,
  init() {
      this._super(...arguments);
      this.set('options', []);
      if(!this.get('interval')){
          this.set('interval', 15)
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
      for(let i = 0; i < 1440; i += this.get('interval')){
          hours = Math.floor(i / 60);
          minutes = i % 60;
          if (minutes < 10){
              minutes = '0' + minutes; // adding leading zero
          }
          ampm = hours % 24 < 12 ? 'AM' : 'PM';
          hours = hours % 12;
          if (hours === 0){
              hours = 12;
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