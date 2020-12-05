import React, { Component, Suspense } from "react";
import { Layout, Tooltip, Menu } from "antd";
import { HashRouter, Route, Link } from "react-router-dom";
import asyncComponent from "./AsyncComponent";
import "@/css/App.css";

const WhoIsUnder = asyncComponent(() => import("./pages/WhoIsUnder"));
const CS = asyncComponent(() => import("./pages/CS"));
/**
 * 主页
 */
class App extends Component {
  componentDidMount() {
    // this.goToIndex();
  }

  render() {
    return (
      <div className="App" id="App">
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>
              {/* <Layout.Header className="header"> */}
              {/*  <div className="logo" /> */}
              {/*  <Menu */}
              {/*    theme="dark" */}
              {/*    mode="horizontal" */}
              {/*    defaultSelectedKeys={["0"]} */}
              {/*  > */}
              {/*    <Menu.Item key="1"> */}
              {/*      <Link to="/game1">Who Is Under</Link> */}
              {/*    </Menu.Item> */}
              {/*  </Menu> */}
              {/* </Layout.Header> */}
              <Layout>
                <Layout.Content
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    margin: " 0 5%",
                    width: "90%",
                    backgroundColor: "#c0cbdc",
                    minHeight: window.innerHeight,
                  }}
                >
                  <Route path="/game1" component={WhoIsUnder} />
                  <Route path="/cs" component={CS} />
                </Layout.Content>
              </Layout>
            </Layout>
            {/* <div */}
            {/*  style={{ */}
            {/*    position: "absolute", */}
            {/*    width: window.innerWidth, */}
            {/*    top: window.innerHeight - 50, */}
            {/*    textAlign: "center", */}
            {/*  }} */}
            {/* > */}
            {/*  <div> */}
            {/*    <span>@Author-</span> */}
            {/*    <Tooltip title="QQ626723063">JGN</Tooltip> */}
            {/*    <span>-</span> */}
            {/*    <Tooltip title="QQ978539156">MilK</Tooltip> */}
            {/*    <span>-</span> */}
            {/*    <Tooltip title="QQ823561237">SC</Tooltip> */}
            {/*  </div> */}
            {/*  <a */}
            {/*    onClick={() => { */}
            {/*      window.open( */}
            {/*        "http://beian.miit.gov.cn/publish/query/indexFirst.action" */}
            {/*      ); */}
            {/*    }} */}
            {/*  > */}
            {/*    浙ICP备18049534号-1 */}
            {/*  </a> */}
            {/* </div> */}
          </Suspense>
        </HashRouter>
      </div>
    );
  }
}

export default App;
