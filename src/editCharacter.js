import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { api } from "./character";
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from "formik";
import { formValidationSchema } from "./addCharacters";

export function EditCharacter() {

    const { id } = useParams();

    const [character, setcharacter] = useState(null);

    useEffect(() => {
        fetch(`${api}/${id}`)
            .then(data => data.json())
            .then((character) => setcharacter(character))
    }, [id]);

    return (
        <div>{character ? <CharacterForm character={character} /> : <h2 className="edit-loadmsg"> Loading... <CircularProgress /></h2>} </div>
    );
}

function CharacterForm({ character }) {
    const history = useHistory()

    const formik = useFormik({

        initialValues: {
            post: character.post,
            name: character.name,
            Superpowers: character.Superpowers,
            Weapons: character.Weapons

        },
        validationSchema: formValidationSchema,
        onSubmit: (editedcharacter) => editcharacter(editedcharacter),
    });

    const editcharacter = (editedcharacter) => {
        fetch(`${api}/${character.id}`, {
            method: "PUT",
            body: JSON.stringify(editedcharacter),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => history.push("/characters"));
    }


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="character_form">
                    <TextField
                        label="character Poster(url)"
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
                        label="character Name"
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
                        label="character Superpowers"
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
                        label="character Weapons"
                        id="Weapons"
                        name="Weapons"
                        value={formik.values.Weapons}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.Weapons && formik.errors.Weapons}
                        helperText={formik.touched.Weapons && formik.errors.Weapons ? formik.errors.Weapons : ""}
                    />

                    <Button variant="contained" color="success" className="button" type="submit" >
                        Save
                    </Button>

                </div>
            </form>

        </div>
    )
}