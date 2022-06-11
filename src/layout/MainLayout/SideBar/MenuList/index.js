import React from 'react'
import { Typography } from '@mui/material';

import NavGroup from './NavGroup';
import menuItems from '../../../menu-items';
import { useContext } from 'react';
import AppContext from '../../../../AppContext'

const MenuList = () => {
    const context = useContext(AppContext)
    const isAdmin = context.currentUser.admin
    let items = {...menuItems}
    if(!isAdmin){
        items.items = items.items.filter(i => i.id != 'dashboard')
    }

    const navItems = items.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
