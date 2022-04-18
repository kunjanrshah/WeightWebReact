import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Setting() {
  const baseUrl='setting';
  const [settings, setsettings] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedsettingNo, setEditedsettingNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);
  const [settingId, setsettingId]=useState(null);
  const [settingValue, setsettingValue]=useState(null);

  async function getsetting(){

    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setsettings(data);
  }

  useEffect(getsetting, [])

  async function handleEditsetting (id) {
    setEditedsettingNo(id); 
  }

  function handleSettingChange(id,e){
      console.log(e);
      setsettingId(id);
      setsettingValue(e.target.value);
  }

  async function handleUpdatesetting (ele) {
    let id;
    let payload={};
    if(ele.name!='flag1' &&  ele.name!='flag3' && ele.name!='flag2')
    {
        id=ele.id;
        payload['value']=editRefs.current[`settingNo_${id}`].value
    }
    else{
      id=settingId;
      payload={
        "value": settingValue,
      };
    }
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify(payload));

    getsetting();
    setEditedsettingNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Settings</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Value</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      settings.map((ele, index) => {
                        return (
                          editedsettingNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{(ele.name=='flag1') && ('Manual')}
                              {(ele.name=='flag2') && ('TARE-GROSS')}
                              {(ele.name=='flag3') && ('Report')}
                              {(ele.name!='flag1' &&  ele.name!='flag3' && ele.name!='flag2') && (ele.name)}</td>
                              <td>{(ele.value=='TARE-GROSS') && ('ACTIVE')}
                              {(ele.value=='GROSS') && ('INACTIVE')}
                              {(ele.value!='TARE-GROSS' && ele.value!='GROSS') && (ele.value)}
                              </td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditsetting(ele.id)}>EDIT</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td>{(ele.name=='flag1') && ('Manual')}
                              {(ele.name=='flag2') && ('TARE-GROSS')}
                              {(ele.name=='flag3') && ('Report')}
                              {(ele.name!='flag1' &&  ele.name!='flag3' && ele.name!='flag2') && (ele.name)}
                              </td>
                              <td>{(ele.name=='flag1'|| ele.name=='flag3') && (
                                    <select 
                                    className="form-control form-select" 
                                    aria-label="Default select example" 
                                    value={ele.value} 
                                    onChange={(e)=>{ele.value= e.target.value;handleSettingChange(ele.id,e)}}> 
                                      <option  value="ACTIVE">ACTIVE</option>
                                      <option  value="INACTIVE">INACTIVE</option>
                                    </select>)}
                                  {(ele.name=='flag2') && (
                                    <select 
                                    className="form-control form-select" 
                                    aria-label="Default select example" 
                                    value={ele.value} 
                                    onChange={(e)=>{ele.value= e.target.value;handleSettingChange(ele.id,e)}}> 
                                      <option value='TARE-GROSS'>ACTIVE</option>
                                      <option  value="GROSS">INACTIVE</option>
                                    </select>)}
                                    {(ele.name!='flag1' &&  ele.name!='flag3' && ele.name!='flag2') && (
                                      <input type="text" ref={reference => editRefs.current[`settingNo_${ele.id}`] = reference} defaultValue={ele.value}/>
                                    )}
                              </td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdatesetting(ele)}>UPDATE</button>
                              </td>
                            </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Setting;
