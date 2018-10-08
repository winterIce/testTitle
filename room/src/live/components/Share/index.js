import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QrCode from 'qrcode.react';

import './index.less';

// 创建分享方法
function createShare(roomId, title, content, img) {
  const url = encodeURIComponent(`${location.protocol}//${location.host}/live/${roomId}`);
  const shareTitle = encodeURIComponent(title);
  const shareContent = encodeURIComponent(content);
  let shareImg = img;

  if (typeof img === 'string' && img !== '') {
    shareImg = encodeURIComponent(img);
  }

  const qq = `http://connect.qq.com/widget/shareqq/index.html?title=${shareTitle}&url=${url}&desc=${shareContent}&pics=${shareImg}`;
  const qzone = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${shareTitle}&url=${url}&desc=${shareContent}&pics=${shareImg}`;
  const weibo = `http://service.t.sina.com.cn/share/share.php?title=${shareTitle}&url=${url}&pic=${shareImg}`;

  return { qq, qzone, weibo };
}
/**
 * 分享组件
 *
 * @class ShareApp
 * @extends {Component}
 */
class ShareApp extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    roomId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showWechatQr: false
    };
  }

  toogleQrContainer(visible) {
    this.setState({
      showWechatQr: visible
    });
  }

  render() {
    const { title, content, image, visible, roomId } = this.props;
    const api = createShare(roomId, title, content, image);
    const visibleClass = (visible ? 'shareVisible' : '');
    const wechatContainerClass = (this.state.showWechatQr ? 'qrVisible' : '');

    return (
      <div className={`shareContent ${visibleClass}`}>
        <a href={api.weibo} className="iconShare shareWeibo" title="分享到微博" target="_blank" />
        <div className="iconShare shareWechat" onMouseEnter={() => this.toogleQrContainer(true)} onMouseLeave={() => this.toogleQrContainer(false)}>
          <div className={`shareQrContainer ${wechatContainerClass}`}>
            <QrCode size={66} value={`http://mfanxing.kugou.com/staticPub/mobile/sharePage/normalRoom/views/index.html?roomId=${roomId}&isKugouLiveRoom=1`} />
          </div>
        </div>
        <a href={api.qq} className="iconShare shareQQ" title="分享给QQ好友" target="_blank" />
        <a href={api.qzone} className="iconShare shareQzone" title="分享到QQ空间" target="_blank" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { showWechatQr, qrCodeImg } = state;
  return {
    showWechatQr,
    qrCodeImg
  };
};

export default connect(mapStateToProps)(ShareApp);

