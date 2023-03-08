import * as Yup from "yup";

export const NoteSchema = Yup.object().shape({
	body: Yup.string().required("Note can't be empty!").min(2),
});
