import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Lazyload } from '../../../utils/pipeline';

/**
 * 用户头像组件，支持切图
 *
 * @export
 * @class ImgUserLogo
 * @extends {PureComponent}
 */
export default class ImgUserLogo extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    lazyload: PropTypes.bool
  }

  componentDidMount() {
    const lazyload = this.props.lazyload;
    if (lazyload && Lazyload) {
      window.lazyload = window.lazyload || new Lazyload();
      window.lazyload.push();
    }
  }

  render() {
    const { width, height, alt, lazyload } = this.props;
    let resize = this.props.resize;
    let src = this.props.src;
    let suffix = '.jpg';

    if((/\d+x\d+\.([a-zA-Z]+)$/).test(src)) {
      resize = false;
    }

    // 判断是否需要裁剪图片
    if (resize !== false && src.indexOf('/v2/') !== -1) {
      suffix = src.substr(src.lastIndexOf('.'));
      src = `${src}_${width}x${height}${suffix}`;
    }

    const attrs = {
      src,
      alt
    };

    return <img {...attrs} />;
  }
}
