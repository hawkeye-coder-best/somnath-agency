import { ShieldCheck, UserCheck, Truck, PhoneCall } from "lucide-react";

const features = [
    {
        name: "Trusted Local Store",
        description: "Serving the community for over 30 years.",
        icon: UserCheck,
    },
    {
        name: "Genuine Products",
        description: "100% authentic products from top brands.",
        icon: ShieldCheck,
    },
    {
        name: "Wholesale Prices",
        description: "Best rates for bulk and retail purchases.",
        icon: Truck,
    },
    {
        name: "Instant Support",
        description: "Call or WhatsApp for quick quotes.",
        icon: PhoneCall,
    },
];

export function TrustBadges() {
    return (
        <section className="bg-primary py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col text-center sm:flex-row sm:text-left items-center sm:items-start text-white">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="mt-4 sm:ml-4 sm:mt-0">
                                <h3 className="text-lg font-bold">{feature.name}</h3>
                                <p className="mt-1 text-sm text-blue-100">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
