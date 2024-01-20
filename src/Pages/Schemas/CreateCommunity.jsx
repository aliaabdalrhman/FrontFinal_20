import * as Yup from 'yup';

export const CreateCommunitySchema=Yup.object({
    propertyD:Yup.string().required("Properety is required"),
    valueD:Yup.string().required("valueType is required"),
});
