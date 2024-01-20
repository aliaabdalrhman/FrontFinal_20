import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    userName: Yup.string().required("UserName is required").min(3, "min is 3 char").max(10, "max is 10 char"),
    lastName: Yup.string().required("UserName is required").min(3, "min is 3 char").max(10, "max is 10 char"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/),
});
