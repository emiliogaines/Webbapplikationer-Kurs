import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default class FormDialog extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    openDialog: false,
    dialogName: "",
    dialogEmail: "",
  };

  render() {
    return this.FormDialog();
  }

  FormDialog() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#ff6600",
        },
        secondary: {
          main: "#ff6600",
        },
      },
    });

    const handleClickOpen = () => {
      this.setState({ openDialog: true, dialogName: "", dialogEmail: "" });
    };

    const handleClose = () => {
      this.setState({ openDialog: false });
    };

    const handleCloseDialog = () => {
      this.setState({ openSnackbar: false });
    };

    const handleCloseAndSave = () => {
      this.setState({ openDialog: false, openSnackbar: true });
      this.props.sendApplication(
        this.state.dialogName,
        this.state.dialogEmail,
        this.props.courseId
      );
    };

    const setTextValueName = (event) => {
      this.setState({ dialogName: event.target.value });
    };

    const setTextValueEmail = (event) => {
      this.setState({ dialogEmail: event.target.value });
    };

    return (
      <div>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={handleClickOpen}
        >
          ANSÖK
        </button>
        <ThemeProvider theme={theme}>
          <Dialog
            open={this.state.openDialog}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Ansök</DialogTitle>
            <DialogContent>
              <DialogContentText>
                För att kunna ansöka till detta seminarium ber vi dig att ange
                ditt namn och e-post nedan.
                <br />
                <br />
                Vi tar inget ansvar om användaren skulle fatta eld, explodera
                eller skada sig på andra sätt genom att använda denna tjänst.
              </DialogContentText>
              <TextField
                onChange={setTextValueName}
                margin="dense"
                id="name"
                label="För- och efternamn"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                onChange={setTextValueEmail}
                margin="dense"
                id="email"
                label="E-post"
                type="email"
                variant="outlined"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Avbryt
              </Button>
              <Button onClick={handleCloseAndSave} color="primary">
                Ansök
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}
