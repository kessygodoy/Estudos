export const metadata = {
    title: "Dashboard",
    description: "Dashboard",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h3>Layout do dashboard</h3>
            {children}
        </div>
    )
}