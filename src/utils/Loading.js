import React from 'react';
import Translate from '../utils/Translate';
import CircularProgress from 'material-ui/lib/circular-progress';

export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <CircularProgress indeterminite size={0.5} />
            <Translate>Loading...</Translate>
        </div>
    );
}