import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesByProvinceId, selectCities } from './lovCitySlice';

export function LovCity({ changeCityId, selectedCityId, provinceId }) {
  const cities = useSelector(selectCities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesByProvinceId({provinceId: provinceId}));
  }, [selectedCityId, provinceId]);

  const handleSelectCity = (e) => {
    changeCityId(e.target.value)
  }

  return (
    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
      <Form.Label>City address</Form.Label>
        <Form.Select required defaultValue={selectedCityId ? selectedCityId : ''} onChange={e => handleSelectCity(e)} disabled={provinceId === null ? true : false}>
          <option disabled={!provinceId} hidden value='' key={-1}>Select {!provinceId ? 'Province' : 'City'}</option>
          {
            (((!cities || cities.status === 'loading') && <option>Loading...</option>)
            || (cities && 
                  cities.content.map(city => (
                    <option
                      key={`city-item${city.id}`}
                      value={city.id}
                      selected={selectedCityId === city.id}
                    >
                      {city.name}
                    </option>
          ))))}
        </Form.Select>
    </Form.Group>
  );
};
