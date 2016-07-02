import React from 'react';
import SnackBar from 'material-ui/lib/snackbar';;
import { snackBarMessage$ } from './store';
import withStateFrom from '../utils/withStateFrom';

function SnackBarContainer(props) {
    const snackBarProps = props;

    return (
        <SnackBar {...snackBarProps}  />
    );
}

export default withStateFrom(snackBarMessage$, SnackBarContainer, () => (<span></span>));