import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import { api } from "./character";
import { useFormik } from "formik";
import * as yup from "yup";

// vslidationschema

export const formValidationSchema = yup.object({
    post: yup.string()
        .required("Why not fill this post? 😉")
        .min(5, "Need a longer poster 😄"),

    name: yup.string()
        .required("Why not fill this name? 😉")
        .min(1, "Need a longer name 😄"),

    Superpowers: yup.string()
        .required("Why not fill this Superpowers? 😉")
        .min(5),

    Weapons: yup.string()
        .required("Why not fill this weapons? 😉")
        .min(5, "Need a longer description 😄"),


});


export function AddCharacters() {

    const history = useHistory()

    // inital value
    const formik = useFormik({
        initialValues: {
            post: "",
            name: "",
            Superpowers: "",
            Weapons: "",

        },
        validationSchema: formValidationSchema,
        onSubmit: (newCharacter) => addCharacter(newCharacter),
    });

    const addCharacter = (newCharacter) => {
        fetch(`${api}`, {
            method: "POST",
            body: JSON.stringify(newCharacter),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => history.push("/Characters"));
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="character_form">
                    <TextField
                        label="Character Poster(url)"
                        variant="outlined"
                        id="post"
                        name="post"
                        value={formik.values.post}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.post && formik.errors.post}
                        helperText={formik.touched.post && formik.errors.post ? formik.errors.post : ""}

                    />
                    <TextField
                        label="Character Name"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.name && formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    />
                    <TextField
                        label="Character Superpowers"
                        id="Superpowers"
                        name="Superpowers"
                        value={formik.values.Superpowers}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.Superpowers && formik.errors.Superpowers}
                        helperText={formik.touched.Superpowers && formik.errors.Superpowers ? formik.errors.Superpowers : ""}
                    />
                    <TextField
                        label="Character Weapons"
                        id="Weapons"
                        name="Weapons"
                        value={formik.values.Weapons}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.Weapons && formik.errors.Weapons}
                        helperText={formik.touched.Weapons && formik.errors.Weapons ? formik.errors.Weapons : ""}
                    />

                    <Button variant="contained" className="button" type="submit" >
                        Add Character
                    </Button>

                </div>
            </form>

        </div>
    );
}