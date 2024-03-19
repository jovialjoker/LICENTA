import { Flex, Box, Text } from '@chakra-ui/react'
import * as React from 'react'

type Props = {
    value: number
    thumbIndex: number
    thumbProps: any
    bgColor: string
}

const RangeItem = ({
                   value,
                   bgColor,
                   thumbProps,
               }: Props) => {
    return (
        <Box
            top='1%'
            boxSize={8}
            bgColor={bgColor}
            borderRadius='full'
            _focusVisible={{
                outline: 'none',
            }}
            {...thumbProps}
        >
            <Flex
                w='100%'
                h='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Text color='white'>{value}</Text>
            </Flex>
        </Box>
    )
}
export default RangeItem
