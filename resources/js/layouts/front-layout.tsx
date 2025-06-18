import FrontLayoutTemplate from "./frontend/front-layout-template";

export default function FrontLayout({ children, ...props }: { children: React.ReactNode }) {
    return (
        <FrontLayoutTemplate  {...props}>
            {children}
        </FrontLayoutTemplate>
    );
}
