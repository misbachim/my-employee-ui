import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { LovProvince } from '../lov/province/LovProvince';
import { LovCity } from '../lov/city/LovCity';
import { LovPosition } from "../lov/position/LovPosition";
import { LovBankAccount } from "../lov/bank-account/LovBankAccount";
import { getBase64 } from '../../utils/fileUtil';
import { useDispatch, useSelector } from "react-redux";
import { 
  getEmployee,
  setFirstName,
  setLastName,
  setDateOfBirth,
  setPhoneNumber,
  setEmailAddress,
  setProvince,
  setCity,
  setStreetAddress,
  setZipCode,
  setKtpNumber,
  setKtpFile,
  setPosition,
  setBankAccount,
  setBankAccountNumber, 
  selectEmployee,
  editEmployee,
} from "./employeeSlice";

export function ModalEditEmployee({ show, closeModal, employeeId }) {
  const [validated, setValidated] = useState(false);
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();

  useEffect(() => {
    setValidated(false)
    if (show && employeeId) {
      dispatch(getEmployee({payload: employeeId}));
    }
  }, [employeeId])
  
  const changeProvinceId = (id) => {
    dispatch(setProvince({ id: id }))
  }
  const changeCityId = (id) => {
    dispatch(setCity({ id: id }))
  }
  const changePositionId = (id) => {
    dispatch(setPosition({ id: id }))
  }
  const changeBankAccountId = (id) => {
    dispatch(setBankAccount({ id: id }))
  }

  const handleClose = () => {
    closeModal()
  }

  const handleFileInputChange = e => {
    const file = e.target.files[0]

    getBase64(file)
      .then(result => {
        file["base64"] = result
        dispatch(setKtpFile(result.split(',')[1]))
      })
      .catch(err => {
        console.log(err)
      });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      const updateData = async () => {
         await dispatch(editEmployee({payload: employee}))
         handleClose()
        }
    
      updateData();
    }

    setValidated(true)
    event.preventDefault()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='md' centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {((!employee || employee.status === 'loading') && <h1>Loading...</h1>)
            || (employee && (
                <Form noValidate validated={validated} id='employeeForm' onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                      <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          onChange={e => dispatch(setFirstName(e.target.value))}
                          type="input"
                          placeholder="First Name"
                          autoFocus
                          value={employee.firstName}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                      <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          onChange={e => dispatch(setLastName(e.target.value))}
                          type="input"
                          placeholder="Last Name"
                          value={employee.lastName}
                        />
                    </Form.Group>
                  </Row>
                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label column sm={4}>Date of Birth</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        required
                        onChange={e => dispatch(setDateOfBirth(e.target.value))}
                        type="date"
                        value={employee.dateOfBirth}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label column sm={4}>Phone Number</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        required
                        onChange={e => dispatch(setPhoneNumber(e.target.value))}
                        type="tel"
                        value={employee.phoneNumber}
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
                        onChange={e => dispatch(setEmailAddress(e.target.value))}
                        type="email"
                        placeholder="name@example.com"
                        value={employee.emailAddress}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      />
                    </Col>
                  </Form.Group>
                  <Row className="mb-3">
                    <LovProvince changeProvinceId={changeProvinceId} selectedProvinceId={employee.province.id} />
                    <LovCity changeCityId={changeCityId} selectedCityId={employee.city.id} provinceId={employee.province.id} />
                  </Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label column sm={4}>Street Address</Form.Label>
                    <Col sm={8}>
                      <Form.Control 
                        onChange={e => dispatch(setStreetAddress(e.target.value))} 
                        as="textarea" 
                        rows={3}
                        value={employee.streedAddress} 
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label column sm={4}>Zip Code</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        onChange={e => dispatch(setZipCode(e.target.value))}
                        type="input"
                        value={employee.zipCode}
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
                          onChange={e => dispatch(setKtpNumber(e.target.value))}
                          type="input"
                          value={employee.ktpNumber}
                          pattern= "[0-9]{16}"
                          maxLength={16}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                      <Form.Label>Attach KTP</Form.Label>
                      <Form.Control 
                        type="file"
                        onChange={e => handleFileInputChange(e)}
                      />
                    </Form.Group>
                  </Row>
                  <LovPosition changePositionId={changePositionId} selectedPositionId={employee.position.id} />
                  <Row className="mb-3">
                    <LovBankAccount changeBankAccountId={changeBankAccountId} selectedBankAccountId={employee.bankAccount.id} />
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                      <Form.Label>Bank Account Number</Form.Label>
                        <Form.Control
                          onChange={e => dispatch(setBankAccountNumber(e.target.value))}
                          type="input"
                          value={employee.bankAccountNumber}
                          pattern= "[0-9]{0,16}"
                          maxLength={16}
                        />
                    </Form.Group>
                  </Row>
                </Form>
            ))}
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
