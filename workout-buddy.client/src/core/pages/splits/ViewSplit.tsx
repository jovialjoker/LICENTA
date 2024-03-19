import {
    Box,
    Container,
    Stack,
    Text,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    ListIcon,
    Textarea,
    Grid,
    GridItem,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";
import {getURLID} from "../../../utils/URLUtils";
import {ArrowRightIcon} from "@chakra-ui/icons";
import Comments from "../comments/Comments";
import AuthHeader from "../../../utils/authorizationHeaders";
import useColors from "./colors";
import BackButton from "../../components/BackButton";

interface ISplit {
    workouts: {
        workoutName: string;
        exercisesList: string[];
    }[];
    comments: [];
    splitId: number;
    name: string;
    creatorName: string;
    description: string;
}

const ViewSplit = () => {
    const colors = useColors();
    const [split, setSplit] = useState<ISplit>({
        workouts: [],
        comments: [],
        splitId: -1,
        name: "",
        creatorName: "",
        description: "",
    });
    const [commentText, setCommentText] = useState("");
    const [isNewComment, setIsNewComment] = useState(false);

    useEffect(() => {
        const id = getURLID(window.location.href);
        const getSplit = async (id: string) => {
            const {data} = await axios({
                method: "get",
                url: `http://localhost:8082/Split/viewSplit?id=${id}`,
                headers: {
                    Authorization: AuthHeader(),
                },
            });
            setSplit(data);
        };

        if (id) {
            getSplit(id);
        }
    }, [isNewComment]);

    const addHandler = async (text: string, parentCommentId = null) => {
        let newComment = {
            commentText: text,
            parentCommentId,
            parentSplitId: split.splitId,
        };

        await axios({
            method: "post",
            url: `http://localhost:8082/Comment/add`,
            data: newComment,
            headers: {
                Authorization: AuthHeader(),
            },
        });
        setIsNewComment((state) => !state);
        setCommentText("");
    };

    return (
        <Container maxW="7xl">
            <BackButton/>
            <Grid templateColumns={"repeat(5, 1fr)"} py="3rem" gap={8}>
                <GridItem colSpan={3}>
                    <Box as={"header"}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{base: "2xl", sm: "4xl", lg: "5xl"}}
                        >
                            {split.name}
                        </Heading>
                        <Text
                            fontWeight={600}
                            color={"gray.500"}
                            size="sm"
                            mb={4}
                        >
                            @{split.creatorName}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{base: 4, sm: 6}}
                        direction={"column"}

                    >
                            <Text
                                color={colors.descriptionSplitText}
                                fontSize={"2xl"}
                                fontWeight={"300"}
                                textAlign="left"
                            >
                                {split.description}
                            </Text>
                        {split.workouts.length > 0 && <Accordion defaultIndex={[0]} allowMultiple>
                        {split.workouts.map((workout, index) => {
                            return (
                                <AccordionItem key={index}>
                                    <AccordionButton display="flex" alignItems="center" justifyContent="space-between" color={colors.workoutName}>
                                        <Text
                                            fontSize={{base: "16px", lg: "18px"}}
                                            fontWeight={"500"}
                                            textTransform={"uppercase"}
                                            mb={"4"}
                                        >
                                            {workout.workoutName}

                                        </Text>
                                        <AccordionIcon />


                                    </AccordionButton>
                                    <AccordionPanel>

                                        <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                                            {workout.exercisesList.map((ex) => {
                                                return (
                                                    <List>
                                                        <ListItem>
                                                            <ListIcon as={ArrowRightIcon} color="green.500"/>
                                                            {ex}
                                                        </ListItem>
                                                    </List>
                                                );
                                            })}
                                        </SimpleGrid>
                                    </AccordionPanel>
                                </AccordionItem>
                            );
                        })}
                        </Accordion> }
                    </Stack>
                </GridItem>

                <GridItem colSpan={2} p={5} bg="lightPallette.background.200" >


                    <Heading color={"black"}>Comments</Heading>
                    <Stack
                        spacing="6"
                        borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        fontFamily="Outfit"
                        bg={"white"}
                        color="black"
                    >
                        <Heading size="md">Do you have any question?</Heading>
                        <Stack direction="row">
                            <Textarea
                                _placeholder={{ color: "black" }}
                                border={"1px solid"}
                                borderColor={"gray.200"}
                                placeholder="say something nice"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Flex alignItems="center" justifyItems="center">
                                <Button
                                    w="full"
                                    colorScheme={colors.accentScheme}
                                    variant="outline"
                                    onClick={() => addHandler(commentText)}
                                >
                                    Add comment
                                </Button>
                            </Flex>
                        </Stack>
                    </Stack>

                    <Comments comments={split.comments} addHandler={addHandler}/>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default ViewSplit;
