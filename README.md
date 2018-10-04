# ember-time-picker

This is an Ember addon that uses the wonderful [ember-power-select](https://github.com/cibernox/ember-power-select) component for allowing the user to select a time [am / pm] from a picklist.

## Installation

Ember Time Picker has the same requirements as ember-power-select.
This is an ember-cli addon so this will install the addon:
```
ember install ember-time-picker
```
## Example #1

Following is basic example with selected and disabled proporty.

```handlebars
    {{ember-time-picker
        selected = selectedTime
        disabled=false
    }}
```

## Example #2

Following is extended example with two timepickers. This is to handle "From Time" and "To time".

```handlebars
    From Time
    {{ember-time-picker
        selected = fromTime
        disabled=false
    }}
    To Time
    {{ember-time-picker
        selected = toTime
        startTime = fromTime
        disabled=false
    }}
```

## Attributes

| attribute | Type | Description |
| --- | --- | --- |
| selected | Required | The selected option |
| startTime | optional | This will the time from which user want to display time-list |
| disabled | `boolean` | Default it's `false`. When truthy the component cannot be interacted |