import React from "react"
import clsx from "clsx";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  makeStyles,
  withStyles
} from "@material-ui/core";

// Icons
import { HowToReg, AllInbox, VerifiedUser } from "@material-ui/icons";

const stepStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  stepper: {
    padding: "0px",
    backgroundColor: "transparent",
  },
}));

function VerticalLinearStepper(props) {
  const classes = stepStyles();
  const { index } = props;
  const steps = [0, 1, 2];

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={index}
        orientation="vertical"
        classes={{ root: classes.stepper }}
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const CustomStepConnector = withStyles({
  alternativeLabel: {
    left: 30,
  },
  active: {
    "& $line": {
      backgroundColor: "#c2c2c2ed",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#071354d4",
    },
  },
  line: {
    height: 3,
    border: 0,
    width: 3,
    backgroundColor: "#a5a5a66e",
    borderRadius: 1,
    position: "relative",
    left: 10,
  },
  vertical: {
    padding: 0,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "#a69f9f73",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40414a",
    marginLeft: 3,
  },
  active: {
    backgroundColor: "#202f817a",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    color: "#dad0d0",
    width: 47,
    height: 47,
    marginLeft: 0,
  },
  completed: {
    backgroundColor: "#071354d4",
    color: "white",
    height: 55,
    width: 55,
    marginLeft: -2,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <HowToReg />,
    2: <AllInbox />,
    3: <VerifiedUser />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default VerticalLinearStepper;
