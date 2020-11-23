import React, { Component } from "react";
import img0 from "@/img/img0.jpg";
import img1 from "@/img/1";
import img2 from "@/img/2";
import img3 from "@/img/3";
import img4 from "@/img/4";
import img5 from "@/img/5";
import img6 from "@/img/6";
import img7 from "@/img/7";
import img8 from "@/img/8";
import img9 from "@/img/9";

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
    const { name } = this.props;
    const { img } = this.props;
    const imgs = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
    return (
      <div className="who_is_under_player">
        {/* <img src={imgs[img]} style={{ height: 80, width: 80 }} alt="" /> */}
        <br />
        <img src={imgs[img]} style={{ height: 80, width: 80 }} alt="" />
        <br />
        <span>{name}</span>
      </div>
    );
  }
}
