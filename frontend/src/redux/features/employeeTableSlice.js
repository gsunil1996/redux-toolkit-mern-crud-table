import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    // get employee table data
    data: [],
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,

    // get employee profile
    employeeProfileData: {},
    employeeProfileIsLoading: false,
    employeeProfileIsError: false,
    employeeProfileError: "",
    employeeProfileIsSuccess: false,

    // add employee table data
    employeeAddedData: {},
    employeeAddDataLoading: false,
    employeeAddedDataIsError: false,
    employeeAddedDataError: "",
    employeeAddedDataIsSuccess: false,

    // edit employee table data
    employeeEditedData: {},
    employeeEditDataLoading: false,
    employeeEditDataIsError: false,
    employeeEditDataError: "",
    employeeEditDataIsSuccess: false,

    // delete employee table data
    employeeDeletedData: {},
    employeeDeleteDataLoading: false,
    employeeDeleteDataIsError: false,
    employeeDeleteDataError: "",
    employeeDeleteDataIsSuccess: false,
}

export const getEmployeeTableData = createAsyncThunk('employeeTable/getTable', async (payload) => {
    // console.log("Inside entered action");

    const { search, gender, status, sort, page } = payload
    const response = await axios.get(`http://localhost:5000/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`);

    // console.log("Inside action response", response);

    return response.data
})

export const getEmployeeProfileData = createAsyncThunk('employeeTable/getProfile', async ({ id }) => {

    // console.log("Inside entered action");

    const response = await axios.get(`http://localhost:5000/employeesTable/${id}`);

    // console.log("Inside action response", response);

    return response.data
})

export const addEmployeeTableData = createAsyncThunk('employeeTable/addEmployee', async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { data, employeeData } = payload;

    const response = await axios.post(`http://localhost:5000/addEmployee`, data);

    // console.log("Inside action response", response);

    dispatch(getEmployeeTableData(employeeData))


    return response.data
})


export const editEmployeeTableData = createAsyncThunk('employeeTable/editEmployee', async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { tableRowId, data, employeeData } = payload;

    const response = await axios.patch(`http://localhost:5000/updateEmployeeDetails/${tableRowId}`, data);

    // console.log("Inside action response", response);

    dispatch(getEmployeeTableData(employeeData))

    return response.data
})

export const deleteEmployeeTableData = createAsyncThunk('employeeTable/deleteEmployee', async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { tableRowId, employeeData } = payload;

    const response = await axios.delete(`http://localhost:5000/deleteEmployee/${tableRowId}`)

    // console.log("Inside action response", response);

    dispatch(getEmployeeTableData(employeeData))

    return response.data
})

