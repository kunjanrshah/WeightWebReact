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
            <Row>
                <Col style={{ 'borderBottom': '1px solid #ccc'}}>
                    <h3>Aqua Machineries Pvt. Ltd.</h3>
                    <h6>Nr.Haridarshan Estate, Nr.Express Highway, Ramol,vatva, Ahmedabad</h6>
                </Col>
            </Row>
            <Row gutter={24} >
                <Col>
                <table>
                    <tbody>
                    <tr>
                    <th>Sno # :</th>
                    <td>{data?.id}</td>
                    </tr>
                    <tr>
                    <th>Date :</th>
                    <td>{convertDate(data?.createdAt)}</td>
                    </tr>
                    <tr>
                    <th>Charge :</th>
                    <td>{data?.charges} </td>
                    </tr>
                    </tbody>
                </table>
                </Col>
                <Col>
                <table>
                    <tbody>
                    <tr>
                    <th>{settingConst?.vehicle} # :</th>
                    <td>{data?.vehicle?.vehicle_number}</td>
                    </tr>
                    <tr>
                    <th>{settingConst?.supplier} :</th>
                    <td>{data?.supplier.supplier_name}</td>
                    </tr>
                    <tr>
                    <th>{settingConst?.receiver} :</th>
                    <td>{data?.receiver.receiver_name}</td>
                    </tr>
                    <tr>
                    <th>{settingConst?.material} :</th>
                    <td>{data?.material.material_name}</td>
                    </tr>
                    <tr>
                    <th>{settingConst?.villege} :</th>
                    <td>{data?.villege?.villege_name}</td>
                    </tr>
                    <tr>
                    <th>{settingConst?.remark} :</th>
                    <td>{data?.remark?.remark}</td>
                    </tr>
                    </tbody>
                </table>
                </Col>
            </Row>

            <Row style={{ marginTop: 48 }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Gross Weight</th>
                    <th>Tare Weight</th>
                    <th>Net Weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>{data?.gross_weight}</td>
                    <td>{data?.tare_weight}</td>
                    <td>{data?.net_weight}</td>
                    </tr>
                </tbody>
                </Table>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col>Driver Sign</Col>
                <Col>Operator Sign</Col>
                <Col>Authorised Sign</Col>
                <Col>Security Sign</Col>
            </Row>
        </Container>
        </div>
      </>
    );
  });