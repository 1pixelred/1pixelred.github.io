import {
  Container,
  Stepper,
  Button,
  createStyles,
  Input,
  Tooltip,
  Grid,
  Notification,
  Box,
  Center,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import {
  IconUserCheck,
  IconCircleCheck,
  IconWorldWww,
  IconPlant,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";
import * as fcl from "@onflow/fcl";
import { SHA3 } from "sha3";
import { Buffer } from "buffer";
import "../flow/config.js";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.red[6] : theme.colors.red[0],
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.red[2] : theme.colors.red[3]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.red[6],
      theme.colors.pink[6]
    ),
  },

  stepIcon: {
    ref: getRef("stepIcon"),
    borderColor: "transparent",
    color: theme.colorScheme === "dark" ? theme.colors.red[3] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.red[9] : theme.white,
    borderWidth: 0,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.red[6],
        theme.colors.pink[6]
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
  const [domain, setDomain] = useState("");
  const [domainCheck, setDomainCheck] = useState(false);

  const domainInput = useRef(null);
  useEffect(() => {
    if (domainInput && domainInput.current) domainInput.current.focus();
  }, [domain]);

  useEffect(() => {
    if (user && user.loggedIn) {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [user]);

  const hash = new SHA3(256);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const newBuffer = (input, encoding) => {
    try {
      return Buffer.from(input, encoding);
    } catch (error) {
      return new Buffer(input, encoding);
    }
  };

  const contract = "Pixel";

  const getDomains = async () => {
    setDomainCheck(true);

    const domains = await fcl.query({
      cadence: `
        import ${contract} from 0xPixel
        pub fun main(): [String] {
          return ${contract}.getDomains()
        }
      `,
    });

    const exists =
      domain &&
      domains &&
      domains.indexOf(
        hash.reset().update(newBuffer(domain, "utf8")).digest("hex")
      ) + 1;

    if (exists) {
      setActive(2);
      setTimeout(() => {
        setActive(3);
        setDomainCheck(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setDomainCheck(false);
      }, 1000);
    }

    return exists;
  };

  const addDomain = async () => {
    const exists = await getDomains();

    if (exists) return;

    await fcl.mutate({
      cadence: `
            import ${contract} from 0xPixel
            transaction(hexDomain: String) {
              prepare(account: AuthAccount) {
                ${contract}.addDomain(hexDomain)
              }
            }
          `,
      args: (arg, t) => [
        arg(
          hash.reset().update(newBuffer(domain, "utf8")).digest("hex"),
          t.String
        ),
      ],
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
        backgroundColor: "#3e0427",
        color: "#fff",
      }}
    >
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <Center m={20} style={{ fontSize: "100px", marginBottom: "-30px" }}>
          👩🏽‍💻
        </Center>
      </Link>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
        color="red"
        sx={{
          background: "#3e0434",
          padding: 40,
          borderRadius: 20,
          boxShadow: "0px 0px 40px red",
        }}
        classNames={classes}
      >
        <Stepper.Step
          label="Connect"
          description="Connect to your account"
          icon={<IconUserCheck size={18} />}
          completedIcon={<IconCircleCheck />}
          color="red"
        >
          <Box mt={30}>
            {user.loggedIn ? (
              <Button
                onClick={fcl.unauthenticate}
                variant="light"
                color="red"
                size="xl"
                fullWidth
              >
                Disconnect {user?.addr}
              </Button>
            ) : (
              <Button
                onClick={fcl.logIn}
                variant="light"
                color="red"
                size="xl"
                fullWidth
              >
                Connect
              </Button>
            )}
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="Add website"
          description="Add your website domain"
          icon={<IconWorldWww size={18} />}
          completedIcon={<IconCircleCheck />}
          color="red"
        >
          <Box mt={30}>
            <Grid>
              <Grid.Col span="auto">
                <Input
                  size="xl"
                  ref={domainInput}
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.currentTarget.value);
                  }}
                  icon={<IconWorldWww size={16} style={{ color: "red" }} />}
                  placeholder="Your domain"
                  rightSection={
                    <Tooltip
                      label="Your domain as it looks in the address bar."
                      position="top-end"
                      withArrow
                    >
                      <div>
                        <IconAlertCircle
                          size={18}
                          style={{
                            display: "block",
                            opacity: 0.5,
                            color: "red",
                          }}
                        />
                      </div>
                    </Tooltip>
                  }
                  styles={(theme) => ({
                    input: {
                      color: theme.colors.red[2],
                      borderColor: theme.colors.red,
                      backgroundColor: "#5e0b35",
                      "&:focus-within": {
                        borderColor: theme.colors.red[7],
                      },
                      "&::placeholder": {
                        color: theme.colors.red[2],
                      },
                    },
                  })}
                />
              </Grid.Col>
              <Grid.Col span="content">
                <Button
                  onClick={addDomain}
                  variant="light"
                  color="red"
                  size="xl"
                  loading={domainCheck}
                  loaderPosition="center"
                >
                  Add Domain
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="Success"
          description="Result of addition"
          icon={<IconPlant size={18} />}
          completedIcon={<IconCircleCheck />}
          color="red"
        >
          <Box mt={30}>
            <Button
              onClick={getDomains}
              variant="light"
              color="red"
              size="xl"
              fullWidth
              loading={domainCheck}
              loaderPosition="center"
            >
              Check additions
            </Button>
          </Box>
        </Stepper.Step>
        <Stepper.Completed>
          <Box mt={30}>
            <Notification
              color="red"
              title="Domain added"
              disallowClose
              sx={{ backgroundColor: "#3e0426", border: 0, color: "white" }}
              icon={<IconCheck size={20} />}
            >
              The domain of your website has been successfully added to the Flow
              network. Now any user who detects a red pixel on the site page
              will get NFT.
            </Notification>
          </Box>
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
}
