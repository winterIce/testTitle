import { $, vServiceUrl } from '../utils/pipeline';

const ajaxQueue = {};
const ajaxState = {};
const ajaxStateENUM = {
  LOADING: 'LOADING'
};
const ajaxActionENUM = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const buildActionQueue = (key, type) => (...args) => {
  if (ajaxQueue[key]) {
    ajaxQueue[key].forEach((item, i) => {
      item[type].apply(null, args);
    });
  }

  delete ajaxState[key];
  delete ajaxQueue[key];
};

const ajax = (options => {
  const { url, data } = options;
  const ajaxKey = `${url}${$.param(data)}`;
  const currentState = ajaxState[ajaxKey];

  if (currentState === ajaxStateENUM.LOADING) {
    ajaxQueue[ajaxKey].push(options);
  } else if (!currentState) {
    ajaxState[ajaxKey] = ajaxStateENUM.LOADING;
    ajaxQueue[ajaxKey] = [options];
    const ajaxOptions = $.extend({}, options, {
      success: buildActionQueue(ajaxKey, ajaxActionENUM.SUCCESS),
      error: buildActionQueue(ajaxKey, ajaxActionENUM.ERROR)
    });

    $.ajax(ajaxOptions);
  }
});

export default store => next => action => {
  const JSONP_OPT = action.JSONP;
  if (!JSONP_OPT) {
    return next(action);
  }

  const { type, params } = JSONP_OPT;
  const { url, success, error, timeout = 0, cache = true, jsonp = 'jsonpcallback', data = {} } = params;
  let { jsonpCallback } = params;

  // 触发正在请求的 Action
  const result = next({ type: `${type}_PENDING` });

  // vServices特殊处理，待https上线后移除
  if (url.startsWith(vServiceUrl)) {
    jsonpCallback = `jsonpcallback_${url.replace(/[^\w]/g, '')}`;
  }

  ajax({
    url,
    data,
    dataType: 'jsonp',
    timeout,
    cache,
    jsonp,
    jsonpCallback,
    success: ret => {
      if (typeof success === 'function') {
        success(ret);
      }
      // 触发请求成功的 Action
      return next({ type: `${type}_SUCCESS`, payload: ret, params });
    },
    error: ret => {
      if (typeof error === 'function') {
        error(ret);
      }
      // 触发请求失败的 Action
      return next({ type: `${type}_ERROR`, payload: ret, params });
    }
  });

  return result;
};
