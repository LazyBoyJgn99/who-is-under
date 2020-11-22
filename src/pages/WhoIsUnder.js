import React, { Component } from "react";
import { Input, Modal, message } from "antd";
import global from "@/global";
import "@/css/Demo3.less";

// 屏幕宽度
const windowInnerWidth = window.innerWidth;
// 屏幕高度
const windowInnerHeight = window.innerHeight;
// 屏幕宽度/20
const boxWidth = windowInnerWidth / 20;
// 屏幕高度/20
const boxHeight = windowInnerHeight / 20;
// 单位大小
const boxLen = boxWidth < boxHeight ? boxWidth : boxHeight;

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
    return (
      <div className="who_is_under">
        <button onClick={this.userJoin}>进入房间</button>
        <button onClick={this.userExit}>离开房间</button>
        <button onClick={this.showModal}>
          {this.state.name === "" ? "登录" : this.state.name}
        </button>
        <br />
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
            width: 200,
            // top:50,
            // position:"absolute",
          }}
        />

        <button
          onClick={this.userSend}
          style={
            {
              // left:windowInnerWidth-200,
              // height:24,
              // top:50,
              // position:"absolute",
            }
          }
        >
          发言
        </button>
        <br />
        <div
          style={{
            top: 50,
            overflowY: "scroll",
            width: 6 * boxLen,
            height: 16 * boxLen,
            position: "absolute",
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
        <br />
      </div>
    );
  }
}
