import React, { Component } from "react";
import "@/css/WhoIsUnderPlayer.less";
import playerNull from "@/img/player/player_0null.png";
import player1 from "@/img/player/player_01.png";
import player2 from "@/img/player/player_02.png";
import player3 from "@/img/player/player_03.png";
import player4 from "@/img/player/player_04.png";
import player5 from "@/img/player/player_05.png";
import player6 from "@/img/player/player_06.png";
import player7 from "@/img/player/player_07.png";
import player8 from "@/img/player/player_08.png";
import player9 from "@/img/player/player_09.png";
import playerDie from "@/img/player/player_0die.png";
import dialog from "@/img/others/dialog.png";
import numbersNull from "@/img/numbers/null.png";
import numbers1 from "@/img/numbers/1.png";
import numbers2 from "@/img/numbers/2.png";
import numbers3 from "@/img/numbers/3.png";
import numbers4 from "@/img/numbers/4.png";
import numbers5 from "@/img/numbers/5.png";
import numbers6 from "@/img/numbers/6.png";
import numbers7 from "@/img/numbers/7.png";
import numbers8 from "@/img/numbers/8.png";
import numbers9 from "@/img/numbers/9.png";
import v1 from "@/img/numbers/v1.png";
import v2 from "@/img/numbers/v2.png";
import v3 from "@/img/numbers/v3.png";
import v4 from "@/img/numbers/v4.png";
import v5 from "@/img/numbers/v5.png";
import v6 from "@/img/numbers/v6.png";
import v7 from "@/img/numbers/v7.png";
import v8 from "@/img/numbers/v8.png";

export default class Player extends Component {
  state = {};

  static defaultProps = {
    name: "空座位", // 用户名
    img: 0, // 头像(0到9 0是空座位头像)
    status: null, // 身份（0死亡1平民2内鬼）
    seat: null, // 座位号（0-8）
    word: "", // 关键词
    vote: 0, // 投票
    votes: 0, // 被投票数
    speak: "", // 本轮发言
  };

  componentDidMount() {}

  /**
   * 组件销毁时你要执行的代码
   */
  componentWillUnmount() {}

  /**
   * 主函数
   */
  render() {
    const { name, img, status, vote, votes, speak } = this.props;
    const imgs = [
      playerNull,
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      player8,
      player9,
    ];
    const numberss = [
      numbersNull,
      numbers1,
      numbers2,
      numbers3,
      numbers4,
      numbers5,
      numbers6,
      numbers7,
      numbers8,
      numbers9,
    ];
    const vs = ["", v1, v2, v3, v4, v5, v6, v7, v8];
    const speakDiv = (
      <div
        style={{
          backgroundImage: `url(${dialog})`,
          height: 50,
          width: 225,
          margin: "0 auto",
          paddingTop: 8,
          backgroundSize: "cover",
          color: "#c0cbdc",
        }}
      >
        {speak}
      </div>
    );
    return (
      <div className="who_is_under_player div_center">
        <br />
        {speak !== "" ? speakDiv : <div style={{ height: 50, width: 225 }} />}
        <div className="who_is_under_player_div" style={{ textAlign: "left" }}>
          <img
            className="img_bg"
            src={status === 0 ? playerDie : imgs[img]}
            alt=""
          />
          <div className="who_is_under_player_name">
            <b>{name}</b>
          </div>
          <img
            src={vote === 0 ? numbersNull : numberss[vote]}
            className="img_vote"
            alt=""
          />
          {votes === 0 ? (
            <div />
          ) : (
            <img src={vs[votes]} className="img_votes" alt="" />
          )}
        </div>
      </div>
    );
  }
}
