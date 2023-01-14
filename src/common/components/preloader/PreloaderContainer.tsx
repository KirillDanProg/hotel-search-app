import React, { FC } from "react";

type PropsType = {
    condition: boolean
    loader: React.ReactElement
    children: React.ReactNode
}
export const PreloaderContainer: FC<PropsType> = ({ loader, children, condition }) => {
    return (
        <div>
            {
                condition ? loader : children
            }
        </div>
    );
};

