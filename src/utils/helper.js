'use strict';
import _ from 'lodash';

const isEmpty = (val) =>
  _.isNaN(val)
    || _.isNull(val)
    || (_.isBoolean(val) && val === false)
    || (_.isString(val) && val === '')
    || (_.isArray(val) && val.length === 0)
    || (!_.isNumber(val) && !_.isBoolean(val) && _.isEmpty(val) && typeof val !== 'function');

const isNotEmpty = (val) => !isEmpty(val);

const isObject = (val) => !_.isArray(val) && typeof val !== 'function' && _.isObject(val);

const combine = (obj, obj2) =>
  _.mergeWith(_.cloneDeep(obj), obj2, (val, val2, key, obj, obj2, stack) => {
    if (stack === undefined || (isObject(stack) && stack.size === 0)) {
      return val2 === undefined ? val : val2;
    }
  });

export {
  isEmpty, isNotEmpty, isObject, combine
};
