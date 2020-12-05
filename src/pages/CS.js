import React, { Component } from "react";
import { Row, Col, Button } from "antd";

export default class CS extends Component {
  state = {
    atk: [0, 0, 0, 0, 0, 0],
    atks: 0,
    def: [0, 0, 0, 0, 0, 0],
    defs: 0,
    move: [0, 0, 0, 0, 0, 0],
    moves: 0,
    get: [0, 0, 0, 0, 0, 0],
    gets: 0,
    lest: [0, 0, 0, 0, 0, 0],
    lests: 0,
    rec: [0, 0, 0, 0, 0, 0],
    recs: 0,
  };

  atkGet = (num) => {
    const { atk, atks } = this.state;
    atk[num] += 1;
    this.setState({
      atk,
      atks: atks + 1 + num,
    });
  };

  defGet = (num) => {
    const { def, defs } = this.state;
    def[num] += 1;
    this.setState({
      def,
      defs: defs + 1 + num,
    });
  };

  moveGet = (num) => {
    const { move, moves } = this.state;
    move[num] += 1;
    this.setState({
      move,
      moves: moves + 1 + num,
    });
  };

  getGet = (num) => {
    const { get, gets } = this.state;
    get[num] += 1;
    this.setState({
      get,
      gets: gets + 1 + num,
    });
  };

  lestGet = (num) => {
    const { lest, lests } = this.state;
    lest[num] += 1;
    this.setState({
      lest,
      lests: lests + 1 + num,
    });
  };

  recGet = (num) => {
    const { rec, recs } = this.state;
    rec[num] += 1;
    this.setState({
      rec,
      recs: recs + 1 + num,
    });
  };

  render() {
    return (
      <Row>
        <Col span={2} />
        <Col span={1}>一点</Col>
        <Col span={1}>两点</Col>
        <Col span={1}>三点</Col>
        <Col span={1}>四点</Col>
        <Col span={1}>五点</Col>
        <Col span={1}>六点</Col>
        <Col span={1}>总计</Col>
        <Col span={15} />
        <Col span={2}>攻击</Col>
        <Col span={1}>{this.state.atk[0]}</Col>
        <Col span={1}>{this.state.atk[1]}</Col>
        <Col span={1}>{this.state.atk[2]}</Col>
        <Col span={1}>{this.state.atk[3]}</Col>
        <Col span={1}>{this.state.atk[4]}</Col>
        <Col span={1}>{this.state.atk[5]}</Col>
        <Col span={1}>
          {this.state.atks /
            (this.state.atk[0] +
              this.state.atk[1] +
              this.state.atk[2] +
              this.state.atk[3] +
              this.state.atk[4] +
              this.state.atk[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.atkGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={2}>防御</Col>
        <Col span={1}>{this.state.def[0]}</Col>
        <Col span={1}>{this.state.def[1]}</Col>
        <Col span={1}>{this.state.def[2]}</Col>
        <Col span={1}>{this.state.def[3]}</Col>
        <Col span={1}>{this.state.def[4]}</Col>
        <Col span={1}>{this.state.def[5]}</Col>
        <Col span={1}>
          {this.state.defs /
            (this.state.def[0] +
              this.state.def[1] +
              this.state.def[2] +
              this.state.def[3] +
              this.state.def[4] +
              this.state.def[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.defGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={2}>移动</Col>
        <Col span={1}>{this.state.move[0]}</Col>
        <Col span={1}>{this.state.move[1]}</Col>
        <Col span={1}>{this.state.move[2]}</Col>
        <Col span={1}>{this.state.move[3]}</Col>
        <Col span={1}>{this.state.move[4]}</Col>
        <Col span={1}>{this.state.move[5]}</Col>
        <Col span={1}>
          {this.state.moves /
            (this.state.move[0] +
              this.state.move[1] +
              this.state.move[2] +
              this.state.move[3] +
              this.state.move[4] +
              this.state.move[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.moveGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={2}>获得星星</Col>
        <Col span={1}>{this.state.get[0]}</Col>
        <Col span={1}>{this.state.get[1]}</Col>
        <Col span={1}>{this.state.get[2]}</Col>
        <Col span={1}>{this.state.get[3]}</Col>
        <Col span={1}>{this.state.get[4]}</Col>
        <Col span={1}>{this.state.get[5]}</Col>
        <Col span={1}>
          {this.state.gets /
            (this.state.get[0] +
              this.state.get[1] +
              this.state.get[2] +
              this.state.get[3] +
              this.state.get[4] +
              this.state.get[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.getGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={2}>失去星星</Col>
        <Col span={1}>{this.state.lest[0]}</Col>
        <Col span={1}>{this.state.lest[1]}</Col>
        <Col span={1}>{this.state.lest[2]}</Col>
        <Col span={1}>{this.state.lest[3]}</Col>
        <Col span={1}>{this.state.lest[4]}</Col>
        <Col span={1}>{this.state.lest[5]}</Col>
        <Col span={1}>
          {this.state.lests /
            (this.state.lest[0] +
              this.state.lest[1] +
              this.state.lest[2] +
              this.state.lest[3] +
              this.state.lest[4] +
              this.state.lest[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.lestGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={2}>复活</Col>
        <Col span={1}>{this.state.rec[0]}</Col>
        <Col span={1}>{this.state.rec[1]}</Col>
        <Col span={1}>{this.state.rec[2]}</Col>
        <Col span={1}>{this.state.rec[3]}</Col>
        <Col span={1}>{this.state.rec[4]}</Col>
        <Col span={1}>{this.state.rec[5]}</Col>
        <Col span={1}>
          {this.state.recs /
            (this.state.rec[0] +
              this.state.rec[1] +
              this.state.rec[2] +
              this.state.rec[3] +
              this.state.rec[4] +
              this.state.rec[5])}
        </Col>
        <Col span={15} />
        <Col span={2} />
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(0);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(1);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(2);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(3);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(4);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => {
              this.recGet(5);
            }}
          >
            加
          </Button>
        </Col>
        <Col span={16} />
        <Col span={1}>总计</Col>
        <Col span={1}>
          {(this.state.atks +
            this.state.defs +
            this.state.moves +
            this.state.gets +
            this.state.lests +
            this.state.recs) /
            (this.state.atk[0] +
              this.state.atk[1] +
              this.state.atk[2] +
              this.state.atk[3] +
              this.state.atk[4] +
              this.state.atk[5] +
              this.state.def[0] +
              this.state.def[1] +
              this.state.def[2] +
              this.state.def[3] +
              this.state.def[4] +
              this.state.def[5] +
              this.state.move[0] +
              this.state.move[1] +
              this.state.move[2] +
              this.state.move[3] +
              this.state.move[4] +
              this.state.move[5] +
              this.state.get[0] +
              this.state.get[1] +
              this.state.get[2] +
              this.state.get[3] +
              this.state.get[4] +
              this.state.get[5] +
              this.state.lest[0] +
              this.state.lest[1] +
              this.state.lest[2] +
              this.state.lest[3] +
              this.state.lest[4] +
              this.state.lest[5] +
              this.state.rec[0] +
              this.state.rec[1] +
              this.state.rec[2] +
              this.state.rec[3] +
              this.state.rec[4] +
              this.state.rec[5])}
        </Col>
      </Row>
    );
  }
}
