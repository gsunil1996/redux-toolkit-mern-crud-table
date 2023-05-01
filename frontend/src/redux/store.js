import { configureStore } from "@reduxjs/toolkit";
import employeeTableReducer from "./features/employeeTableSlice";
import companyTableReducer from "./features/companiesTableSlice";


export const store = configureStore({
    reducer: {
        employees: employeeTableReducer,
        companies: companyTableReducer
    }
})