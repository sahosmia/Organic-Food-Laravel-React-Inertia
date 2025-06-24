<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        // Cart
        $cartItems = [];
        $totalItems = 0;
        $totalAmount = 0;

        // --- Cart Logic: Only if user is authenticated ---
        if ($request->user()) {
            // Access the formatted cart items using the accessor
            // Laravel automatically converts snake_case accessor (get_formatted_cart_items_attribute)
            // to camelCase (formattedCartItems) when accessed as a property.
            $userFormattedCart = $request->user()->formatted_cart_items;

            foreach ($userFormattedCart as $item) {
                // Now $item already has 'price' and 'quantity' in the correct format
                $totalItems += $item['quantity'];
                $totalAmount += $item['quantity'] * $item['price'];
            }
            $cartItems = $userFormattedCart;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ]
                    : null,
            ],
            'ziggy' => fn(): array => [...(new Ziggy())->toArray(), 'location' => $request->url()],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'cart' => [
                'items' => $cartItems,
                'totalItems' => $totalItems,
                'totalAmount' => $totalAmount,
            ],
        ];
    }
}
