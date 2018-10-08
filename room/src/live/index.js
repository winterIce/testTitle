import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import RankFans from './containers/RankFans';
import LiveHeader from './containers/LiveHeader';
import LiveAreaTopContainer from './containers/LiveAreaTopContainer';
import LiveAreaBottomContainer from './containers/LiveAreaBottomContainer';
import GuestList from './containers/GuestList';
import GuestVote from './containers/GuestVote';
import GuestGift from './containers/GuestGift';
import PkBloodBar from './containers/PkBloodBar';
import PkGuestRankGroup from './containers/PkGuestRankGroup';
import AwardWidget from './containers/AwardWidget';


import configureStore from './store';
import initialStore from './store/initial';
import { exportStore, RoomService, ServiceHost, liveInitData, $ } from '../utils/pipeline';

const store = configureStore(initialStore);

exportStore(store);

const render = (Compt, selector) => {
  ReactDOM.render(
    <Provider store={store}>
      <Compt />
    </Provider>,
    document.querySelector(selector)
  );
};


render(RankFans, '#rFansTopList');

render(LiveHeader, '.live-roominfo');

render(LiveAreaTopContainer, '#areaComptLeftTop');

render(LiveAreaBottomContainer, '#areaComptRightBottom');

render(GuestList, '#guestListComp');

render(GuestVote, '#guestVoteComp');

render(GuestGift, '#guestGiftComp');

render(PkBloodBar, '#pkBloodBar');

render(PkGuestRankGroup, '#pkGuestRankGroupWrap');

render(AwardWidget, '#awardWidget');


let pkGroupTimer;
if (liveInitData.kugouLive.roomSwitchs.showPkRankAndPendant == 0) { // pk榜单开关为打开
  fetchPkGroupList(); // 首次请求
}

function runPkGroupTimer(switchTime) {
    clearTimeout(pkGroupTimer);
    pkGroupTimer = setTimeout(() => {
      fetchPkGroupList();
      runPkGroupTimer(switchTime);
    }, switchTime);
  };
// pk分组请求
function fetchPkGroupList() {
  const defaultTime = 10 * 1000; // 默认定时10秒
  const url = `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/votes`;
  $.ajax({
    url,
    dataType: 'jsonp',
    data: {
      appid: 1010,
      _p: 7
    },
    jsonp: 'jsoncallback',
    jsonpCallback: `jsonpcallback_${url.replace(/[^\w]/g, '')}`,
    cache: true,
    success: json => {
      let switchTime = defaultTime;
      if (json.ret == 0 && json.data) {
        if (json.data.interval > 0) {
          switchTime = json.data.interval; // 更新定时时间
        }
        RoomService.trigger(RoomService.eventType.KLIVE_PK_GROUP_LIST, json.data);
      }
      runPkGroupTimer(switchTime);
    },
    error: () => {
      runPkGroupTimer(defaultTime);
    }
  });
}
