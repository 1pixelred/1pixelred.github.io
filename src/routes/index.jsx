import { Grid, Center } from "@mantine/core";

import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Grid style={{ padding: 0, margin: 0, position: "relative" }}>
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "100px",
          fontSize: "35px",
        }}
      >
        <span style={{ color: "white" }}>L</span>.
        <span style={{ color: "tomato" }}>RED</span>
      </div>
      <div
        style={{
          position: "fixed",
          right: "50%",
          top: "100px",
          fontSize: "35px",
        }}
      >
        <span style={{ color: "tomato" }}>1</span>
        <span style={{ color: "white" }}>PIXE</span>
      </div>
      <Grid.Col span={6} style={{ padding: 0, margin: 0 }}>
        <Link to={`/webmaster`} style={{ textDecoration: "none" }}>
          <Center
            sx={{
              width: "100%",
              height: "100vh",
              margin: 0,
              padding: 0,
              fontSize: "35px",
              backgroundColor: "#3e0427",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#350321",
              },
            }}
          >
            <Grid style={{ padding: 0, margin: 0 }}>
              <Grid.Col span={12} style={{ padding: 0, margin: 0 }}>
                <Center style={{ fontSize: "100px" }}>👩🏽‍💻</Center>
              </Grid.Col>
              <Grid.Col span={12} style={{ padding: 0, margin: 0 }}>
                <Center style={{ fontSize: "50px" }}>I'm WebMaster</Center>
              </Grid.Col>
            </Grid>
          </Center>
        </Link>
      </Grid.Col>
      <Grid.Col span={6} style={{ padding: 0, margin: 0 }}>
        <Link to={`/websurfer`} style={{ textDecoration: "none" }}>
          <Center
            sx={{
              width: "100%",
              height: "100vh",
              margin: 0,
              padding: 0,
              fontSize: "35px",
              backgroundColor: "#130335",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#120331",
              },
            }}
          >
            <Grid style={{ padding: 0, margin: 0 }}>
              <Grid.Col span={12} style={{ padding: 0, margin: 0 }}>
                <Center style={{ fontSize: "100px" }}>🏄🏽‍♂️</Center>
              </Grid.Col>
              <Grid.Col span={12} style={{ padding: 0, margin: 0 }}>
                <Center style={{ fontSize: "50px" }}>I'm WebSurfer</Center>
              </Grid.Col>
            </Grid>
          </Center>
        </Link>
      </Grid.Col>
    </Grid>
  );
}
