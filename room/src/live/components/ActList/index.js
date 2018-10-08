import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { FX } from '../../../utils/pipeline';

/**
 * 歌单列表
 *
 * @class ArtList
 * @extends {Component}
 */
class ArtList extends PureComponent {


  componentDidMount() {
    FX.preventScrollBubble(this.refs.actList);
  }

  onItemClick(itemId){
    const { onItemClick } = this.props;

    if(typeof onItemClick === 'function'){
      onItemClick(itemId);
    }
  }

  render() {
    const { title, dataSource, onCloseClick } = this.props;
    const { list, state } = dataSource;
    const defaultLogo = 'https://s4fx.kgimg.com/fxusercmdavata/system.gif';

    return (
      <section className="actListContainer">
        <h3 className="actTitle">{title}</h3>
        <button type="button" className="actClose" onClick={onCloseClick} />
        <ul className="actList auto" ref="actList">
          {
            state === 'loading' ? <li className="acLoading">请稍候，正在加载...</li> :
            state === 'loaded' ? (list.length === 0 ? <li className="acLoading">当前还没有歌单哦，稍候再来看看吧。</li> :
            list.map( (item, i) => (
              <li className={['actItem', item.status === -1 ? ' actSecretItem': ''].join('')} key={item.id}>
                <span className="actNo">{i+1}</span>
                <div className="actNameList">
                  <img className="actImg" src={item.userLogo||defaultLogo} alt={item.nickName} onError={ () => item.userLogo = defaultLogo } />
                  <p className="actSong" title={item.songName}>{item.songName}</p>
                  <p className="actSinger" title={item.nickName}>{item.nickName}</p>
                </div>

                {item.status > 0 ?
                <div className="actUp">
                  <span className="actUpCount" title={item.likes}>{item.likes}</span>
                  {item.isLike ?
                    <button type="button" className="actUpButton actUpSelected"/> :
                    <button type="button" className="actUpButton" onClick={this.onItemClick.bind(this, item.id)} />
                  }

                </div>:
                null}
              </li>
            ))) :
            null
          }
        </ul>
      </section>
    );
  }
}


export default ArtList;
