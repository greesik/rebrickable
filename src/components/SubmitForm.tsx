import React from "react";
import {
    Formik,
    Form as FormikForm,
    Field as FormikField,
    ErrorMessage as FormikErrorMessage,
} from "formik";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface Errors {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    birthday?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
}

const PHONE_REGEX = /^\d{9}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const BIRTHDAY_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const ZIP_CODE_REGEX = /^\d{5}$/;

export const SubmitForm = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                name: "",
                surname: "",
                phone: "",
                email: "",
                birthday: "",
                address: "",
                city: "",
                state: "",
                zip: "",
            }}
            validate={(values) => {
                const errors: Errors = {};
                if (!values.name) {
                    errors.name = "Required";
                }
                if (!values.surname) {
                    errors.surname = "Required";
                }
                if (!values.phone) {
                    errors.phone = "Required";
                } else if (!PHONE_REGEX.test(values.phone)) {
                    errors.phone = "Invalid phone number";
                }
                if (!values.email) {
                    errors.email = "Required";
                } else if (!EMAIL_REGEX.test(values.email)) {
                    errors.email = "Invalid email address";
                }
                if (!values.birthday) {
                    errors.birthday = "Required";
                } else if (!BIRTHDAY_REGEX.test(values.birthday)) {
                    errors.birthday = "Invalid birthday format (YYYY-MM-DD)";
                }
                if (!values.address) {
                    errors.address = "Required";
                }
                if (!values.city) {
                    errors.city = "Required";
                }
                if (!values.state) {
                    errors.state = "Required";
                }
                if (!values.zip) {
                    errors.zip = "Required";
                } else if (!ZIP_CODE_REGEX.test(values.zip)) {
                    errors.zip = "Invalid zip code";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                axios
                    .post("https://fake-rest-api.com/post", values)
                    .then((res) => {
                        console.log(res);
                        setSubmitting(false);
                        navigate("/");
                    })
                    .catch((err) => {
                        console.error(err);
                        setSubmitting(false);
                        navigate("/");
                    });
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Row>
                        <Column>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage name="name" component="div" />
                        </Column>
                        <Column>
                            <Field
                                type="text"
                                name="surname"
                                placeholder="Surname"
                            />
                            <ErrorMessage name="surname" component="div" />
                        </Column>
                    </Row>
                    <Field
                        type="phone"
                        name="phone"
                        placeholder="Phone (9 digits)"
                    />
                    <ErrorMessage name="phone" component="div" />
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="text" name="birthday" placeholder="Birthday" />
                    <ErrorMessage name="birthday" component="div" />
                    <Field type="text" name="address" placeholder="Address" />
                    <ErrorMessage name="address" component="div" />
                    <Field type="text" name="city" placeholder="City" />
                    <ErrorMessage name="city" component="div" />
                    <Row>
                        <Column>
                            <Field
                                type="text"
                                name="state"
                                placeholder="State"
                            />
                            <ErrorMessage name="state" component="div" />
                        </Column>
                        <Column>
                            <Field
                                type="text"
                                name="zip"
                                placeholder="Zip code (no dash)"
                            />
                            <ErrorMessage name="zip" component="div" />
                        </Column>
                    </Row>

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            !Object.values(touched).some(Boolean) ||
                            Object.values(errors).length > 0
                        }
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

const ErrorMessage = styled(FormikErrorMessage)`
    color: red;
    width: 100%;
    text-align: left;
    transition: all 0.2s ease-in-out;
`;

const Button = styled("button")`
    color: white;
    background: dodgerblue;
    padding: 8px 12px;
    border-radius: 10px;
    &:disabled {
        background: grey;
    }
    &:hover {
        cursor: pointer;
    }
`;

const Row = styled("div")`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Column = styled("div")`
    display: flex;
    flex-direction: column;
`;

const Form = styled(FormikForm)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    width: 25%;
    min-height: 25rem;
    justify-content: space-between;
`;

const Field = styled(FormikField)`
    width: 100%;
    height: 40px;
    border-radius: 7px;
    border: 1px solid black;
    padding-left: 10px;
    box-sizing: border-box;
`;
