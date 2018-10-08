/*
 * es7 指令合并，用于react组件
 * 例： @mixins(a, b, c)
 */

function _extend(target, copyObject) {

  if (arguments.length === 2) {
    for (let key in copyObject) {
      let newValue = copyObject[key];
      let newValueType = (typeof newValue);

      if (newValueType !== 'undefined') {
        switch(newValueType) {
          case 'object':
            if (target.hasOwnProperty(key)){
              newValue = _extend(target[key], newValue);
            }
            break;

          case 'function':
            newValue = ((inOldFn, inNewFn) => (...args) => {
              if(typeof inOldValue === 'function') {
                inOldFn.apply(target, args);
              }

              inNewFn.apply(target, args);
            })(target[key], newValue);
            break;

          case 'array':
            newValue = [].concat(target[key], newValue);
            break;
        }
      }

      target[key] = newValue;
    }
  } else if (arguments.length > 2) {
    for (let i=1, l=arguments.length, item; i<l; i++) {
      item = arguments[i];
      _extend(target, item);
    }
  }

  console.log(123, target)
  return target;
}

export default _extend;
