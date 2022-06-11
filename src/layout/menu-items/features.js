import { IconReportMoney } from '@tabler/icons';

const icons = { IconReportMoney };

const features = {
    id: 'features',
    title: 'Tính năng',
    type: 'group',
    children: [
        {
            id: 'load_money',
            title: 'Nạp tiền',
            type: 'item',
            url: `/load_money`,
            icon: icons.IconReportMoney,
            breadcrumbs: false
        }
    ]
};

export default features;
