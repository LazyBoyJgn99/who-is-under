import React, { Component } from "react";
import { Input, Modal, message, Row, Col, Button } from "antd";
import global from "@/global";

export default class Player extends Component {
  state = {};

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
