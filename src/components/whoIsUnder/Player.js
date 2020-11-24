import React, { Component } from "react";
import playerNull from "@/img/player/player_null.png";
import player1 from "@/img/player/player_1.png";
import player2 from "@/img/player/player_2.png";
import player3 from "@/img/player/player_3.png";
import player4 from "@/img/player/player_4.png";
import player5 from "@/img/player/player_5.png";
import player6 from "@/img/player/player_6.png";
import player7 from "@/img/player/player_7.png";
import player8 from "@/img/player/player_8.png";
import player9 from "@/img/player/player_9.png";
import playerDie from "@/img/player/player_die.png";
import dialog from "@/img/others/dialog.png";

export default class Player extends Component {
  state = {};

  static defaultProps = {
    name: "空座位", // 用户名
    img: 0, // 头像(0到9 0是空座位头像)
    status: null, // 身份（0死亡1平民2内鬼）
    set: null, // 座位号
    word: "", // 关键词
    vote: null, // 投票
    votes: null, // 被投票数
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
    const { name, img, status, set, word, vote, votes, speak } = this.props;
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
    const speakDiv = (
      <div
        style={{
          backgroundImage: `url(${dialog})`,
          height: 50,
          width: 225,
          paddingTop: 8,
          backgroundSize: "cover",
          color: "#FFF",
        }}
      >
        {speak}
      </div>
    );
    return (
      <div className="who_is_under_player">
        {speak !== "" ? speakDiv : <div style={{ height: 50, width: 225 }} />}
        <br />
        <img
          src={status === 0 ? playerDie : imgs[img]}
          style={{ height: 120, width: 120 }}
          alt=""
        />
        <br />
        <span style={{ fontSize: 18 }}>{name}</span>
      </div>
    );
  }
}
