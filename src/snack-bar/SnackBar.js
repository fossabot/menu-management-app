import React from 'react';
import SnackBar from 'material-ui/Snackbar/Snackbar';
import { snackBarMessage$ } from './store';
import withStateFrom from '../utils/withStateFrom';

function SnackBarContainer(props) {
    const snackBarProps = props;

    return (
        <SnackBar {...snackBarProps} />
    );
}

export default withStateFrom(snackBarMessage$, SnackBarContainer, () => (<span />));
