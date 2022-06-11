import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const dashboard = {
    id: 'dashboard',
    title: 'Admin',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Admin',
            type: 'collapse',
            url: '/admin',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            children: [
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/admin/users',
                    // target: true
                },
                {
                    id: 'products',
                    title: 'Products',
                    type: 'item',
                    url: '/admin/products',
                    // target: true
                },
                {
                    id: 'variants',
                    title: 'Variants',
                    type: 'item',
                    url: '/admin/variants',
                    // target: true
                }
            ]
        }
    ]
};

export default dashboard;
