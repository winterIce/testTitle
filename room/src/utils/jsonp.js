import merge from 'lodash.merge';

export default function jsonp(type, params) {
  return merge({}, {
    JSONP: {
      params: {
        data: {
          appid: 1010,
          _p: 7
        }
      }
    }
  }, {
    type,
    JSONP: {
      type,
      params
    }
  });
}
