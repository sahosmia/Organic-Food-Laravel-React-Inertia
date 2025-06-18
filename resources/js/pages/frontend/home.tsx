
import { Head } from "@inertiajs/react";
import Hero from "@/components/frontend/Hero";
import Offer from "@/components/frontend/Offer";
import About from "@/components/frontend/About";
import Product from "@/components/frontend/Product";
import Category from "@/components/frontend/Category";
import News from "@/components/frontend/News";
import FrontLayout from "@/layouts/front-layout";
import { CategoryType, ProductType } from "@/types";

function Home({ products, categories }: { products: ProductType[], categories: CategoryType[] }) {
    console.log("Products in Home:", products);


    return (
        <>
            <FrontLayout>

                <Head title="Home">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                </Head>
                <Hero />
                <Offer />
                <About />
                <Product products={products} />
                <Category categories={categories} />
                <News />
            </FrontLayout>
        </>
    );
}

export default Home;
