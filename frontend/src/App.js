import "./App.css";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { FormLabel, Modal } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import DataTablePage from "./data-table";

function App() {
  const [refresh,setRefresh] =useState(false);

  const [show, setShow] = useState(false);

  // persnal
  const [personnels, setPersonnels] = useState([]);
  const [personnel_name, setPersonnel_Name] = useState("");
  const [personnel_surname, setPersonnel_Surname] = useState("");
  const [personnel_birthday, setPersonnel_Birthday] = useState("");
  const [personnel_birthplace, setPersonnel_Birthplace] = useState("");

  // city
  const [city, setCity] = useState("");
  const [selectCity, setSelectCity] = useState();

  // District
  const [district, setDistrict] = useState("");
  const [filteredDistrict, setFilteredDistrict] = useState([]);
  const [selectedDisable, setSelectedDisable] = useState(true);
  const [selectDistrict, setSelectDistrict] = useState("");


  // Address Type
  const [address_type, setAddress_Type] = useState("");
  const [selectAddress_Type, setSelectAddress_Type] = useState([]);
  const [selectType, setSelectType] = useState("");

  //phone
  const [phone, setPhone] = useState([{ phone: "" }]);

  

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/show").then((res) => {
      setPersonnels(res.data[0]);
      setCity(res.data[1]);
      setDistrict(res.data[2]);
      setAddress_Type(res.data[3]);
    });
  }, [refresh]);

  const onClickSave = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/new", {
        city: selectCity,
        district: selectDistrict,
        address_type: selectType,
        personnel_name,
        personnel_surname,
        personnel_birthday,
        personnel_birthplace,
        phone,
      })
      .then((res) => {
        console.log(res.data);
        setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChangeCity = (e) => {
    setSelectCity(e.value);
    setFilteredDistrict(
      district.filter((district) => e.value === district.city_id)
    );
    setSelectedDisable(false);
  };

  const onChangeDistrict = (e) => {
    setSelectDistrict(e.value);
    // console.log(district);
  };

  const onChangeAddress_Type = (e) => {
    setSelectType(e.value);
    console.log(e);
  };

  const AddressTypeSave = (e) => {
    console.log(e);
    axios
      .post("http://127.0.0.1:8000/api/newtype", { address_type:selectAddress_Type })
      .then((res) => {
        setRefresh(!refresh)
        setShow(false)
        console.log(res.data)
        console.log(res.data.address_type)
      
      })
      .catch(function(error){
        console.log(error);
      });
  };

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const phoneChange = (e, index) => {
    console.log(e.target.name)
    const { name, value } = e.target;
    const list = [...phone];
    list[index][name] = value;
    setPhone(list);
  };
  const phoneRemove = (index) => {
    const list = [...phone];
    list.splice(index, 1);
    setPhone(list);
  };

  const phoneAdd = () => {
    setPhone([...phone, { phone: "" }]);
  };

  return (
    <>
      <div className="container">
        <Form>
          <div className="row">
            <div className="container-fluid col-6">
              <FormGroup>
                <Label for="exampleName">Personnel Name</Label>
                <Input
                  type="name"
                  name="personnel_name"
                  id="exampleName"
                  placeholder="Enter personnel name"
                  onChange={(e) => setPersonnel_Name(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSurname">Personnel Surname</Label>
                <Input
                  type="surname"
                  name="personnel_surname"
                  id="exampleSurname"
                  placeholder="Enter personnel surname"
                  onChange={(e) => setPersonnel_Surname(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleBirthday">Personnel Birthday</Label>
                <Input
                  type="date"
                  name="personnel_birthday"
                  id="exampleBirthday"
                  placeholder="Enter personnel birthday"
                  onChange={(e) => setPersonnel_Birthday(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleBirthplace">Personnel Birthplace</Label>
                <Input
                  type="birthplace"
                  name="personnel_birthplace"
                  id="exampleBirthplace"
                  placeholder="Enter personnel birthplace"
                  onChange={(e) => setPersonnel_Birthplace(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="container-fluid col-6">
              <FormGroup>
                <FormLabel>City</FormLabel>
                <Select
                  options={city}
                  placeholder="Select City"
                  onChange={(e) => onChangeCity(e)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>District</FormLabel>
                <Select
                  options={filteredDistrict}
                  placeholder="Select District"
                  isDisabled={selectedDisable}
                  onChange={(e) => onChangeDistrict(e)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Address Type</FormLabel>
                <br />
                <Select
                  className="d-inline-block w-75"
                  options={address_type}
                  placeholder="Select Address Type"
                  onChange={(e) => onChangeAddress_Type(e)}
                />

                <Button variant="primary" onClick={handleShow}>
                  (+)
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title> Add Address Type </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      placeholder="Enter address type"
                      onChange={(e) => setSelectAddress_Type(e)}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={(e) => AddressTypeSave(e)}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </FormGroup>

              <Label for="input">Phone</Label>
              {phone.map((singlePhone, index) => (
                <div key={index} className="phones">
                  <div className="second-division d-inline-block">
                    {phone.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => phoneRemove(index)}
                        className="btn btn-danger "
                      >
                        <span>(-)</span>
                      </button>
                    )}
                  </div>
                  <div className="first-division d-inline-block">
                    <input
                      name="phone"
                      type="text"
                      value={singlePhone.phone}
                      onChange={(e) => phoneChange(e, index)}
                    />
                    {phone.length - 1 === index && phone.length < 50 && (
                      <button
                        type="button"
                        onClick={phoneAdd}
                        className="btn btn-primary "
                      >
                        <span>(+)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button className="btn btn-primary" onClick={(e) => onClickSave(e)}>
            SAVE
          </Button>
        </Form>
        <DataTablePage personnels={personnels} />
      </div>
    </>
  );
}

export default App;
