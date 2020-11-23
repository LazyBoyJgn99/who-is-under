import React, { Component } from "react";
import { Input, Modal, message, Row, Col, Button } from "antd";
import global from "@/global";
import "@/css/Demo3.less";
import "@/css/sc.less";
import Player from "@/components/whoIsUnder/Player";

// 屏幕宽度
// const windowInnerWidth = window.innerWidth;
// 屏幕高度
// const windowInnerHeight = window.innerHeight;
// 屏幕宽度/20
// const boxWidth = windowInnerWidth / 20;
// 屏幕高度/20
// const boxHeight = windowInnerHeight / 20;
// 单位大小
// const boxLen = boxWidth < boxHeight ? boxWidth : boxHeight;

// 禁止下拉
document.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  false
);

export default class WhoIsUnder extends Component {
  ws = null; // websocket

  state = {
    text: [], // 聊天框
    name: "", // 用户名
    username: "", // 输入的username
    password: "", // 输入的password
    visible: false, // 登陆Model是否显示
    msg: "", // 发言Input输入框
  };

  componentDidMount() {
    // 禁止选中
    document.oncontextmenu = function () {
      return false;
    };
    document.onselectstart = function () {
      return false;
    };
    document.onmousewheel = function () {
      return false;
    };
    // 禁止滚动
    document.body.style.cssText = `overflow-x: hidden;overflow-y: hidden;${document.body.style.cssText}`;
  }

  componentWillUnmount() {
    // 组件销毁时你要执行的代码
    this.userExit();
    // 键盘监听结束
    document.removeEventListener("keydown", this.onKeyDown);
  }

  /**
   *显示登陆Model
   */
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 登陆并且隐藏登陆Model
   * @param e
   */
  handleOk = (e) => {
    console.log(e);
    this.login();
    this.setState({
      visible: false,
    });
  };

  /**
   * 隐藏登陆Model
   * @param e
   */
  handleCancel = (e) => {
    console.log("退出", e);
    this.setState({
      visible: false,
    });
  };

  /**
   * 登陆接口
   */
  login = () => {
    const url = `${global.localhostUrl}user/login`;
    fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include", // 跨域携带cookie
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(function (res) {
        // function (res) {} 和 res => {}效果一致
        return res.json();
      })
      .then((json) => {
        // get result
        const data = json;
        console.log(data);
        if (data.status) {
          message.success(data.message);
          this.setState({
            name: data.data.username,
          });
        } else {
          message.error(data.message);
        }
      })
      .catch(function () {
        console.log("fetch fail");
        // alert('系统错误');
      });
  };

  /**
   * Input框，用户名修改函数
   * @param e
   */
  usernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  /**
   * Input框，密码修改函数
   * @param e
   */
  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  /**
   * 进入房间
   * @returns {null}
   */
  // eslint-disable-next-line
  userJoin = () => {
    if (this.ws) {
      console.log("已经建立webSocket连接");
    } else {
      const username = this.state.name;
      if (username === "") {
        alert("请先登陆");
        return null;
      }
      const urlPrefix = `${global.wsHostUrl}who-is-under/`;
      const url = urlPrefix + username;
      const self = this;
      this.ws = new WebSocket(url);
      this.ws.onopen = function () {
        console.log("建立 websocket 连接...");
        self.userSetAll();
      };
      this.ws.onmessage = function (event) {
        // 服务端发送的消息
        console.log(event);
        const info = event.data;
        const type = event.data.substring(0, 4);
        const data = info.slice(4);
        console.log(type);
        let text;
        // 跟据消息的前4个字母决定操作
        switch (type) {
          case "seta":
            // 有新用户加入，发送广播
            break;
          case "msg0":
            // 聊天
            // message.success(data);
            text = self.state.text;
            text.unshift(data);
            self.setState({
              text,
            });
            break;
          case "out1":
            // 用户退出
            if (self.state.seat1.username === data) {
              self.setState({
                seat1: {
                  username: "",
                  status: 0,
                },
              });
            } else if (self.state.seat2.username === data) {
              self.setState({
                seat2: {
                  username: "",
                  status: 0,
                },
              });
            }
            console.log("delete", data);
            break;
          default:
            // message.success(data);
            text = self.state.text;
            text.unshift(data);
            self.setState({
              text,
            });
        }
      };
      this.ws.onclose = function () {
        console.log(`用户[${username}] 已经离开房间!`);
        console.log("关闭 websocket 连接...");
      };
    }
  };

