import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useStore, useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  insertProject,
  editProject,
  projectsSelector,
} from "../store/slices/projects";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = useSelector(projectsSelector(id));

  const store = useStore();
  const dispatch = useDispatch();
  const { users } = store.getState();

  const [formData, setFormData] = useState({
    id,
    name: project?.name || "",
    description: project?.description || "",
    owner: project?.owner || 0,
  });

  const { id: _, ...validableData } = formData;

  const isFormInvalid = () => !Object.values(validableData).every(Boolean);

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(id ? editProject(formData) : insertProject(formData));
    navigate("/");
  };

  return (
    <Grid container component="form" direction="column" maxWidth="xl">
      <Typography variant="h6" noWrap mb={4}>
        {id ? `Editing Project ${id}` : "Creating Project"}
      </Typography>
      <TextField
        type="text"
        label="Name"
        name="name"
        variant="outlined"
        value={formData.name}
        sx={{ pb: 1 }}
        onChange={handleChange}
        required
      />
      <TextField
        type="text"
        value={formData.description}
        name="description"
        label="Description"
        variant="outlined"
        sx={{ my: 1 }}
        onChange={handleChange}
        required
      />
      <InputLabel id="user-name">Project Owner</InputLabel>
      <Select
        labelId="user-name"
        value={formData.owner}
        name="owner"
        label="Owner"
        onChange={handleChange}
        required
      >
        <MenuItem value="0" disabled selected>
          Select the project owner
        </MenuItem>
        {users.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        disabled={isFormInvalid()}
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Save Project
      </Button>
    </Grid>
  );
};

export default ProjectPage;
