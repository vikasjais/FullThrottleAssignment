import React, {Component} from "react";
import {Card, Col, InputNumber, Layout, message, Row, Slider,Descriptions} from 'antd';
import {LoadingOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
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
            duration: 6,
            interest: null,
            emi: null,
            loading: true,
            cache:[],
        }
        this.checkKeyPress = this.checkKeyPress.bind(this);
        this.apiCall = this.apiCall.bind(this);
        this.cacheObject = this.cacheObject.bind(this);
        this.addCacheObject = this.addCacheObject.bind(this);
    }

    componentDidMount() {
        this.apiCall();
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onChange = value => {
        this.setState({ principal: value})

    };
    onAfterChange = value => {
        this.setState({loading: true, principal: value}, () => this.apiCall())

    };
    onMonthChange = value => {
        this.setState({duration: value})
    };
    onMonthAfterChange= value => {
        this.setState({loading: true, duration: value}, () => this.apiCall())
    };

    apiCall() {
        let url = 'https://ftl-frontend-test.herokuapp.com/interest?amount=' + this.state.principal + '&numMonths=' + this.state.duration;
        axios.get(url).then(res => {
            this.setState({interest: res.data.interestRate, emi: res.data.monthlyPayment.amount, loading: false},
                ()=>this.addCacheObject())

        }).catch(err => {
            message.error("Something went wrong");
        })
    }
    addCacheObject(){
        let {cache}=this.state;
        cache.push(this.cacheObject(this.state.principal,this.state.duration,this.state.interest,this.state.emi));

    }
    cacheObject(principal,duration,interest,emi){
        return {
            principal:principal,
            duration:duration,
            interest:interest,
            emi:emi
        }
    }

    checkKeyPress(e) {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            console.log('number');
        }

    }

    render() {
        let {principal, duration, emi, interest, loading,cache} = this.state;
        console.log(cache);

        return <div><Layout>
            <Sider width={300} style={{height: '100vh'}} trigger={null} collapsible collapsed={this.state.collapsed}
                   collapsedWidth={0}>
                {
                    cache.map((object,index)=>
                        <a>
                        <div className={'cache'} onClick={console.log('hello')}>
                        <Descriptions bordered column={1} size={'small'} style={{backgroundColor:'#33333d'}}>
                  <Descriptions.Item label={'Amount'} style={{color: 'white',backgroundColor:'#33333d'}} >{object.principal}</Descriptions.Item>
                  <Descriptions.Item label={'Duration'} style={{color: 'white',backgroundColor:'#33333d'}} >{object.duration}</Descriptions.Item>
                  <Descriptions.Item label={'Interest'} style={{color: 'white',backgroundColor:'#33333d'}} >{object.interest}</Descriptions.Item>
                  <Descriptions.Item label={'EMI'} style={{color: 'white',backgroundColor:'#33333d'}} >{object.emi}</Descriptions.Item>
                        </Descriptions>
                        </div>
                        </a>
                    )

                }


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
                        <span style={{fontSize: '30px'}}>Loan Enquiry</span>
                    </div>
                    <br/>
                    <br/><br/>
                    <br/>
                    <Row>
                        <Col xl={3} lg={3} md={24} sm={24} xs={24}>
                        </Col>
                        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
                            <Card bodyStyle={{minHeight: '200px'}}
                                  title={<div style={{color: 'white', textAlign: 'center'}}><span
                                      style={{fontSize: '20px'}}>Loan detail</span></div>} className={'innerCard'}
                                  headStyle={{borderBottom: '1px solid #dd3f77'}}>
                                <span style={{color: 'white', fontSize: '20px'}}>Amount:</span>
                                <Row>
                                    <Col xl={14} lg={14} md={24} sm={24} xs={24}>

                                        <Slider
                                            tipFormatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            min={500}
                                            max={5000}
                                            onChange={this.onChange}
                                            onAfterChange={this.onAfterChange}
                                            value={typeof principal === 'number' ? principal : 0}
                                        />
                                    </Col>
                                    <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                                        <span
                                            style={{color: 'white', fontSize: '20px', marginLeft: '10px'}}>$<InputNumber
                                            type={"number"}
                                            min={500}
                                            max={5000}
                                            style={{margin: '0 5px', width: '60px'}}
                                            value={principal}
                                            onChange={this.onAfterChange}
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
                                            onAfterChange={this.onMonthAfterChange}
                                            value={typeof duration === 'number' ? duration : 0}
                                        />
                                    </Col>
                                    <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                                        <InputNumber
                                            type={"number"}
                                            min={6}
                                            max={24}
                                            style={{margin: '0 25px', width: '60px'}}
                                            value={duration}
                                            onChange={this.onMonthAfterChange}
                                        />
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
                            <Card bodyStyle={{minHeight: '200px'}}
                                  title={<div style={{color: 'white', textAlign: 'center'}}><span
                                      style={{fontSize: '20px'}}>Interest detail</span></div>} className={'innerCard'}
                                  headStyle={{borderBottom: '1px solid #dd3f77'}}>
                                <Card style={{backgroundColor: '#33333d',border:'1px solid #dd3f77', boxShadow: '0 15px 15px 0'}}>
                                    <Row>
                                        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                            <h1 style={{
                                                color: 'white',
                                                fontSize: '20px',
                                                fontStyle: 'italic',
                                            }}>Interest rate:</h1>

                                        </Col>
                                        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                            <h1><span style={{
                                                color: 'white',
                                                fontSize: '20px',
                                                fontStyle: 'italic',
                                            }}>{!loading ? interest :
                                                <LoadingOutlined style={{color: '#dd3f77'}}/>}</span>
                                            </h1>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                            <h1
                                                style={{
                                                    color: 'white',
                                                    fontSize: '20px',
                                                    fontStyle: 'italic',
                                                }}>Monthly EMI:</h1>

                                        </Col>
                                        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                            <h1><span
                                                style={{
                                                    color: 'white',
                                                    fontSize: '20px',
                                                    fontStyle: 'italic',
                                                }}>{!loading ? emi :
                                                <LoadingOutlined style={{color: '#dd3f77'}}/>}</span>
                                            </h1>
                                        </Col>
                                    </Row>
                                </Card>
                            </Card>
                        </Col>
                        <Col xl={3} lg={3} md={24} sm={24} xs={24}>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
        </div>
    }
}

