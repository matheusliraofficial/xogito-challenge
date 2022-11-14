import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";

export const HeaderItem = ({ children, path }) => (
  <MenuItem component={Link} to={path}>
    {children}
  </MenuItem>
);
