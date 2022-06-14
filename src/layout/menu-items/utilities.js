import { IconShoppingCart, IconBuildingFactory, IconPaperBag } from '@tabler/icons';

const icons = {
    IconBuildingFactory,
    IconShoppingCart,
    IconPaperBag
};

const utilities = {
    id: 'utilities',
    title: 'Sản phẩm',
    type: 'group',
    children: [
        {
            id: 'products',
            title: 'Mua tài khoản',
            type: 'collapse',
            url: '/products',
            icon: icons.IconShoppingCart,
            breadcrumbs: false,
            children: [
                {
                    id: 'bm',
                    title: 'BM',
                    type: 'item',
                    url: '/products/bm',
                    // target: true
                },
                {
                    id: 'via_xmdn',
                    title: 'Via XMDT + 902',
                    type: 'item',
                    url: '/products/via_xmdn',
                    // target: true
                },
                {
                    id: 'via_normal',
                    title: 'Via Thường Live ADS!',
                    type: 'item',
                    url: '/products/via_normal',
                    // target: true
                },
                {
                    id: 'via_limit_50',
                    title: 'Via Limit $50 + $250',
                    type: 'item',
                    url: '/products/via_limit_50',
                    // target: true
                },
                {
                    id: 'clone',
                    title: 'Clone các loại',
                    type: 'item',
                    url: '/products/clone',
                    // target: true
                }
            ]
        },
        {
            id: 'tuts',
            title: 'TUT hay',
            type: 'collapse',
            url: `/tuts`,
            icon: icons.IconPaperBag,
            breadcrumbs: false,
            children: [
                {
                    id: '2fa',
                    title: 'Lấy mã 2FA',
                    type: 'item',
                    url: '/tuts/2fa',
                    // target: true
                },
            ]
        }
    ]
};

export default utilities;
