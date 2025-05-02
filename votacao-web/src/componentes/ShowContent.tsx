import React from 'react';

interface ShowContentProps {
    children?: React.ReactNode
    show?: boolean
}


export const ShowContent = ({show = false, children}: ShowContentProps): React.JSX.Element => {
    return (
        <>
            {show ? (
                <>
                    {children}
                </>
            ) : null
            }
        </>
    );
};
