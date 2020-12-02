import React, { Component } from "react";
import { Input, Modal, message, Row, Col, Button } from "antd";
import global from "@/global";
import "@/css/Demo3.less";
import "@/css/sc.less";
import Player from "@/components/whoIsUnder/Player";
import chatFrame1 from "@/img/others/chat_frame_1.png";
import chatFrame2 from "@/img/others/chat_frame_2.png";
import chatFrame3 from "@/img/others/chat_frame_3.png";

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

  // 用户数据
  players = [
    {
      name: "带资本家丁丁", // 用户名
      img: 1, // 头像(0到9 0是空座位头像)
      status: null, // 身份（0死亡1平民2内鬼）
      seat: 0, // 座位号（0-8）
      word: "", // 关键词
      vote: 0, // 投票
      votes: 8, // 被投票数
      speak: "最多十个字", // 本轮发言
    },
  ];

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
      this.ws.onopen = () => {
        console.log("建立 websocket 连接...");
        // self.userSetAll();
      };
      this.ws.onmessage = (event) => {
        // 服务端发送的消息
        // console.log(event);
        const datat = JSON.parse(event.data);
        // console.log(datat);
        const { op, data, user } = datat;
        let text;
        switch (op) {
          case "msg0": // 系统消息
            text = self.state.text;
            text.unshift(data);
            self.setState({
              text,
            });
            break;
          case "msg1": // 玩家发言
            text = self.state.text;
            text.unshift(`${user} : ${data}`);
            self.setState({
              text,
            });
            break;
          case "game": // 接收所有数据
            this.players = JSON.parse(data);
            console.log(this.players);
            // console.log(this.players);
            break;
          case "game1": // 接收座位信息数据
            break;
          //   case "out1":
          //     // 用户退出
          //     if (self.state.seat1.username === data) {
          //       self.setState({
          //         seat1: {
          //           username: "",
          //           status: 0,
          //         },
          //       });
          //     } else if (self.state.seat2.username === data) {
          //       self.setState({
          //         seat2: {
          //           username: "",
          //           status: 0,
          //         },
          //       });
          //     }
          //     console.log("delete", data);
          //     break;
          default:
            console.log("op错误,没有识别");
          // message.success(data);
          // text = self.state.text;
          // text.unshift(data);
          // self.setState({
          //   text,
          // });
        }
      };
      this.ws.onclose = () => {
        console.log(`用户[${username}] 已经离开房间!`);
        console.log("关闭 websocket 连接...");
      };
    }
  };

  /**
   * 向服务端发送聊天消息
   */
  userSend = () => {
    this.setState({
      msg: "",
    });
    if (this.ws) {
      if (this.state.msg !== "") {
        const json = { op: "msg1", data: this.state.msg };
        this.ws.send(JSON.stringify(json));
      }
    }
  };

  /**
   * 选择座位坐下
   */
  userSet = (num) => {
    if (this.ws) {
      console.log(this.players[num].name);
      if (this.players[num].name === "空座位") {
        const json = { op: "game1", data: num };
        this.ws.send(JSON.stringify(json));
      } else {
        console.log("在？KK信息"); // 弹出对应位置上的玩家信息
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
    return (
      <div className="who_is_under">
        <Row>
          <Col span={1} />
          <Col span={9} style={{ height: window.innerHeight }}>
            {/*  聊天框上部分 */}
            <Row>
              <Col span={12} style={{ height: 150 }}>
                <Row style={{ height: 75 }}>
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
                <Row style={{ height: 75 }}>
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
                  height: 150,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    height: "100%",
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
                width: "100%",
                height: 600,
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${chatFrame1})`,
                backgroundSize: "100% 650px",
                // backgroundSize: "contain",
              }}
            >
              <div
                style={{
                  margin: "25% 10% 5% 10%",
                  display: "inline-block",
                  overflowY: "scroll",
                  width: "80%", // 6 * boxLen,
                  height: "70%", // 16 * boxLen,
                  color: "#fff",
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
            </div>
            <div
              style={{
                marginLeft: 20,
                width: (640 / 150) * 80,
                height: 80,
                verticalAlign: "top",
                display: "inline-block",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${chatFrame2})`,
                backgroundSize: "contain",
                padding: "5% 5% 4% 5%",
              }}
            >
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
                  width: "100%",
                  height: "100%",
                  verticalAlign: "top",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderColor: "transparent",
                  outline: "hidden",
                  color: "#fff",
                }}
              />
            </div>
            <div
              style={{
                marginLeft: 20,
                width: (265 / 155) * 80,
                height: 80,
                display: "inline-block",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${chatFrame3})`,
                backgroundSize: "contain",
                // padding: "5% 5% 4% 5%",
              }}
            >
              {/* 发言按钮 */}
              <Button onClick={this.userSend}>发言</Button>
              <Button onClick={this.userSend}>发送词语描述</Button>
            </div>
          </Col>
          {/* 座位 */}
          <Col
            span={14}
            style={{ height: window.innerHeight, padding: "0 5% 20px 5%" }}
          >
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col
                span={8}
                onClick={() => {
                  this.userSet(0);
                }}
              >
                <Player {...this.players[0]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(1);
                }}
              >
                <Player {...this.players[1]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(2);
                }}
              >
                <Player {...this.players[2]} />
              </Col>
            </Row>
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col
                span={8}
                onClick={() => {
                  this.userSet(3);
                }}
              >
                <Player {...this.players[3]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(4);
                }}
              >
                <Player {...this.players[4]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(5);
                }}
              >
                <Player {...this.players[5]} />
              </Col>
            </Row>
            <Row
              style={{ height: window.innerHeight / 3, padding: "0 0 25px 0" }}
            >
              <Col
                span={8}
                onClick={() => {
                  this.userSet(6);
                }}
              >
                <Player {...this.players[6]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(7);
                }}
              >
                <Player {...this.players[7]} />
              </Col>
              <Col
                span={8}
                onClick={() => {
                  this.userSet(8);
                }}
              >
                <Player {...this.players[8]} />
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
