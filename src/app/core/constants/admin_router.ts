import {constant} from "./constant";

export const admin_router = {
    parentMenu: [
        {
            keyDefine: constant.menuKey.MANAGEMENT,
            title: 'Quản lý',
            icon: '/assets/images/ic-menu/ic-config.svg',
            visible: true,
            key: 'management',
            path: '',
            activeLinks: [
                '/management/employee',
                '/management/department',
                '/management/position',
                '/management/work-profile',
                '/management/notification',
                '/management/vehicle',
                '/management/meeting-room',
                '/management/meeting-schedule'
            ],
            showBody: true,
        },
        {
            keyDefine: constant.menuKey.ASSET,
            title: 'Quản lý Tài sản',
            icon: '/assets/images/ic-menu/ic-assets-mgm.svg',
            visible: true,
            key: 'asset-management',
            path: '',
            activeLinks: [
                '/asset-management/asset',
            ],
            showBody: true,
        },
        {
            keyDefine: constant.menuKey.CONFIG_PROFILE,
            title: 'Cấu hình hồ sơ nhân sự',
            icon: '/assets/images/ic-menu/ic-id-card.svg',
            visible: true,
            key: 'config',
            path: '/home/management/config',
            activeLinks: ['/management/config'],
        },
        {
            keyDefine: constant.menuKey.CONFIG_PAYROLL,
            title: 'Cấu hình phiếu lương',
            icon: '/assets/images/ic-menu/ic-payslip-config.svg',
            visible: true,
            key: 'config',
            path: '/home/management/payroll/list',
            activeLinks: ['/management/payroll/list'],
        },
        {
            keyDefine: constant.menuKey.MANAGEMENT_PAYROLL,
            title: 'Phiếu lương',
            icon: '/assets/images/ic-menu/ic-payslip.svg',
            visible: true,
            key: 'configpayroll',
            path: '/home/management/payrolltable',
            activeLinks: ['/management/payrolltable'],
        },
        {
            keyDefine: constant.menuKey.OFFICE,
            title: 'Văn phòng',
            icon: '/assets/images/ic-menu/ic-office-mgm.svg',
            visible: true,
            key: 'office',
            path: '',
            activeLinks: [
                '/office/point',
                '/office/approval',
                '/office/document',
            ],
            showBody: true,
        },
        {
            keyDefine: constant.menuKey.SYSTEM_MANAGEMENT,
            title: 'Quản lý Admin',
            icon: '/assets/images/ic-menu/ic-admin-mgm.svg',
            visible: true,
            key: 'super-admin',
            path: '',
            activeLinks: [
                '/admin/permission',
            ],
            showBody: true,
        },
        {
            keyDefine: constant.menuKey.REPORT,
            title: 'Báo cáo',
            icon: '/assets/images/ic-menu/ic-report.svg',
            visible: true,
            key: 'report-admin',
            path: '',
            activeLinks: [
                '/report/',
            ],
            showBody: true,
        },
    ],
    menuPaths: [
        {
            code: constant.menuKey.MANAGEMENT_STAFF,
            path: '/home/management/employee',
        },
        {
            code: constant.menuKey.MANAGEMENT_DEPARTMENT,
            path: '/home/management/department',
        },
        {
            code: constant.menuKey.MANAGEMENT_TITLE,
            path: '/home/management/position',
        },
        {
            code: constant.menuKey.MANAGEMENT_MEETINGROOM,
            path: '/home/management/meeting-room',
        },
        {
            code: constant.menuKey.MANAGEMENT_CAR,
            path: '/home/management/vehicle',
        },
        {
            code: constant.menuKey.MANAGEMENT_WORKPROFILE,
            path: '/home/management/work-profile',
        },
        {
            code: constant.menuKey.MANAGEMENT_PAYROLL,
            path: '/home/management/payrolltable',
        },
        {
            code: constant.menuKey.MANAGEMENT_REPORT,
            path: '/home/management/report',
        },
        {
            code: constant.menuKey.MANAGEMENT_NOTIFICATION,
            path: '/home/management/notification',
        },
        {
            code: constant.menuKey.ASSET_ASSET,
            path: '/home/asset-management/asset',
        },
        {
            code: constant.menuKey.CONFIG_PROFILE,
            path: '/home/management/config',
        },
        {
            code: constant.menuKey.OFFICE_CHECKIN,
            path: '/home/office/point',
        },
        {
            code: constant.menuKey.OFFICE_APPROVAL,
            path: '/home/office/approval',
        },
        {
            code: constant.menuKey.OFFICE_DOCUMENT,
            path: '/home/office/document',
        },
        {
            code: constant.menuKey.SYSTEM_MANAGEMENT_ACCOUNT,
            path: '/home/admin/system-user',
        },
        {
            code: constant.menuKey.SYSTEM_MANAGEMENT_PERMISSION,
            path: '/home/admin/permission',
        },
        {
            code: constant.menuKey.REPORT_EMPLOYEE,
            path: '/home/report/employee-report',
        },
        {
            code: constant.menuKey.MANAGEMENT_MEETINGSCHEDULE,
            path: '/home/management/meeting-schedule',
        },
    ]
}
