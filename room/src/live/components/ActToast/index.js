import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { FX } from '../../../utils/pipeline';

const SINGLE_LINE_MAX_WORD = 26;

/**
 * 列表
 *
 * @class ArtToast
 * @extends {Component}
 */
class ActToast extends PureComponent {

  render() {
    const { content, onCloseClick } = this.props;

    return (
      <section className={['actToastContainer', content && content.length > SINGLE_LINE_MAX_WORD ? '' : ' actToastSingleLine' ].join('')}>
        <button type="button" className="actClose" onClick={onCloseClick} />
        <div className="actToastContent">{content}</div>
      </section>
    );
  }
}


export default ActToast;
