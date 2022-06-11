import { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { LovProvince } from '../lov/province/LovProvince';
import { LovCity } from '../lov/city/LovCity';
import { LovPosition } from "../lov/position/LovPosition";
import { LovBankAccount } from "../lov/bank-account/LovBankAccount";
import { postEmployee } from "../employee/employeeAPI";
import { getBase64 } from '../../utils/fileUtil';

export function ModalAddEmployee({ show, closeModal }) {
  const [validated, setValidated] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null)
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [selectedPositionId, setSelectedPositionId] = useState(null)
  const [selectedBankAccountId, setSelectedBankAccountId] = useState(null)
  const [ktpFile, setKtpFile] = useState(null)
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const dateOfBirthRef = useRef()
  const phoneNumberRef = useRef()
  const emailAddressRef = useRef()
  const streetAddressRef = useRef()
  const zipCodeRef = useRef()
  const ktpNumberRef = useRef()
  const bankAccountNumberRef = useRef()

  const changeProvinceId = (id) => {
    setSelectedProvinceId(id)
  }
  const changeCityId = (id) => {
    setSelectedCityId(id)
  }
  const changePositionId = (id) => {
    setSelectedPositionId(id)
  }
  const changeBankAccountId = (id) => {
    setSelectedBankAccountId(id)
  }

  const handleClose = () => {
    setSelectedProvinceId(null)
    closeModal()
  }

  const handleFileInputChange = e => {
    const file = e.target.files[0]

    getBase64(file)
      .then(result => {
        file["base64"] = result
        setKtpFile(result.split(',')[1])
      })
      .catch(err => {
        console.log(err)
      });
  };

  const handleSubmit = (event) => {
    console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const postData = async () => {
        await postEmployee({
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          dateOfBirth: dateOfBirthRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          emailAddress: emailAddressRef.current.value,
          province: {
            id: selectedProvinceId
          },
          city: {
            id: selectedCityId
          },
          streetAddress: streetAddressRef.current.value,
          zipCode: zipCodeRef.current.value,
          ktpNumber: ktpNumberRef.current.value,
          ktpFile: ktpFile,
          position: {
            id: selectedPositionId
          },
          bankAccount: {
            id: selectedBankAccountId
          },
          bankAccountNumber: bankAccountNumberRef.current.value,
        });
        handleClose()
      }
    
      postData();
    }

    setValidated(true);
    event.preventDefault();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='md' centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} id='employeeForm' onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    ref={firstNameRef}
                    type="input"
                    placeholder="First Name"
                    autoFocus
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    ref={lastNameRef}
                    type="input"
                    placeholder="Last Name"
                  />
              </Form.Group>
            </Row>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm={4}>Date of Birth</Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  ref={dateOfBirthRef}
                  type="date"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm={4}>Phone Number</Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  ref={phoneNumberRef}
                  type="tel"
                  pattern= "[0-9]{7,15}"
                  maxLength={15}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm={4}>Email address</Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  ref={emailAddressRef}
                  type="email"
                  placeholder="name@example.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <LovProvince changeProvinceId={changeProvinceId} selectedProvinceId={selectedProvinceId} />
              <LovCity changeCityId={changeCityId} selectedCityId={selectedCityId} provinceId={selectedProvinceId} />
            </Row>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm={4}>Street Address</Form.Label>
              <Col sm={8}>
                <Form.Control ref={streetAddressRef} as="textarea" rows={3} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm={4}>Zip Code</Form.Label>
              <Col sm={8}>
                <Form.Control
                  ref={zipCodeRef}
                  type="input"
                  pattern= "[0-9]{5}"
                  maxLength={5}
                />
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>KTP Number</Form.Label>
                  <Form.Control
                    required
                    ref={ktpNumberRef}
                    type="input"
                    pattern= "[0-9]{16}"
                    maxLength={16}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Attach KTP</Form.Label>
                <Form.Control
                  required 
                  type="file"
                  onChange={e => handleFileInputChange(e)} 
                />
              </Form.Group>
            </Row>
            <LovPosition changePositionId={changePositionId} selectedPositionId={selectedPositionId} />
            <Row className="mb-3">
              <LovBankAccount changeBankAccountId={changeBankAccountId} selectedBankAccountId={selectedBankAccountId} />
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    ref={bankAccountNumberRef}
                    type="input"
                    pattern= "[0-9]{0,16}"
                    maxLength={16}
                  />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' variant="primary" form='employeeForm'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
