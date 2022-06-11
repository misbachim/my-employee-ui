import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPositions, selectPositions } from './lovPositionSlice';

export function LovPosition({ changePositionId, selectedPositionId }) {
  const positions = useSelector(selectPositions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [selectedPositionId]);

  const handleSelectPosition = (e) => {
    changePositionId(e.target.value)
  }

  return (
    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label column sm={4}>Current Position</Form.Label>
      <Col sm={8}>
        <Form.Select required defaultValue={selectedPositionId ? selectedPositionId : ''} onChange={e => handleSelectPosition(e)}>
        <option disabled hidden value='' key={-1}>Select Position</option>
          {((!positions || positions.status === 'loading') && <option>Loading...</option>)
          || (positions && (
                positions.content.map(position => (
                  <option
                    key={`position-item${position.id}`}
                    value={position.id}
                    selected={selectedPositionId === position.id}
                  >
                    {position.name}
                  </option>
          ))))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};
