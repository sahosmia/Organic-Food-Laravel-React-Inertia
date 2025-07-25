import { AppContent } from '@/components/admin/app-content';
import { AppShell } from '@/components/admin/app-shell';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { AppSidebarHeader } from '@/components/admin/app-sidebar-header';
import Notification from '@/components/admin/Notification';
import { type BreadcrumbItem } from '@/types';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';





interface CustomPageProps {
    flash?: {
        success?: string;
        error?: string;
        info?: string;
    };

}

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash = {} } = usePage().props as CustomPageProps;
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info' | null>(null);

    useEffect(() => {
        setNotificationMessage(null);
        setNotificationType(null);
        if (flash.success) {
            setNotificationMessage(flash.success);
            setNotificationType('success');
        }

        else if (flash.error) {
            setNotificationMessage(flash.error);
            setNotificationType('error');
        }
        else if (flash.info) {
            setNotificationMessage(flash.info);
            setNotificationType('info');
        }


    }, [flash]);

    const handleCloseNotification = () => {
        setNotificationMessage(null);
        setNotificationType(null);
    };
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div>

                    {children}
                </div>

                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={handleCloseNotification}
                    duration={4000}
                />
            </AppContent>
        </AppShell>
    );
}
