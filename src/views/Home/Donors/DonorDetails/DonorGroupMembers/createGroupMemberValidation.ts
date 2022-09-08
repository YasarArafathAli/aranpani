import * as Yup from "yup";

export const createGroupMemberValidation = Yup.object().shape({
    username: Yup.string().required("Name is required")
})