export const employeeTableSlice = createSlice({
    name: "employeeTable",
    initialState,
    reducers: {
        resetEmployeeProfile(state, action) {
            state.employeeProfileData = {};
            state.employeeProfileIsLoading = false;
            state.employeeProfileIsError = false;
            state.employeeProfileError = "";
            state.employeeProfileIsSuccess = false;
        },
        resetAddEmployee(state, action) {
            state.employeeAddedData = {};
            state.employeeAddDataLoading = false;
            state.employeeAddedDataIsError = false;
            state.employeeAddedDataError = "";
            state.employeeAddedDataIsSuccess = false;
        },
        resetEditEmployee(state, action) {
            state.employeeEditedData = {};
            state.employeeEditDataLoading = false;
            state.employeeEditDataIsError = false;
            state.employeeEditDataError = "";
            state.employeeEditDataIsSuccess = false;
        },
        resetDeleteEmployee(state, action) {
            state.employeeDeletedData = {};
            state.employeeDeleteDataLoading = false;
            state.employeeDeleteDataIsError = false;
            state.employeeDeleteDataError = "";
            state.employeeDeleteDataIsSuccess = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getEmployeeTableData.pending, (state, action) => {
                // console.log("Inside pending", action)
                state.data = [];
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.isSuccess = false;
            })
            .addCase(getEmployeeTableData.fulfilled, (state, action) => {
                // console.log("Inside fulfilled", action)

                state.data = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.isSuccess = true;

                // console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(getEmployeeTableData.rejected, (state, action) => {
                // console.log("Inside error", action)

                state.data = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.isSuccess = false;

                // console.log("Inside error payload", action.meta.arg)
            })
            .addCase(getEmployeeProfileData.pending, (state, action) => {
                // console.log("Inside pending", action)
                state.employeeProfileData = {};
                state.employeeProfileIsLoading = true;
                state.employeeProfileIsError = false;
                state.employeeProfileError = "";
                state.employeeProfileIsSuccess = false;
            })
            .addCase(getEmployeeProfileData.fulfilled, (state, action) => {
                // console.log("Inside fulfilled", action)

                state.employeeProfileData = action.payload;
                state.employeeProfileIsLoading = false;
                state.employeeProfileIsError = false;
                state.employeeProfileError = "";
                state.employeeProfileIsSuccess = true;

                // console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(getEmployeeProfileData.rejected, (state, action) => {
                // console.log("Inside error", action)

                state.employeeProfileData = {};
                state.employeeProfileIsLoading = false;
                state.employeeProfileIsError = true;
                state.employeeProfileError = action.error.message;
                state.employeeProfileIsSuccess = false;

                // console.log("Inside error payload", action.meta.arg)
            })
            .addCase(addEmployeeTableData.pending, (state, action) => {
                // console.log("Inside pending", action)

                state.employeeAddedData = {};
                state.employeeAddDataLoading = true;
                state.employeeAddedDataIsError = false;
                state.employeeAddedDataError = "";
                state.employeeAddedDataIsSuccess = false;

            })
            .addCase(addEmployeeTableData.fulfilled, (state, action) => {
                // console.log("Inside fulfilled", action)

                state.employeeAddedData = action.payload;
                state.employeeAddDataLoading = false;
                state.employeeAddedDataIsError = false;
                state.employeeAddedDataError = "";
                state.employeeAddedDataIsSuccess = true;

                const { setSuccessMessage, setFailureMessage, handleAddEmployeeClose, handleNotificationClickOpen, setCurrentPage } = action.meta.arg;
                setSuccessMessage("User Added Successully");
                setFailureMessage("");
                handleAddEmployeeClose();
                handleNotificationClickOpen();
                sessionStorage.setItem("employeePage", 1)
                setCurrentPage(1)
                // console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(addEmployeeTableData.rejected, (state, action) => {
                // console.log("Inside error", action)

                state.employeeAddedData = {};
                state.employeeAddDataLoading = false;
                state.employeeAddedDataIsError = true;
                state.employeeAddedDataError = action.error.message;
                state.employeeAddedDataIsSuccess = false;

                const { setSuccessMessage, setFailureMessage, handleNotificationClickOpen } = action.meta.arg;
                setSuccessMessage("");
                setFailureMessage(action.error.message);
                handleNotificationClickOpen();

                // console.log("Inside error payload", action.meta.arg)
            })
            .addCase(editEmployeeTableData.pending, (state, action) => {
                // console.log("Inside pending", action)

                state.employeeEditedData = {};
                state.employeeEditDataLoading = true;
                state.employeeEditDataIsError = false;
                state.employeeEditDataError = "";
                state.employeeEditDataIsSuccess = false;

            })
            .addCase(editEmployeeTableData.fulfilled, (state, action) => {
                // console.log("Inside fulfilled", action)

                state.employeeEditedData = action.payload;
                state.employeeEditDataLoading = false;
                state.employeeEditDataIsError = false;
                state.employeeEditDataError = "";
                state.employeeEditDataIsSuccess = true;

                const { setSuccessMessage, setFailureMessage, handleEditEmployeeClose, handleNotificationClickOpen } = action.meta.arg;
                setSuccessMessage("User Edited Successully");
                setFailureMessage("");
                handleEditEmployeeClose();
                handleNotificationClickOpen();

                // console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(editEmployeeTableData.rejected, (state, action) => {
                // console.log("Inside error", action)

                state.employeeEditedData = {};
                state.employeeEditDataLoading = false;
                state.employeeEditDataIsError = true;
                state.employeeEditDataError = action.error.message;
                state.employeeEditDataIsSuccess = false;

                const { setSuccessMessage, setFailureMessage, handleNotificationClickOpen } = action.meta.arg;
                setSuccessMessage("");
                setFailureMessage(action.error.message);
                handleNotificationClickOpen();

                // console.log("Inside error payload", action.meta.arg)
            })
            .addCase(deleteEmployeeTableData.pending, (state, action) => {
                // console.log("Inside pending", action)

                state.employeeDeletedData = {};
                state.employeeDeleteDataLoading = true;
                state.employeeDeleteDataIsError = false;
                state.employeeDeleteDataError = "";
                state.employeeDeleteDataIsSuccess = false;
            })
            .addCase(deleteEmployeeTableData.fulfilled, (state, action) => {
                // console.log("Inside fulfilled", action)

                state.employeeDeletedData = action.payload;
                state.employeeDeleteDataLoading = false;
                state.employeeDeleteDataIsError = false;
                state.employeeDeleteDataError = "";
                state.employeeDeleteDataIsSuccess = true;

                const { setSuccessMessage, setFailureMessage, handleDeleteEmployeeClose, handleNotificationClickOpen, setCurrentPage, page } = action.meta.arg;
                setSuccessMessage("User Deleted Successully");
                setFailureMessage("");
                handleDeleteEmployeeClose();
                handleNotificationClickOpen();
                sessionStorage.setItem("employeePage", page)
                setCurrentPage(page)
                // console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(deleteEmployeeTableData.rejected, (state, action) => {
                // console.log("Inside error", action)

                state.employeeDeletedData = {};
                state.employeeDeleteDataLoading = false;
                state.employeeDeleteDataIsError = true;
                state.employeeDeleteDataError = action.error.message;
                state.employeeDeleteDataIsSuccess = true;

                const { setSuccessMessage, setFailureMessage, handleNotificationClickOpen } = action.meta.arg;
                setSuccessMessage("");
                setFailureMessage(action.error.message);
                handleNotificationClickOpen();

                // console.log("Inside error payload", action.meta.arg)
            })
    }
})

