import { IconShoppingCart, IconZoomMoney } from '@tabler/icons';

const icons = { IconShoppingCart, IconZoomMoney };

const history = {
    id: 'history',
    title: 'Lịch sử',
    type: 'group',
    children: [
        {
            id: 'buying',
            title: 'Tài khoản đã mua',
            type: 'item',
            url: `/history/buying`,
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'add_money',
            title: 'Lịch sử nạp tiền',
            type: 'item',
            url: `/history/add_money`,
            icon: icons.IconZoomMoney,
            breadcrumbs: false
        }
    ]
};

export default history;
