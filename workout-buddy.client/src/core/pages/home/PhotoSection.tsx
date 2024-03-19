import {Card, Image} from "@chakra-ui/react";
import InnerText from "../../components/InnerText";

const PhotoSection = () => {
    return (
        <Card position="relative">
            <Image
                width="100%"
                src="https://img.freepik.com/free-photo/incognito-man-building-biceps-with-barbell_7502-5120.jpg?size=626&ext=jpg&ga=GA1.1.782206126.1697618837&semt=sph"
            />
            <InnerText/>
        </Card>
    );
};

export default PhotoSection;
