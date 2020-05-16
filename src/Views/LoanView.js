import React, {Component} from "react";
import {Card, Col, InputNumber, Layout, Row, Slider} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import axios from 'axios';
const {Sider, Content, Header} = Layout;

export default class LoanView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            principalAmount: null,
            interestAmount: null,
            collapsed: false,
            principal: 500,
            duration:6
        }
        this.checkKeyPress=this.checkKeyPress.bind(this);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onChange = value => {
        this.setState({principal: value})
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=500&numMonths=12`).then(res => {
                console.log(res.data);
            })
    };
    onMonthChange = value => {
        this.setState({duration: value})
    };
    checkKeyPress(e){
        if((e.keyCode >= 48 && e.keyCode <=57) || (e.keyCode >= 96 && e.keyCode <=105)) {
            console.log('number');
        }

    }

    render() {
        let {principal,duration} = this.state;

        return <div><Layout>
            <Sider width={300} style={{height: '100vh'}} trigger={null} collapsible collapsed={this.state.collapsed}
                   collapsedWidth={150}>


            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        minHeight: 280,
                    }}
                >
                    <div className={'heading1'}>
                        <div>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                                style: {fontSize: '30px', margin: '10px 0 0 10px', float: 'left'}
                            })}
                        </div>
                        <span style={{fontSize: '25px'}}>Lorem ipsum</span>
                    </div>
                    <br/>
                    <br/><br/>
                    <br/>
                    <Row>
                        <Col xl={3} lg={3} md={24} sm={24} xs={24}>
                        </Col>
                        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
                            <Card title={<div style={{color: 'white', textAlign: 'center'}}><span
                                style={{fontSize: '20px'}}>Input</span></div>} className={'innerCard'}
                                  headStyle={{borderBottom: '1px solid #33333d'}}>
                                <span style={{color: 'white', fontSize: '20px'}}>Amount:</span>
                                <Row>
                                    <Col xl={14} lg={14} md={24} sm={24} xs={24}>

                                        <Slider
                                            tipFormatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            min={500}
                                            max={5000}
                                            onChange={this.onChange}
                                            value={typeof principal === 'number' ? principal  : 0}
                                        />
                                    </Col>
                                    <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                                        <span style={{color:'white',fontSize:'20px',marginLeft:'10px'}}>$<InputNumber
                                            type={"number"}
                                            min={500}
                                            max={5000}
                                            style={{margin: '0 5px',width:'60px'}}
                                            value={principal}
                                            onChange={this.onChange}
                                        /></span>
                                    </Col>
                                </Row>

                                <span style={{color: 'white', fontSize: '20px'}}>Duration:</span>
                                <Row>
                                    <Col xl={14} lg={14} md={24} sm={24} xs={24}>

                                        <Slider
                                            tipFormatter={value => `${value} Months`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            min={6}
                                            max={24}
                                            onChange={this.onMonthChange}
                                            value={typeof duration === 'number' ? duration : 0}
                                        />
                                    </Col>
                                    <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                                         <InputNumber
                                            type={"number"}
                                            min={6}
                                            max={24}
                                            style={{margin: '0 25px',width:'60px'}}
                                            value={duration}
                                            onChange={this.onMonthChange}
                                        />
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                        <Col  xl={9} lg={9} md={24} sm={24} xs={24}>
                            <Card title={<div style={{color: 'white', textAlign: 'center'}}><span
                                style={{fontSize: '20px'}}>Output</span></div>} className={'innerCard'}
                                  headStyle={{borderBottom: '1px solid #33333d'}}>

                            </Card>
                        </Col>
                        <Col  xl={3} lg={3} md={24} sm={24} xs={24}>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
        </div>
    }
}
