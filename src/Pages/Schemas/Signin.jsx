import * as Yup from 'yup';

export const SignInSchema=Yup.object({
    email:Yup.string().required("email is required").email("not valid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/),
});
