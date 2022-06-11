import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import provinceReducer from '../components/lov/province/lovProvinceSlice';
import cityReducer from '../components/lov/city/lovCitySlice';
import bankAccountReducer from '../components/lov/bank-account/lovBankAccountSlice';
import positionReducer from '../components/lov/position/lovPositionSlice';
import employeesReducer from '../components/employees/employeesSlice';
import employeeReducer from '../components/employee/employeeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    provinces: provinceReducer,
    cities: cityReducer,
    bankAccounts: bankAccountReducer,
    positions: positionReducer,
    employees: employeesReducer,
    employee: employeeReducer,
  },
});
