import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { employeeProfileError, employeeProfileErrorStatus, employeeProfileLoading, employeeProfileSuccess, getEmployeeProfile, getEmployeeProfileData } from "../../redux/features/employeeTableSlice";

const EmployeesProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const data = useSelector(getEmployeeProfile);
    const isLoading = useSelector(employeeProfileLoading);
    const isError = useSelector(employeeProfileErrorStatus);
    const error = useSelector(employeeProfileError);
    const isSuccess = useSelector(employeeProfileSuccess);

    useEffect(() => {
        dispatch(getEmployeeProfileData({ id }));
    }, [dispatch, id]);

    return isLoading ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <CircularProgress />
        </div>
    ) : isError ? (
        <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
            <h1>{error}</h1>
        </div>
    ) : isSuccess ? (
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "max-content", margin: "auto" }}>
                    <Card variant="outlined" style={{ marginTop: "20px" }}>
                        <CardContent>
                            <div>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3>{data?.fname + " " + data?.lname}</h3>
                                <h4>Email: {data?.email}</h4>
                                <h5>Phone Number: {data?.mobile}</h5>
                                <h4>Gender: {data?.gender}</h4>
                                <h4>Location: {data?.location}</h4>
                                <h4>Status: {data?.status}</h4>
                                <h5>
                                    Date Created:-
                                    {moment(data?.datecreated).format("DD-MM-YYYY")}
                                </h5>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    ) : ""
}

export default EmployeesProfile