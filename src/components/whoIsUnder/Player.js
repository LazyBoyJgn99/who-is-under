import React, { Component } from "react";
import img0 from "@/img/img0.jpg";
import img1 from "@/img/img1.jpg";
import img2 from "@/img/img2.jpg";
import img3 from "@/img/img3.jpg";
import img4 from "@/img/img4.jpg";
import img5 from "@/img/img5.jpg";
import img6 from "@/img/img6.jpg";
import img7 from "@/img/img7.jpg";
import img8 from "@/img/img8.jpg";
import img9 from "@/img/img9.jpg";

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
    const { name, img, speak } = this.props;
    const imgs = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
    const speakDiv = (
      <div style={{ height: 40, width: 220 }}>
        <span>{speak}</span>
      </div>
    );
    return (
      <div className="who_is_under_player">
        {speak !== "" ? speakDiv : <div style={{ height: 40, width: 220 }} />}
        <br />
        <img src={imgs[img]} style={{ height: 120, width: 120 }} alt="" />
        <br />
        <span>{name}</span>
      </div>
    );
  }
}
