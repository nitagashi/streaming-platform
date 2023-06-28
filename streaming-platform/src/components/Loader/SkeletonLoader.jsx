import { Skeleton } from '@mui/material';
import React from 'react'

function SkeletonLoader(props) {
    const getSkeletons = () => {
        var skeletons = [];
        for (var i = 0; i < props.number; i++) {
            skeletons.push(<Skeleton variant="rounded" width={props.width} height={props.height} />);
        }
        return skeletons;
    }
    return (
        <>
            {getSkeletons()}
        </>
    );
}

export default SkeletonLoader;