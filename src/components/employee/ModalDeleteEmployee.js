import { Button, Modal } from 'react-bootstrap';
import { deleteEmployee } from "./employeeAPI";

export function ModalDeleteEmployee({ show, closeModal, employeeId }) {
  const handleClose = () => {
    closeModal()
  }

  const handleDelete = () => {
    const deleteData = async () => {
       await deleteEmployee(employeeId);
       closeModal()
      }
  
    deleteData();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='md' centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this data?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
