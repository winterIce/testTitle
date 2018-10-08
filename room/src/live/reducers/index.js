import { combineReducers } from 'redux';
import fans from '../containers/RankFans/reduces';
import liveHeader from '../containers/LiveHeader/reduces';
import LiveAreaTopContainer from '../containers/LiveAreaTopContainer/reduces';
import LiveAreaBottomContainer from '../containers/LiveAreaBottomContainer/reduces';
import guestList from '../containers/GuestList/reduces';
import guestVote from '../containers/GuestVote/reduces';
import guestGift from '../containers/GuestGift/reduces';
import pkBloodBar from '../containers/PkBloodBar/reduces';
import pkGuestRankGroup from '../containers/PkGuestRankGroup/reduces';
import awardWidget from '../containers/AwardWidget/reduces';

export default combineReducers(Object.assign({
  fans, liveHeader, guestList, guestVote, guestGift, pkBloodBar, pkGuestRankGroup, awardWidget
}, LiveAreaTopContainer, LiveAreaBottomContainer));
