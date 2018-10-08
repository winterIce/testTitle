
export default {
  status: 'prepending',
  stars: null, // pk主播映射表, 主播kugouId => 主播data
  data: null,
  socketData: {},
  followList: {}, // 关注嘉宾kugouId列表
  serverTime: 0,
  msg: {} // 提示信息 { kugouId: '消息内容' }
};
