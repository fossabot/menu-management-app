import React from 'react';
import Paper from 'material-ui/Paper/Paper';
import withStateFrom from '../utils/withStateFrom';
import Loading from '../utils/Loading';
import MenuItemSorterComponent from './MenuItemSorter';
import { menuItemOrder$ } from './store';

const styles = {
    menuManagementPaper: {
        padding: '2rem',
        margin: '1rem',
        display: 'flex',
    },
};

const MenuItemSorter = withStateFrom(menuItemOrder$, MenuItemSorterComponent, Loading);

export default function MenuManagement() {
    return (
        <Paper style={styles.menuManagementPaper}>
            <MenuItemSorter />
        </Paper>
    );
}
