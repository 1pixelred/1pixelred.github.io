import {
  Container,
  Stepper,
  Button,
  createStyles,
  Grid,
  Notification,
  Box,
  Center,
} from "@mantine/core";
import { useState, useEffect } from "react";
import {
  IconUserCheck,
  IconCircleCheck,
  IconCheck,
  IconBrandChrome,
  IconBrandEdge,
  IconBrandOpera,
  IconPhotoCheck,
  IconBrowserCheck,
} from "@tabler/icons-react";
import * as fcl from "@onflow/fcl";
import "../flow/config.js";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.teal[6]
        : theme.colors.teal[0],
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.teal[2] : theme.colors.teal[3]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.teal[6],
      theme.colors.blue[6]
    ),
  },

  stepIcon: {
    ref: getRef("stepIcon"),
    borderColor: "transparent",
    color: theme.colorScheme === "dark" ? theme.colors.teal[3] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.teal[9] : theme.white,
    borderWidth: 0,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.teal[6],
        theme.colors.blue[6]
      ),
    },
  },

  step: {
    transition: "transform 150ms ease",

    "&[data-progress]": {
      transform: "scale(1.05)",
    },
  },
}));

export default function Webmaster() {
  const [active, setActive] = useState(0);

  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => {
    if (user && user.loggedIn) {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [user]);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const contract = "Pixel";

  const createPortfolio = async () => {
    await fcl.mutate({
      cadence: `
          import ${contract} from 0xPixel
          transaction() {
            prepare(account: AuthAccount) {
              let portfolio <- ${contract}.createEmptyPortfolio()
              account.save<@${contract}.Portfolio>(<-portfolio, to: ${contract}.PortfolioStoragePath)
              account.link<&{${contract}.IPortfolio}>(${contract}.PortfolioPublicPath, target: ${contract}.PortfolioStoragePath)
            }
          }
        `,
    });
    setActive(2);
  };

  const { classes } = useStyles();

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        maxWidth: "100%",
        margin: 0,
        padding: 100,
        backgroundColor: "#130335",
        color: "#fff",
      }}
    >
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <Center m={20} style={{ fontSize: "100px", marginBottom: "-40px" }}>
          🏄🏽‍♂️
        </Center>
      </Link>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
        color="red"
        sx={{
          background: "#04063e",
          padding: 40,
          borderRadius: 20,
          boxShadow: "0px 0px 40px blue",
        }}
        classNames={classes}
      >
        <Stepper.Step
          label="Connect"
          description="Connect to your account"
          icon={<IconUserCheck size={18} />}
          completedIcon={<IconCircleCheck />}
          color="teal"
        >
          <Box mt={30}>
            {user.loggedIn ? (
              <Button
                onClick={fcl.unauthenticate}
                variant="light"
                color="teal"
                size="xl"
                fullWidth
              >
                Disconnect {user?.addr}
              </Button>
            ) : (
              <Button
                onClick={fcl.logIn}
                variant="light"
                color="teal"
                size="xl"
                fullWidth
              >
                Connect
              </Button>
            )}
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="NFT Portfolio"
          description="Create an NFT Portfolio"
          icon={<IconPhotoCheck size={18} />}
          completedIcon={<IconCircleCheck />}
          color="teal"
        >
          <Box mt={30}>
            <Button
              onClick={createPortfolio}
              variant="light"
              color="teal"
              size="xl"
              fullWidth
            >
              Create Portfolio
            </Button>
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="Browser add-on"
          description="Install browser extension"
          icon={<IconBrowserCheck size={18} />}
          completedIcon={<IconCircleCheck />}
          color="teal"
        >
          <Box mt={30}>
            <Grid>
              <Grid.Col span={4}>
                <Button
                  component="a"
                  href="https://chrome.google.com/webstore/detail/1pixelred-where-is-it/kfelakbhpbfehjnfdlbccdkiejnfohnl"
                  target="_blank"
                  variant="light"
                  color="teal"
                  size="xl"
                  fullWidth
                  leftIcon={<IconBrandChrome />}
                  onClick={() => {
                    setTimeout(() => {
                      setActive(3);
                    }, 1000);
                  }}
                >
                  Chrome
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  component="a"
                  href="https://chrome.google.com/webstore/detail/1pixelred-where-is-it/kfelakbhpbfehjnfdlbccdkiejnfohnl"
                  target="_blank"
                  variant="light"
                  color="teal"
                  size="xl"
                  fullWidth
                  leftIcon={<IconBrandOpera />}
                  onClick={() => {
                    setTimeout(() => {
                      setActive(3);
                    }, 1000);
                  }}
                >
                  Opera
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  component="a"
                  href="https://chrome.google.com/webstore/detail/1pixelred-where-is-it/kfelakbhpbfehjnfdlbccdkiejnfohnl"
                  target="_blank"
                  variant="light"
                  color="teal"
                  size="xl"
                  fullWidth
                  leftIcon={<IconBrandEdge />}
                  onClick={() => {
                    setTimeout(() => {
                      setActive(3);
                    }, 1000);
                  }}
                >
                  Edge
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Stepper.Step>
        <Stepper.Completed>
          <Box mt={30}>
            <Notification
              color="teal"
              title="Surfing is starting"
              disallowClose
              sx={{ backgroundColor: "#130335", border: 0, color: "white" }}
              icon={<IconCheck size={20} />}
            >
              The hunt for the red pixel is declared open. If you see a red
              pixel on any website, click on it and get the NFT of the website
              where the pixel was found.
            </Notification>
          </Box>
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
}
