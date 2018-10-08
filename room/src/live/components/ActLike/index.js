import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

/**
 * 点赞功能
 *
 * @class ArtToast
 * @extends {Component}
 */
class ActLike extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { content, onClick } = this.props;

    return (
      <button type="button" className="ActLike" dangerouslySetInnerHTML={{__html: content.replace(/[\\n]+/, '<br/>')}} onClick={onClick} />
    );
  }
}


export default ActLike;
