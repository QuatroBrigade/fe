import {
  Button,
  Container,
  Overlay,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import Layout from "components/Layout/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import Typewriter from "typewriter-effect";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://unsplash.com/photos/GXdKvKZkNKA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8a29zaWNlfGVufDB8fHx8MTY4MDM5NjE4MA&force=true)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  },

  container: {
    height: rem(700),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout title="Domov" withHeader={false}>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>
            Townsy <span style={{ color: "#66D9E8" }}>Košice</span>{" "}
            <>
              <Typewriter
                options={{
                  strings: [
                    "Západ!",
                    "Dargovských hrdinov!",
                    "Staré mesto!",
                    "Ťahanovce!",
                    "Sídlisko KVP!",
                    "Nad jazerom!",
                    "Barca!",
                    "Džungľa!",
                    "Juh!",
                    "Kavečany!",
                    "Košická Nová Ves!",
                    "Krásna!",
                    "Lorinčík!",
                    "Luník IX!",
                    "Myslava!",
                    "Pereš!",
                    "Poľov!",
                    "Šaca!",
                    "Šebastovce!",
                    "Sever!",
                    "Sídlisko Ťahanovce!",
                    "Vyšné Opátske!",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 70,
                }}
              />
            </>
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Everything you need for your community and yourself in the city!
          </Text>

          <Link href="/community/1" passHref>
            <Button
              component="a"
              variant="gradient"
              size="xl"
              radius="xl"
              className={classes.control}
            >
              Join city!
            </Button>
          </Link>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
