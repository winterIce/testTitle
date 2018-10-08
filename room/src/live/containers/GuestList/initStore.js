export default {
  status: 'prepending', // 组件状态
  data: [], // 嘉宾列表 [{kugouId: 1, fans: [], ...}, {}, ...]
  followList: [], // 关注嘉宾kugouId列表
  msg: {}, // 提示信息 {kugouId: '消息内容'}
  voteKugouId: 0 // 当前投票嘉宾kugouId
};