// get employee table
export const getEmployeesTable = state => state.employees.data;
// in above state = initial state , employees = in store reducer name, data = element in initial state

export const employeesTableDataLoading = state => state.employees.isLoading;
export const employeesTableErrorStatus = state => state.employees.isError;
export const employeesTableError = state => state.employees.error;
export const employeesTableSuccess = state => state.employees.isSuccess;

// get employee profile
export const getEmployeeProfile = state => state.employees.employeeProfileData;
export const employeeProfileLoading = state => state.employees.employeeProfileIsLoading;
export const employeeProfileErrorStatus = state => state.employees.employeeProfileIsError;
export const employeeProfileError = state => state.employees.employeeProfileError;
export const employeeProfileSuccess = state => state.employees.employeeProfileIsSuccess;

// add employee
export const addEmployeeData = state => state.employees.employeeAddedData;
export const addEmployeeLoading = state => state.employees.employeeAddDataLoading;
export const addEmployeeErrorStatus = state => state.employees.employeeAddedDataIsError;
export const addEmployeeError = state => state.employees.employeeAddedDataError;
export const addEmployeeSuccess = state => state.employees.employeeAddedDataIsSuccess;

// edit employee
export const editEmployeeData = state => state.employees.employeeEditedData;
export const editEmployeeLoading = state => state.employees.employeeEditDataLoading;
export const editEmployeeErrorStatus = state => state.employees.employeeEditDataIsError;
export const editEmployeeError = state => state.employees.employeeEditDataError;
export const editEmployeeSuccess = state => state.employees.employeeEditDataIsSuccess;

// delete employee
export const deletedEmployeeData = state => state.employees.employeeDeletedData;
export const deleteEmployeeLoading = state => state.employees.employeeDeleteDataLoading;
export const deleteEmployeeErrorStatus = state => state.employees.employeeDeleteDataIsError;
export const deleteEmployeeError = state => state.employees.employeeDeleteDataError;
export const deleteEmployeeSuccess = state => state.employees.employeeDeleteDataIsSuccess;


export const { resetAddEmployee, resetEditEmployee, resetDeleteEmployee, resetEmployeeProfile } = employeeTableSlice.actions

export default employeeTableSlice.reducer;