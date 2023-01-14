import React, {FC} from 'react';
import Box from "@mui/material/Box";

type PropsType = {
    message: string
}
export const EmptyListMessage: FC<PropsType> = ({message}) => {
    return (
        <Box component={"span"} sx={{color: "#00000080"}}>{message}</Box>
    );
};
