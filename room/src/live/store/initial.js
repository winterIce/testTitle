import liveHeader from '../containers/LiveHeader/initStore';
import LiveAreaTopContainer from '../containers/LiveAreaTopContainer/initStore';
import fans from '../containers/RankFans/initStore';
// GuestList 嘉宾榜组件
import guestList from '../containers/GuestList/initStore';
// GuestVote 嘉宾投票组件
import guestVote from '../containers/GuestVote/initStore';
// GuestGift 嘉宾礼物信息
import guestGift from '../containers/GuestGift/initStore';
import LiveAreaBottomContainer from '../containers/LiveAreaBottomContainer/initStore';
import pkBloodBar from '../containers/PkBloodBar/initStore';
import pkGuestRankGroup from '../containers/PkGuestRankGroup/initStore';
import awardWidget from '../containers/AwardWidget/initStore';


const initialState = Object.assign({
  fans,
  liveHeader,
  guestList,
  guestVote,
  guestGift,
  pkBloodBar,
  pkGuestRankGroup,
  awardWidget
}, LiveAreaTopContainer, LiveAreaBottomContainer);

export default initialState;
