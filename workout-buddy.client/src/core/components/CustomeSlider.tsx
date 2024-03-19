import { Box, chakra, useRangeSlider } from '@chakra-ui/react'
import RangeItem from './RangeItem'

type Props = {
    min: number
    max: number
    stepToNumber: number
    stepToIndex: number
    stepByNumber: number
    defaultValue: [number, number]
    'aria-label': [string, string]
}

export default function CustomeSlider({
                                min,
                                max,
                                stepToNumber,
                                stepToIndex,
                                stepByNumber,
                                defaultValue,
                                ...rest
                            }: Props) {
    const {
        state,
        getInnerTrackProps,
        getInputProps,
        getRootProps,
        getTrackProps,
        getThumbProps
    } = useRangeSlider({ min, max, defaultValue, ...rest })

    const { onKeyDown: onThumbKeyDownFirstIndex, ...thumbPropsFirstIndex } =
        getThumbProps({
            index: 0,
        })

    const { onKeyDown: onThumbKeyDownSecondIndex, ...thumbPropsSecondIndex } =
        getThumbProps({
            index: 1,
        })
    return (
        <Box
            px={4}
            pt='5%'
        >
            <chakra.div
                mt={2}
                cursor='pointer'
                w={{ base: '96%', lg: '98%' }}
                ml={{ base: '2%', lg: '1%' }}
                {...getRootProps()}
            >
                <input
                    {...getInputProps({ index: 0 })}
                    hidden
                />
                <input
                    {...getInputProps({ index: 1 })}
                    hidden
                />
                <Box
                    h='7px'
                    bgColor='teal.100'
                    borderRadius='full'
                    {...getTrackProps()}
                >
                    <Box
                        h='7px'
                        bgColor='teal.500'
                        borderRadius='full'
                        {...getInnerTrackProps()}
                    />
                </Box>
                <RangeItem
                    value={state.value[0]/10}
                    thumbIndex={0}
                    thumbProps={thumbPropsFirstIndex}
                    bgColor='teal.500'
                />
                <RangeItem
                    value={state.value[1]/10}
                    thumbIndex={1}
                    thumbProps={thumbPropsSecondIndex}
                    bgColor='teal.500'
                />
            </chakra.div>
        </Box>
    )
}