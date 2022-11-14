import React, { useMemo, useState } from "react";
import {
  TextField,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";

const HomePage = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getProjects = useMemo(() => {
    if (!searchTerm) {
      return projects;
    }

    return projects.filter(({ name, description }) =>
      [name, description].join(" ").toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]);

  const handleChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  return (
    <>
      <TextField
        value={searchTerm}
        onChange={handleChange}
        label="Search projects"
        type="search"
        sx={{ pb: 2, width: "100%" }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getProjects.map(({ id, name, description, owner }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{owner}</TableCell>
                <TableCell>
                  <Link to={`/project/${id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = ({ projects }) => ({ projects });

export default connect(mapStateToProps)(HomePage);
