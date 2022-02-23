import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from "@mui/material/Badge";
import { useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const api = "https://6209ed8f92946600171c55c2.mockapi.io/character"

export function CharacterList() {
    const history = useHistory()
    const [character, setcharacter] = useState([]);

    const getcharacter = () => {

        fetch(`${api}`, {
            method: "GET"
        })
            .then(data => data.json())
            .then((character) => setcharacter(character))

    }

    useEffect(() => getcharacter(), []);

    const deleteCharacter = (id) => {
        fetch(`${api}/${id}`, {
            method: "DELETE"
        }).then(() => getcharacter())
    }

    return (
        <div className="card-container">
            {character.map(
                ({ post, name, Superpowers, Weapons, id }, index) => (
                    <Character
                        key={index}
                        name={name}
                        post={post}
                        Superpowers={Superpowers}
                        Weapons={Weapons}
                        // delete
                        deleteButton={

                            <Tooltip title="Delete">

                                <IconButton aria-label="delete"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => {
                                        deleteCharacter(id)
                                    }}
                                    color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        }
                        editButton={
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit button"
                                    onClick={() => history.push(`./characters/edit/${id}`)}
                                    color="secondary">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                        }
                        id={id}

                    />
                )
            )}
        </div>
    );
}
function Character({ post, name, Superpowers, Weapons, deleteButton, editButton }) {


    return (
        <Card className="cards">

            <img src={post} className="img" alt="IMG" />
            <CardContent>
                <div className="cardtitle"> {name} </div>
                <div >
                    <span className=" sub-title">Superpowers: </span>
                    <span className="pfont ">{Superpowers}</span>
                </div>
                <div>
                    <span className=" sub-title">Weapons: </span>
                    <span className="pfont"> {Weapons}</span>
                </div>

            </CardContent>

            <Counter deleteBtn={deleteButton} editButton={editButton} />


        </Card>
    );
}

function Counter({ deleteBtn, editButton }) {
    const [like, setLike] = useState(0);
    const [unlike, setunLike] = useState(0);
    return (
        <div className="button-group">
            <IconButton
                color="primary"
                className="btn1"
                onClick={() => setLike(like + 1)}
            >
                <Badge badgeContent={like} color="secondary">
                    👍
                </Badge>
            </IconButton>

            <IconButton
                color="primary"
                className="btn"
                onClick={() => setunLike(unlike + 1)}
            >
                <Badge badgeContent={unlike} color="error">
                    👎
                </Badge>
            </IconButton>
            {/* delete btn and edit btn */}
            {deleteBtn} {editButton}
        </div>
    );
}