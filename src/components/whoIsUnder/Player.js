import React, { Component } from "react";
import { Input, Modal, message, Row, Col, Button } from "antd";
import global from "@/global";

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

    return (
      <div className="who_is_under_player">
        <span>{name}</span>
      </div>
    );
  }
}
