import { CategoryType } from "@/types";
import { Link } from "@inertiajs/react";

function Category({ categories }: { categories: CategoryType[] }) {
    // console.log("Categories:", categories);


    return (
        <section className="bg-whitethree py-28 px-5">
            <div className="flex flex-col items-center md:flex-row gap-5 md:gap-8 ">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group overflow-hidden flex-1 relative"
                    >
                        <img
                            className="group-hover:scale-110 transition-all duration-700 inline-block w-full"
                            src={category.image_url}
                            alt={category.title}
                        />
                        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
                            <Link href="/" className="text-main font-bold inline-block bg-light px-7 py-5 rounded">
                                {category.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Category;
