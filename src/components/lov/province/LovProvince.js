import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProvinces, selectProvinces } from './lovProvinceSlice';

export function LovProvince({ changeProvinceId, selectedProvinceId }) {
  const provinces = useSelector(selectProvinces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvinces());
  }, [selectedProvinceId]);

  const handleSelectProvince = (e) => {
    changeProvinceId(e.target.value)
  }

  return (
    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
      <Form.Label>Province address</Form.Label>
        <Form.Select required defaultValue={selectedProvinceId ? selectedProvinceId : ''} onChange={e => handleSelectProvince(e)}>
        <option disabled hidden value='' key={-1}>Select Province</option>
          {((!provinces || provinces.status === 'loading') && <option>Loading...</option>)
          || (provinces && (
                provinces.content.map(province => (
                  <option
                    key={`province-item${province.id}`}
                    value={province.id}
                    selected={selectedProvinceId === province.id}
                  >
                    {province.name}
                  </option>
          ))))}
        </Form.Select>
    </Form.Group>
  );
};
