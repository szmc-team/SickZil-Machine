import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    uploadButton: {
      marginLeft: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Topbar = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const fileCallback = (files: any) => {
    enqueueSnackbar(`Uploaded... : ${files.target.files[0].name}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SZMC</Typography>
          <IconButton
            className={classes.uploadButton}
            color="inherit"
            aria-label="upload"
            component="label"
          >
            <PublishIcon />
            <input
              multiple={true}
              style={{ display: "none" }}
              type="file"
              name="imageFile"
              onChange={fileCallback}
            />
          </IconButton>
          <IconButton color="inherit">
            <InsertDriveFileOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <FileCopyOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
