<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // what type will the field be in the database for the additional_information field and another_product_description field?
      // The `additional_information` and `another_product_description` fields will be of type `text` in the database. This allows for storing longer strings of text, which is suitable for detailed descriptions and additional information about the products.
      // ok you will help me in migration file
        $product = [
            [
                'name' => 'Calabrese Brocoli',
                'slug' => 'calabrese-brocoli',
                'description' => 'Latest model smartphone with advanced features.',
                'price' => 699.99,
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'category_id' => 1,
                'image' => 'one.png',
                'is_active' => true,
                
                'additional_information' => [
                    'Rich in fiber',
                    'Low in calories',
                    'Contains sulforaphane, a compound with potential anti-cancer properties',
                    'Versatile in cooking, can be used in various dishes'
                ],
                
            ],
           
            [
                'name' => 'Organic Carrots',
                'slug' => 'organic-carrots',
                'description' => 'Fresh organic carrots from local farms.',
                'price' => 2.50,
                'discount_type' => 'fixed',
                'discount_value' => 0.50,
                'category_id' => 1,
                'image' => 'two.png',
                'is_active' => true,
                'another_product_description' => 'Organic carrots are a healthy and delicious root vegetable that is rich in beta-carotene, fiber, and antioxidants. They are known for their vibrant orange color and sweet flavor. Organic farming practices ensure that these carrots are grown without synthetic pesticides or fertilizers, making them a great choice for health-conscious consumers.',
                'additional_information' => [
                    'High in vitamin A',
                    'Good for eye health',
                    'Crunchy and sweet',
                    'Can be eaten raw, cooked, or juiced'
                ],

            ],
            [
                'name' => 'Fresh Spinach',
                'slug' => 'fresh-spinach',
                'description' => 'Nutritious spinach packed with vitamins.',
                'price' => 3.00,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'three.png',
                'is_active' => true,
                'another_product_description' => 'Fresh spinach is a leafy green vegetable that is loaded with nutrients. It is an excellent source of vitamins A, C, and K, as well as iron and calcium. Spinach can be enjoyed raw in salads, sautéed as a side dish, or blended into smoothies for an extra nutritional boost.',
                'additional_information' => [
                    'High in antioxidants',
                    'Supports bone health',
                    'Versatile in cooking',
                    'Can be used in salads, soups, and smoothies']  
            ],
            [
                'name' => 'Cherry Tomatoes',
                'slug' => 'cherry-tomatoes',
                'description' => 'Sweet and juicy cherry tomatoes.',
                'price' => 4.00,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'four.png',
                'is_active' => true,
                'another_product_description' => 'Cherry tomatoes are small, round, and bursting with flavor. They are a great source of vitamins C and K, as well as antioxidants. These tomatoes are perfect for snacking, adding to salads, or roasting for a delicious side dish.',
                'additional_information' => [
                    'Low in calories',
                    'Rich in lycopene, an antioxidant',
                    'Great for snacking',
                    'Can be used in salads, pasta dishes, or as a garnish']
            ],
            [                'name' => 'Organic Bell Peppers',
                'slug' => 'organic-bell-peppers',
                'description' => 'Colorful and crunchy organic bell peppers.',
                'price' => 3.50,
                'discount_type' => 'percentage',
                'discount_value' => 5.00,
                'category_id' => 1,
                'image' => 'five.png',
                'is_active' => true,
                'another_product_description' => 'Organic bell peppers are vibrant, crunchy vegetables that come in various colors, including red, yellow, and green. They are rich in vitamins A and C, as well as antioxidants. These peppers can be enjoyed raw in salads, roasted, or stuffed for a delicious and healthy meal.',
                'additional_information' => [
                    'High in vitamin C',
                    'Contains capsaicin, which may have health benefits',
                    'Versatile in cooking',
                    'Can be used in salads, stir-fries, or as a snack']
            ],
            [                'name' => 'Zucchini',
                'slug' => 'zucchini',
                'description' => 'Fresh zucchini perfect for grilling.',
                'price' => 2.00,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'six.png',
                'is_active' => true,
                'another_product_description' => 'Zucchini is a versatile summer squash that is low in calories and high in nutrients. It is an excellent source of vitamins A and C, as well as potassium. Zucchini can be enjoyed grilled, sautéed, or spiralized into noodles for a healthy pasta alternative.',
                'additional_information' => [
                    'Low in calories',
                    'High in water content',
                    'Good source of fiber',
                    'Can be used in a variety of dishes, including salads, stir-fries, and soups']
                ],
            [                'name' => 'Eggplant',
                'slug' => 'eggplant',
                'description' => 'Tender and flavorful eggplant for grilling.',
                'price' => 3.00,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'seven.png',
                'is_active' => true,
                'another_product_description' => 'Eggplant, also known as aubergine, is a versatile vegetable that is rich in fiber and antioxidants. It has a unique texture and can be used in a variety of dishes, including stir-fries, casseroles, and grilled dishes. Eggplant can be enjoyed roasted, grilled, or sautéed for a delicious and healthy meal.',
                'additional_information' => [
                    'Rich in antioxidants',
                    'Good source of fiber',
                    'Can be used in a variety of dishes',
                    'Can be grilled, roasted, or sautéed']
            ],
            [                'name' => 'Cucumbers',
                'slug' => 'cucumbers',
                'description' => 'Crisp cucumbers perfect for salads.',
                'price' => 1.50,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'eight.png',
                'is_active' => true,
                'another_product_description' => 'Cucumbers are refreshing and hydrating vegetables that are low in calories. They are an excellent source of vitamins K and C, as well as potassium. Cucumbers can be enjoyed raw in salads, pickled, or blended into smoothies for a refreshing drink.',
                'additional_information' => [
                    'High in water content',
                    'Low in calories',
                    'Good source of vitamins K and C',
                    'Can be eaten raw, pickled, or blended into smoothies']
            ],
            [                'name' => 'Radishes',
                'slug' => 'radishes',
                'description' => 'Spicy and crunchy radishes for salads.',
                'price' => 2.00,
                'discount_type' => null,
                'discount_value' => null,
                'category_id' => 1,
                'image' => 'nine.png',
                'is_active' => true,
                'another_product_description' => 'Radishes are crunchy root vegetables that add a spicy kick to salads and dishes. They are low in calories and high in vitamin C. Radishes can be enjoyed raw in salads, pickled, or roasted for a unique flavor.',
                'additional_information' => [
                    'Low in calories',
                    'High in vitamin C',
                    'Adds a spicy kick to dishes',
                    'Can be eaten raw, pickled, or roasted']
            ],




        ];


        foreach ($product as $item) {
            Product::create([
                'name' => $item['name'],
                'slug' => $item['slug'],
                'description' => $item['description'],
                'price' => $item['price'],
                'discount_type' => $item['discount_type'],
                'discount_value' => $item['discount_value'],
                'category_id' => $item['category_id'],
                'image' => $item['image'],
                'is_active' => $item['is_active'],
                'additional_information' => json_encode($item['additional_information']),
                'another_product_description' => $item['another_product_description'] ?? null,
            ]);
        }




    }
}
