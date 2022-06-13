import { IconReportMoney, IconTicket } from '@tabler/icons';

const icons = { IconReportMoney, IconTicket };

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
        },
        {
            id: 'my_ticket',
            title: 'Ticket hỗ trợ',
            type: 'item',
            url: `/my_ticket`,
            icon: icons.IconTicket,
            breadcrumbs: false
        }
    ]
};

export default features;
