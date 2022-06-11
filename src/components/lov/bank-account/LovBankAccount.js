import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccounts, selectBankAccounts } from './lovBankAccountSlice';

export function LovBankAccount({ changeBankAccountId, selectedBankAccountId }) {
  const bankAccounts = useSelector(selectBankAccounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankAccounts());
  }, [selectedBankAccountId]);

  const handleSelectBankAccount = (e) => {
    changeBankAccountId(e.target.value)
  }

  return (
    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Bank Account</Form.Label>
        <Form.Select required defaultValue={selectedBankAccountId ? selectedBankAccountId : ''} onChange={e => handleSelectBankAccount(e)}>
        <option disabled hidden value='' key={-1}>Select Bank Account</option>
          {((!bankAccounts || bankAccounts.status === 'loading') && <option>Loading...</option>)
          || (bankAccounts && (
                bankAccounts.content.map(bankAccount => (
                  <option
                    key={`bank-account-item${bankAccount.id}`}
                    value={bankAccount.id}
                    selected={selectedBankAccountId === bankAccount.id}
                  >
                    {bankAccount.name}
                  </option>
          ))))}
        </Form.Select>
    </Form.Group>
  );
};
