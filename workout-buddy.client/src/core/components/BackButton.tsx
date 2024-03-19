import {Link, Text} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

const BackButton = (props: any) => {
    const navigate = useNavigate();

    return (
        <Link as={"a"} {...props} onClick={() => navigate(-1)} display="flex" alignItems="center" mt={6}>
            <ArrowBackIcon /><Text>Back</Text>
        </Link>
    )
}

export default BackButton;