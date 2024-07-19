'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primaryDark: "#1B3DB3",
        primaryPrimary: "#3663FF",
        primaryLight: "#D0EBFF",
        secondaryDark: "#CC800E",
        secondarySecondary: "#FF9900",
        secondaryLight: "#FAC06A",
        black: "#000000",
        gray: {
            800: "#333333",
            600: "#666666",
            400: "#999999",
            200: "#CCCCCC",
            100: "#E5E5E5",
            50: "#F2F2F2",
        },
        white: "#FFFFFF",
        success: "#34C759",
        errorError: "#BF0D3E",
        errorAlert: "#FF9900",
    },
})

export function Providers({ children }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}