  /**
   * 向服务端发送消息
   */
  userSend = () => {
    this.setState({
      msg: "",
    });
    if (this.ws) {
      if (this.state.msg !== "") {
        this.ws.send(`msg0${this.state.name}:${this.state.msg}`);
      }
    }
  };

  /**
   * 发送广播同步信号
   */
  userSetAll = () => {
    if (this.ws) {
      this.ws.send("seta");
    }
  };

  /**
   * 退出房间
   */
  userExit = () => {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  };

  render() {
    // 用户数据
    const players = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    return (
      <div className="who_is_under">
        <Row>
          <Col span={1} />
          <Col span={9} style={{ height: window.innerHeight }}>
            {/*  聊天框上部分 */}
            <Row>
              <Col span={12} style={{ height: 200 }}>
                <Row style={{ height: 100 }}>
                  <Col
                    span={12}
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    <Button onClick={this.userJoin} size="small">
                      进入房间
                    </Button>
                  </Col>
                  <Col
                    span={12}
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    <Button onClick={this.userExit} size="small">
                      离开房间
                    </Button>
                  </Col>
                </Row>
                <Row style={{ height: 100 }}>
                  <Col
                    span={12}
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    <Button size="small" onClick={this.showModal}>
                      {this.state.name === "" ? "登录" : this.state.name}
                    </Button>
                  </Col>
                  <Col
                    span={12}
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    <Button size="small">占位符4</Button>
                  </Col>
                </Row>
              </Col>
              <Col
                span={12}
                style={{
                  height: 200,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    paddingTop: "10%",
                    height: "90%",
                    width: "100%",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div style={{ fontFamily: "pxt" }}>
                    &emsp;用户名：&emsp;
                    {this.state.name === "" ? "尚未登录" : this.state.name}
                  </div>
                  <div>&emsp;座位：&emsp;&emsp;1</div>
                  <div>&emsp;关键词：&emsp;JGD</div>
                  <div>&emsp;轮数：&emsp;&emsp;1</div>
                </div>
              </Col>
            </Row>
            {/*  聊天框 */}
            <div
              style={{
                // bottom: 50,
                marginTop: 20,
                backgroundColor: "#dddddd",
                overflowY: "scroll",
                width: "100%", // 6 * boxLen,
                height: window.innerHeight - 200 - 100 - 20, // 16 * boxLen,
                // position: "absolute",
              }}
            >
              {this.state.text.map((value, index) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                    }}
                    key={index}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
            {/* 输入框 */}
            <Input
              value={this.state.msg}
              onChange={(e) => {
                this.setState({
                  msg: e.target.value,
                });
              }}
              onPressEnter={this.userSend}
              style={{
                // left:windowInnerWidth-400,
                // height:24,
                width: "60%",
                // top:50,
                // position:"absolute",
              }}
            />
            {/* 发言按钮 */}
            <br />
            <Button onClick={this.userSend}>发言</Button>
            <Button onClick={this.userSend}>发送词语描述</Button>
          </Col>
          {/* 座位 */}
          <Col
            span={14}
            style={{ height: window.innerHeight, padding: "0 5% 20px 5%" }}
          >
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col span={8} className="div_center">
                <Player name={players[0].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[1].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[2].name} />
              </Col>
            </Row>
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col span={8} className="div_center">
                <Player name={players[3].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[4].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[5].name} />
              </Col>
            </Row>
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col span={8} className="div_center">
                <Player name={players[6].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[7].name} />
              </Col>
              <Col span={8} className="div_center">
                <Player name={players[8].name} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Modal
          title="登录"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="登录/注册"
          onCancel={this.handleCancel}
          cancelText="返回"
        >
          <Input
            placeholder="username"
            value={this.state.username}
            onChange={this.usernameChange}
          />
          <br />
          <br />
          <Input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.passwordChange}
          />
        </Modal>
        <br />
      </div>
    );
  }
}
