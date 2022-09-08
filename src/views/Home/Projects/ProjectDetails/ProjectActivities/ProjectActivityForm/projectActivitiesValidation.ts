import * as Yup from "yup";

export const projectActivitiesValidation = Yup.object().shape({
    contentEnglish: Yup.string().required("Description is required"),
    contentTamil: Yup.string().required("Description in tamil is required"),
})