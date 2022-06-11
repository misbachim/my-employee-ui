import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Pagination, Row, Stack, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAddEmployee } from '../employee/ModalAddEmployee';
import { ModalEditEmployee } from '../employee/ModalEditEmployee';
import { EmployeeKtp } from './../employee/EmployeeKtp';
import { ModalDeleteEmployee } from './../employee/ModalDeleteEmployee';
import { getPositions, selectPositions } from './../lov/position/lovPositionSlice';
import { getEmployees, selectEmployees } from './employeesSlice';
import { IconContext } from "react-icons";
import { FaTrash, FaEdit } from './../../../node_modules/react-icons/fa/index.esm';

export default function Employees() {
  const employees = useSelector(selectEmployees);
  const positions = useSelector(selectPositions);
  const dispatch = useDispatch();

  const [filterName, setFilterName] = useState(null)
  const [filterPosition, setFilterPosition] = useState(null)

  const [currentPage, setCurrentPage] = useState(0)

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalKtp, setShowModalKtp] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

  const changePage = (page) => {
    if (page >= 0 && page < employees.totalPages) {
      setCurrentPage(page)
    }
  }

  const closeModalAdd = () => {
    setShowModalAdd(false)
  }
  const handleShowModalAdd = () => setShowModalAdd(true);
  
  const closeModalEdit = () => {
    setSelectedEmployeeId(null)
    setShowModalEdit(false)
  }
  const handleShowModalEdit = (id) => {
    setSelectedEmployeeId(id)
    setShowModalEdit(true);
  }
  
  const closeModalDelete = () => {
    setSelectedEmployeeId(null)
    setShowModalDelete(false)
  }
  const handleShowModalDelete = (id) => {
    setSelectedEmployeeId(id)
    setShowModalDelete(true);
  }
  
  const closeModalKtp = () => {
    setSelectedEmployeeId(null)
    setShowModalKtp(false)
  }
  const handleShowModalKtp = (id) => {
    setSelectedEmployeeId(id)
    setShowModalKtp(true);
  }

  const handleFilterName = (e) => {
    setFilterName(e.target.value)
  }

  const handleFilterPosition = (e) => {
    setFilterPosition(e.target.value)
  }

  useEffect(() => {
    dispatch(getEmployees({ name: filterName, positionId: filterPosition, page: currentPage, size: 5 }));
    dispatch(getPositions());
  }, []);

  useEffect(() => {
    dispatch(getEmployees({ name: filterName, positionId: filterPosition, page: currentPage, size: 5 }));
  }, [currentPage, filterName, filterPosition]);

  useEffect(() => {
    if (!showModalAdd || !showModalEdit || !showModalDelete) {
      dispatch(getEmployees({ name: filterName, positionId: filterPosition, page: currentPage, size: 5 }));
    }
  }, [showModalAdd, showModalEdit, showModalDelete]);

  const GetPagination = () => {
    let pagination = []
    if (currentPage > 3) {
      pagination.push(
        <Pagination.Item 
          disabled
        >
          ...
        </Pagination.Item>
      )
    }
    for (
        let index = currentPage > 3 ? currentPage-2 : 1;
        index < (employees.totalPages-currentPage > 3 ? currentPage+3 : employees.totalPages-1);
        index++) {
      pagination.push(
        <Pagination.Item 
          onClick={() => changePage(index)}
          active={currentPage === index}
        >
          {index+1}
        </Pagination.Item>
      )
    }
    if (employees.totalPages-1 - currentPage > 3) {
      pagination.push(
        <Pagination.Item 
          disabled
        >
          ...
        </Pagination.Item>
      )
    }
    return pagination
  }

  return (
    <>
      <ModalAddEmployee show={showModalAdd} closeModal={closeModalAdd}/>
      <ModalEditEmployee show={showModalEdit} closeModal={closeModalEdit} employeeId={selectedEmployeeId}/>
      <ModalDeleteEmployee show={showModalDelete} closeModal={closeModalDelete} employeeId={selectedEmployeeId}/>
      <EmployeeKtp show={showModalKtp} closeModal={closeModalKtp} employeeId={selectedEmployeeId}/>

      <Container fluid>
        <h1>My Employees</h1>
        
        <Container fluid>
          <h2>Filter</h2>
            <Row direction='horizontal'>
              <Col md={5}>
                <InputGroup className="me-auto">
                  <InputGroup.Text>Name</InputGroup.Text>
                  <Form.Control aria-label="Name" onChange={e => handleFilterName(e)}/>
                  <InputGroup.Text>Position</InputGroup.Text>
                  <Form.Select required defaultValue={''} onChange={e => handleFilterPosition(e)}>
                  <option value='' key={-1}>-- No Filter --</option>
                    {((!positions || positions.status === 'loading') && <option>Loading...</option>)
                    || (positions && (
                          positions.content.map(position => (
                            <option
                              key={`position-item${position.id}`}
                              value={position.id}
                            >
                              {position.name}
                            </option>
                    ))))}
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={{ span: 'auto', offset: 6 }}>
                <Button variant="primary" onClick={handleShowModalAdd}>
                  Add Employee
                </Button>
              </Col>
          </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{textAlign: 'center'}}>Name</th>
                  <th style={{textAlign: 'center'}}>Phone</th>
                  <th style={{textAlign: 'center'}}>Birth</th>
                  <th style={{textAlign: 'center'}}>Address</th>
                  <th style={{textAlign: 'center'}}>Current Position</th>
                  <th style={{textAlign: 'center'}}>KTP File</th>
                  <th style={{textAlign: 'center'}}>Action</th>
                </tr>
              </thead>
              <tbody>
              {((!employees || employees.status === 'loading') && <tr><td colSpan={7} style={{textAlign: 'center'}} >Loading...</td></tr>)
                || (employees && employees.content.length === 0 && <tr><td colSpan={7} style={{textAlign: 'center'}} >Data is empty</td></tr>)
                || (employees && (
                  employees.content.map(employee => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.firstName + ' ' + employee.lastName}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                      <td>{employee.streetAddress}</td>
                      <td>{employee.position.name}</td>
                      <td style={{textAlign: 'center'}} ><Button onClick={e => handleShowModalKtp(employee.id)}>View</Button></td>
                      <td style={{textAlign: 'center'}} >
                        <Stack direction='horizontal' gap={3} className='col-md-5 mx-auto'>
                            <Button onClick={e => handleShowModalEdit(employee.id)}>
                              <FaEdit />
                            </Button>
                            <Button variant="danger" onClick={e => handleShowModalDelete(employee.id)}>
                              <FaTrash />
                            </Button>
                        </Stack>
                      </td>
                    </tr>
                  )
                })))}
              </tbody>
            </Table>
          </Col>

        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Pagination>
              <Pagination.Prev onClick={() => changePage(currentPage-1)}/>
              <Pagination.Item 
                onClick={() => changePage(0)}
                active={currentPage === 0}
              >
                {1}
              </Pagination.Item>
              {
                employees &&
                  <>
                    <GetPagination />
                    <Pagination.Item 
                      onClick={() => changePage(employees.totalPages-1)}
                      active={currentPage === employees.totalPages-1}
                    >
                      {employees.totalPages}
                    </Pagination.Item>
                  </>
              }
              <Pagination.Next onClick={() => changePage(currentPage+1)}/>
            </Pagination>
          </Col>

        </Row>
        </Container>

      </Container>
    </>
  )
}
