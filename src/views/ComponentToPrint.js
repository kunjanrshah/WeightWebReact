import React, { useEffect, useState, useRef } from "react";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table
  } from "react-bootstrap";
import ReceiverList from "./ReceiverList";
import {SettingConstant} from "../services/constants.js";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [settingConst,setsettingConst]=useState({});
    async function getSettingConst(){
        setsettingConst(await SettingConstant());
    }
    useEffect(() => {
        getSettingConst();
    },[])
    let data=props.allResponseData;
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function convertDate(date){
        date=new Date(date);
        let dateString=[    padTo2Digits(date.getDate()),
                            padTo2Digits(date.getMonth() + 1),
                            date.getFullYear()
                        ].join('-') +
                        ' ' +
                        [
                            padTo2Digits(date.getHours()),
                            padTo2Digits(date.getMinutes()),
                            padTo2Digits(date.getSeconds()),
                        ].join(':')
        return dateString;
    }
    
    return (
        <>
        <div ref={ref} style={{ 'border': '5px solid #ccc', height:'100%' }}>
        <Container fluid>
            <Row style={{ 'borderBottom': '1px solid #ccc',paddingBottom:'15px',paddingTop:'10px'}}>
                <Col >
                    <img
                        src={require("assets/img/logo.jpeg").default}
                        alt="..."
                    />
                </Col>
                <Col >
                    <h2>Aqua Machineries Pvt. Ltd.</h2>
                    <h5>Nr.Haridarshan Estate, Nr.Express Highway, Ramol,vatva, Ahmedabad</h5>
                </Col>
            </Row>
            <Row gutter={24} style={{paddingTop:'10px'}}>
                <Col>
                <table>
                    <tbody>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'25px'}}>Sno # :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'25px'}}> {data?.id}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Date :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{convertDate(data?.createdAt)}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Charge :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.charges} </td>
                    </tr>
                    </tbody>
                </table>
                </Col>
                <Col>
                <table>
                    <tbody>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.vehicle} # :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.vehicle?.vehicle_number}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.supplier} :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.supplier.supplier_name}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.receiver} :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.receiver.receiver_name}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.material} :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.material.material_name}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.villege} :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.villege?.villege_name}</td>
                    </tr>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>{settingConst?.remark} :</th>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.remark?.remark}</td>
                    </tr>
                    </tbody>
                </table>
                </Col>
            </Row>

            <Row style={{ marginTop: 48 }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>#</th>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Gross Weight</th>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Tare Weight</th>
                    <th style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Net Weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>1</td>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.gross_weight}</td>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.tare_weight}</td>
                    <td style={{ 'color': '#000',paddingBottom:'10px',fontSize:'20px'}}>{data?.net_weight}</td>
                    </tr>
                </tbody>
                </Table>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Driver Sign</Col>
                <Col style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Operator Sign</Col>
                <Col style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Authorised Sign</Col>
                <Col style={{ 'color': '#000',paddingBottom:'10px',fontWeight:'bold',fontSize:'20px'}}>Security Sign</Col>
            </Row>
        </Container>
        </div>
      </>
    );
  });