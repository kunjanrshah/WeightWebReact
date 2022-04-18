import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint.js';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {SettingConstant} from "../services/constants.js";

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
} from "react-bootstrap";

import { useParams } from "react-router-dom";

const mqtt=require('mqtt');

function ReportEdit(props, ref) {
  const [settingConst,setsettingConst]=useState({});
  //console.log(props);
  const componentRef = useRef();
  const [allResponseData,setallResponseData]=useState(null);

  // Get ID from URL
  const params = useParams();
  const [Sno,setSno]=useState(10);
  const [defaultNetWeight,setdefaultNetWeight]=useState(0);
  
  const [disableGrossWeight,setdisableGrossWeight]=useState(false);
  const [disableTareWeight,setdisableTareWeight]=useState(false);

  const [defaultGrossWeight,setdefaultGrossWeight]=useState(0);
  const [defaultTareWeight,setdefaultTareWeight]=useState(0);

  const [defaultCharges,setdefaultCharges]=useState(0);
  //const [defaultTareWeight,setdefaultTareWeight]=useState(0);

  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [weight1, setWeight1] = React.useState(0);
  const [weight2, setWeight2] = React.useState(0);

  function checkIsRouteParamsExist(){
      let pendingId=props.reportId;
     // console.log("pendingId",pendingId);
      if(pendingId && pendingId!=':id'){
        return true;
      }
      else{
        return false;
      }
  }

  //vehicle 
  let [vehicleId, setVehicleId] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInputValue, setvehicleInputValue] = useState('');
  async function getVehicle(){
    const baseUrl='vehicle';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setVehicles(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setVehicleId(data[0].id);
    }
  }
  let handleVehicleChange = (e) => {
    setVehicleId(e.target.value);
    console.log(vehicleId);
  }
  //close vehicle

   //supplier 
   let [supplierId, setSupplierId] = useState('');
   const [suppliers, setSuppliers] = useState([]);
   const [supplierInputValue, setsupplierInputValue] = useState('');

   async function getSupplier(){
    const baseUrl='supplier';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setSuppliers(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setSupplierId(data[0].id);
    }
   }

   let handleSupplierChange = (e) => {
     setSupplierId(e.target.value);
   }
   //close supplier

   //material 
   let [materialId, setMaterialId] = useState('');
   const [materials, setMaterials] = useState([]);
   const [materialInputValue, setmaterialInputValue] = useState('');

   async function getMaterial(){
    const baseUrl='material';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setMaterials(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setMaterialId(data[0].id);
    }
   }

   let handleMaterialChange = (e) => {
     setMaterialId(e.target.value);
     console.log(materialId);
   }
   //close material

  //receiver 
  let [receiverId, setReceiverId] = useState('');
  const [receivers, setReceivers] = useState([]);
  const [receiverInputValue, setreceiverInputValue] = useState('');

  async function getReceiver(){
    const baseUrl='receiver';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setReceivers(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setReceiverId(data[0].id);
    }
  }

  let handleReceiverChange = (e) => {
    setReceiverId(e.target.value);
    console.log(receiverId);
  }
  //close receiver

  //Villege
  let [villegeId, setVillegeId] = useState('');
  const [villeges, setVilleges] = useState([]);
  const [villegeInputValue, setvillegeInputValue] = useState('');

  async function getVillege(){
    const baseUrl='villege';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setVilleges(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setVillegeId(data[0].id);
    }
  }

  let handleVillegeChange = (e) => {
    setVillegeId(e.target.value);
    console.log(villegeId);
  }
  //close Villege

  //Remark
  let [remarkId, setRemarkId] = useState('');
  const [remarks, setRemarks] = useState([]);
  const [remarkInputValue, setremarkInputValue] = useState('');

  async function getRemark(){
    const baseUrl='remark';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setRemarks(data);
    if(data.length>0 && !checkIsRouteParamsExist())
    {
      setRemarkId(data[0].id);
    }
  }

  let handleRemarkChange = (e) => {
    setRemarkId(e.target.value);
    console.log(remarkId);
  }
  //close Remark

  //Payment Type
  let [paymentType, setPaymentType] = useState('cash');
  let handlePaymentChange = (type) => {
    setPaymentType(type);
  }
  //close Payment Type

  //Entry Type
  let [entryType, seteEntryType] = useState('manual');
  let handleEntryTypeChange = (type) => {
    seteEntryType(type);
  }
  //close Entry Type

  //Weight Type
  let [weightType, setWeightType] = useState('tare');
  let handleWeightTypeChange = (type) => {
    setWeightType(type);
  }
  //close Weight Type

  //Gross and Tare weight handle
  let handleGrossWeight = (e) => {
    setdefaultGrossWeight(+e.target.value);
  }

  let handleTareWeight = (e) => {
    setdefaultTareWeight(+e.target.value);
  }
  //close Gross and Tare weight handle

  //Charges 
  let handleCharges=(e)=>{
    setdefaultCharges(+e.target.value);
  }
  //close charges

  //setting
  const [settings, setsettings] = useState([]);
  async function getsetting(){

    let baseUrl="setting";
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setsettings(data);
  }
  //close setting
 
  useEffect(() => {
    if(entryType=='auto')
    {
      if(weightType=='tare')
      {
        setdisableGrossWeight(true);
        setdisableTareWeight(false);

        setdefaultTareWeight(+weight1);
        if(!checkIsRouteParamsExist())
        setdefaultGrossWeight(0);

      }
      if(weightType=='gross')
      {
        setdisableGrossWeight(false);
        setdisableTareWeight(true);

        setdefaultGrossWeight(+weight1);

        if(!checkIsRouteParamsExist())
        setdefaultTareWeight(0);
      }
    }
    else{
      setdisableGrossWeight(false);
      setdisableTareWeight(false);
      //setdisableNetWeight(false);
    }

  },[weightType,entryType,weight1]);

  useEffect(() => {    
     //console.log(defaultGrossWeight,defaultTareWeight);  
      if(defaultGrossWeight>defaultTareWeight)
      {
        setdefaultNetWeight(+(defaultGrossWeight-defaultTareWeight));
      }
      else{
        setdefaultNetWeight(0);
      }
  },[defaultGrossWeight,defaultTareWeight])

 async function getPendingReportDetail()
 {
    if(checkIsRouteParamsExist())
    {
      let pendingId=props.reportId;
      const baseUrl='weighing';
      const data = await ApiService(`${baseUrl}/${pendingId}`, 'GET', null);
      setSno(data.id);

      setdefaultCharges(data.charges);
      setdefaultGrossWeight(data.gross_weight);
      setdefaultTareWeight(data.tare_weight);
      setdefaultNetWeight(data.net_weight);
      setPaymentType(data.payment_type);



      setMaterialId(data.material_id);
      setReceiverId(data.receiver_id);
      setVehicleId(data.vehicle_id);
      setRemarkId(data.remark_id);
      setSupplierId(data.supplier_id);
      setVillegeId(data.villege_id);
    }
    else{
      const baseUrl='weighing/getNextId';
      const data = await ApiService(`${baseUrl}`, 'GET', null);
      setSno(+(data.id)+1);
    }
  
    // setRemarks(data);
 }

 async function getSettingConst(){
  setsettingConst(await SettingConstant());
}

  useEffect(() => {
    getSettingConst();
    getsetting();
    getPendingReportDetail();
    
    getVehicle();
    getSupplier();
    getMaterial();
    getReceiver();
    getVillege();
    getRemark();

    //mqtt
    var client = mqtt.connect('mqtt://broker.hivemq.com:8000/mqtt');

    client.on("connect", function(){
        client.subscribe("Nikhil");
        client.subscribe("Nikhil");

        console.log("Client has subscribed successfully");
    });

    client.on("message", function(topic,message){
      //console.log(topic,message.toString());
       if(topic == "Nikhil")
         setWeight1(+message.toString());
       if(topic == "Nikhil1")
         setWeight2(+message.toString());
    });
    // close mqtt



  }, []);

  const charges = useRef(null);
  const grossWeight = useRef(null);
  const tareWeight = useRef(null);
  const netWeight = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function handleSubmit()
  {
    const baseUrl="weighing";
    let method;
    let url;
    if(checkIsRouteParamsExist())
    {
      let pendingId=props.reportId;
      url=`${baseUrl}/${pendingId}`;
      method='PATCH';
    }
    else{
      url=baseUrl;
      method='POST';
    }
    

    let payload={
      "charges":+charges.current.value,
      "payment_type":paymentType,
      "gross_weight":+grossWeight.current.value,
      "tare_weight":+tareWeight.current.value,
      "net_weight":+netWeight.current.value,
      "vehicle_id":+vehicleId,
      "supplier_id":+supplierId,
      "material_id":+materialId,
      "villege_id":+villegeId,
      "receiver_id":+receiverId,
      "remark_id":+remarkId
    };

    if(vehicleInputValue)
    {
      payload['vehicle_number']=vehicleInputValue;
    }

    if(supplierInputValue)
    {
      payload['supplier_name']=supplierInputValue;
    }

    if(materialInputValue)
    {
      payload['material_name']=materialInputValue;
    }

    if(villegeInputValue)
    {
      payload['villege_name']=villegeInputValue;
    }

    if(receiverInputValue)
    {
      payload['receiver_name']=receiverInputValue;
    }

    if(remarkInputValue)
    {
      payload['remark_text']=remarkInputValue;
    }

    const data = await ApiService(`${url}`, method, JSON.stringify(payload));

    setallResponseData(data);
    props.parentCallback();
    //handlePrint();
    //window.print();
  }

  return (
    <> 
      <div style={{ display: "none" }}><ComponentToPrint allResponseData={allResponseData} ref={componentRef} /></div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Weight Detail</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="align-items-center">
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Sr No </label>
                        <Form.Control
                          value={Sno}
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Charges</label>
                        <Form.Control
                          value={defaultCharges}
                          ref={charges}
                          placeholder="Charges"
                          type="text"
                          onChange={handleCharges}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                        <Form.Check
                          inline
                          label="Cash"
                          name="cashcredit"
                          type={'radio'}
                          id={`inline-cash-1`}
                          checked={paymentType=='cash'}
                          onChange={()=>{handlePaymentChange('cash')}}
                        />
                        <Form.Check
                          inline
                          label="Credit"
                          name="cashcredit"
                          type={'radio'}
                          id={`inline-credit-2`}
                          checked={paymentType=='credit'}
                          onChange={()=>{handlePaymentChange('credit')}}
                        />
                    </Col>
                  </Row>
                  <Row className="align-items-center" style={{display:'none'}}>
                  <Col className="pr-1" md="3">
                        <Form.Check
                          inline
                          label="Tare Weight"
                          name="weight"
                          type={'radio'}
                          id={`inline-weight-1`}
                          defaultChecked
                          onChange={()=>{handleWeightTypeChange('tare')}}
                        />
                        <Form.Check
                          inline
                          label="Gross Weight"
                          name="weight"
                          type={'radio'}
                          id={`inline-weight-2`}
                          onChange={()=>{handleWeightTypeChange('gross')}}
                        />
                    </Col>
                    <Col className="pr-1" md="3">
                        <Form.Check
                          inline
                          label="Auto"
                          name="weighing_type"
                          type={'radio'}
                          id={`inline-weighing_type-1`}
                          defaultChecked
                          onChange={()=>{handleEntryTypeChange('auto')}}
                        />
                        <Form.Check
                          inline
                          label="Manual"
                          name="weighing_type"
                          type={'radio'}
                          id={`inline-weighing_type-2`}
                          onChange={()=>{handleEntryTypeChange('manual')}}
                        />
                    </Col>
                    <Col className="pl-3" md="6">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="weight_machine" id="weight_machine1" defaultChecked/>
                          <label className="form-check-label" htmlFor="weight_machine1" style={{'fontSize': '24px','fontWeight': 'bold'}}>
                              Weighing Scale1: {weight1}
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="weight_machine" id="weight_machine2" />
                          <label className="form-check-label" htmlFor="weight_machine2" style={{'fontSize': '24px','fontWeight': 'bold'}}>
                              Weighing Scale2: {weight2}
                          </label>
                        </div>
                       {/* <div>Weighing Scale1: {weight1}</div> */}
                    </Col>
                    {/* <Col className="pl-3" md="3">
                       <div>Weighing Scale2: {weight2}</div>
                    </Col> */}
                  </Row>
                  <Row>
                  <Col className="pr-1 mt-3" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ vehicles.find((item) => { return item.id == vehicleId})? vehicles.find((item) => { return item.id == vehicleId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setVehicleId(newValue.id);
                          
                        }}
                        inputValue={vehicleInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setvehicleInputValue(newInputValue);
                        }}
                        options={vehicles}
                        getOptionLabel={(option) => option.vehicle_number}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.vehicle}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Vehicle</label>
                        <select className="form-control form-select" aria-label="Default select example" value={vehicleId} onChange={handleVehicleChange}> 
                        {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id} >{vehicle.vehicle_number}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col className="px-1 mt-3" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ materials.find((item) => { return item.id == materialId})? materials.find((item) => { return item.id == materialId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setMaterialId(newValue.id);
                          
                        }}
                        inputValue={materialInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setmaterialInputValue(newInputValue);
                        }}
                        options={materials}
                        getOptionLabel={(option) => option.material_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.material}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Material</label>
                        <select className="form-control form-select" aria-label="Default select example" value={materialId} onChange={handleMaterialChange}> 
                        {materials.map((material) => <option key={material.id} value={material.id}>{material.material_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1 mt-3" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ suppliers.find((item) => { return item.id == supplierId})? suppliers.find((item) => { return item.id == supplierId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setSupplierId(newValue.id);
                          
                        }}
                        inputValue={supplierInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setsupplierInputValue(newInputValue);
                        }}
                        options={suppliers}
                        getOptionLabel={(option) => option.supplier_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.supplier}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Supplier</label>
                        <select className="form-control form-select" aria-label="Default select example" value={supplierId} onChange={handleSupplierChange}> 
                        {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.supplier_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ villeges.find((item) => { return item.id == villegeId})? villeges.find((item) => { return item.id == villegeId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setVillegeId(newValue.id);
                          
                        }}
                        inputValue={villegeInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setvillegeInputValue(newInputValue);
                        }}
                        options={villeges}
                        getOptionLabel={(option) => option.villege_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.villege}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Villege</label>
                        <select className="form-control form-select" aria-label="Default select example" value={villegeId} onChange={handleVillegeChange}> 
                        {villeges.map((villege) => <option key={villege.id} value={villege.id}>{villege.villege_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ receivers.find((item) => { return item.id == receiverId})? receivers.find((item) => { return item.id == receiverId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setReceiverId(newValue.id);
                          
                        }}
                        inputValue={receiverInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setreceiverInputValue(newInputValue);
                        }}
                        options={receivers}
                        getOptionLabel={(option) => option.receiver_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.receiver}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Receiver</label>
                        <select className="form-control form-select" aria-label="Default select example" value={receiverId} onChange={handleReceiverChange}> 
                        {receivers.map((receiver) => <option key={receiver.id} value={receiver.id}>{receiver.receiver_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={ remarks.find((item) => { return item.id == remarkId})? remarks.find((item) => { return item.id == remarkId}) :null}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setRemarkId(newValue.id);
                          
                        }}
                        inputValue={remarkInputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          setremarkInputValue(newInputValue);
                        }}
                        options={remarks}
                        getOptionLabel={(option) => option.remark}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={settingConst?.remark}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        />
                        {/* <label>Remark</label>
                        <select className="form-control form-select" aria-label="Default select example" value={remarkId} onChange={handleRemarkChange}> 
                        {remarks.map((remark) => <option key={remark.id} value={remark.id}>{remark.remark}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Gross Weight</label>
                        <Form.Control
                          value={defaultGrossWeight}
                          disabled={(disableGrossWeight)? "disabled" : ""}
                          ref={grossWeight}
                          placeholder="Gross Weight"
                          type="text"
                          onChange={handleGrossWeight}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  <Col className="pr-1" md="4">
                      <Form.Group >
                        <label>Tare Weight</label>
                        <Form.Control
                          value={defaultTareWeight}
                          disabled={(disableTareWeight)? "disabled" : ""}
                          ref={tareWeight}
                          placeholder="Tare Weight"
                          type="text"
                          onChange={handleTareWeight}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                    <Col className="pl-1" md="4">
                       <Form.Group key={defaultNetWeight}>
                        <label>Net Weight</label>
                        <Form.Control
                          defaultValue={defaultNetWeight}
                          disabled
                          ref={netWeight}
                          placeholder="Net Weight"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}


export default ReportEdit;
