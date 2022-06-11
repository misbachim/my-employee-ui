import { useEffect, useState } from "react";
import { Button, Image, Modal, } from 'react-bootstrap';
import { fetchEmployeeKtp } from "./employeeAPI";

export function EmployeeKtp({ show, closeModal, employeeId }) {
  const [ktp, setKtp] = useState(null)

  useEffect(() => {
    setKtp(null)
    if (show && employeeId) {
      const fetchData = async () => {
         const data = await fetchEmployeeKtp(employeeId);
         setKtp(data);
        }
    
      fetchData();
    }
  }, [employeeId])
  
  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='md' centered>
        <Modal.Header closeButton>
          <Modal.Title>View KTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ktp && 
            <Image 
              src={`data:image/png;base64,${ktp}`}
              fluid
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
