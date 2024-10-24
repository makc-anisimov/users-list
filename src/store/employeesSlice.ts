import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import employeesData from '../data/employees.json';
import { IEmployee } from '../types/employee';

interface EmployeesState {
  employees: IEmployee[];
}

const initialState: EmployeesState = {
  employees: employeesData as IEmployee[],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    updateEmployee(state, action: PayloadAction<IEmployee>) {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    addEmployee(state, action: PayloadAction<IEmployee>) {
      state.employees.push(action.payload);
    },
  },
});

export const { updateEmployee, addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
