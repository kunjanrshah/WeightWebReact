import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";
import {SettingConstant} from "../services/constants.js";

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

function ReceiverList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='receiver';
  const [receivers, setReceivers] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedReceiverNo, setEditedReceiverNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getReceiver(){
    setsettingConst(await SettingConstant());
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setReceivers(data);
  }

  useEffect(getReceiver, [])


  async function handleNewReceiver (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "receiver_name": formInput.current.value,
      }));

      getReceiver();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveReceiver (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getReceiver();
  }

  async function handleEditReceiver (id) {
    setEditedReceiverNo(id); 
  }

  async function handleUpdateReceiver (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "receiver_name": editRefs.current[`receiverNo_${id}`].value,
      }));

    getReceiver();
    setEditedReceiverNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{settingConst?.receiver} Master Data</Card.Title>
                <p className="card-category">
                  List of {settingConst?.receiver}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{settingConst?.receiver} Name</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={settingConst?.receiver} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewReceiver('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewReceiver('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{settingConst?.receiver}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      receivers.map((ele, index) => {
                        return (
                          editedReceiverNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.receiver_name}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditReceiver(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveReceiver(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`receiverNo_${ele.id}`] = reference} defaultValue={ele.receiver_name}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateReceiver(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedReceiverNo(false)}>CANCEL</button>
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

export default ReceiverList;
