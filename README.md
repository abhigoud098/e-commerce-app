## 📸 Screenshots

![Landingpage](landingpage.png)

```Shopverce — E-commerce Frontend (Polished README)

⚠️ Note:
Some features are still not working perfectly, and a few parts are under active development.
I’m continuou

Shopverce is a modern, responsive e-commerce frontend where users can browse products, add them to cart, check discounts and stock availability, manage a wishlist, and complete a simulated checkout — all built without a backend (uses localStorage for persistence).

🚀 Project overview
Shopverce is an interactive e-commerce platform focused on a clean shopping experience and realistic UI behavior. It shows product listings, lets users like/save items, add/remove items from a cart, view totals (including discounts), and complete checkout with address selection and a simulated UPI/payment flow.

The app supports:
Dark and light theme toggle
Fully responsive layout with a mobile hamburger navigation
Authentication flow (signup / login / logout) using browser localStorage (no backend)
Wishlist (liked items) page where you can add to cart or remove items
Dynamic homepage that highlights trending/best-selling products
Address management and payment UI for checkout
Realistic UI/UX details and page-specific screens (screenshot section planned)

✨ Key features 
Product Browsing — View product cards with price, discount, rating, and stock status.
Cart with Totals — Add items, change quantities, see subtotal, total discount, and final amount.
Wishlist / Likes — Save products to a separate list; from there you can add to cart or delete.
Auth (Frontend) — Signup and login stored in localStorage; user profile icon shows details filled during signup.
Theme Toggle — Light and dark modes with persisted preference.
Responsive Navigation — Desktop nav and mobile hamburger menu for easy navigation.
Checkout Flow — Select shipping address, enter payment details or use a simulated UPI option.
Local Persistence — Products, user data, cart, wishlist, and theme stored in localStorage for offline-like behavior.
In-progress polishing — Working on more realistic UI animations, better address flow, and richer product pages.

🗂️ Pages / Screens 
Home — Dynamic product feed, featured/trending items, search and filters.
Product Details — Detailed view with images, description, discount breakdown, and add-to-cart.
Cart — Shows items, quantity controls, per-item discounts, overall totals, and checkout button.
Wishlist — Liked items list with quick actions (add to cart / remove).
Auth / Profile — Signup/login pages; after login you can open the profile menu to see the details you entered.
Checkout — Address selection, add or choose saved address, payment details, and UPI mock flow.
Responsive Nav — Hamburger menu for small screens; full nav for larger viewports.

🛠️ Tech stack 
Frontend: React.js 
Styling: plain CSS (responsive-first)
State & Storage: local component state + localStorage for persistence
Animations: GSAP or CSS transitions for polished micro-interactions
API: Api integation for products shows dynamicaly.

📁 Project structure
src/components/ — Reusable UI components (Navbar, ProductCard, CartItem, etc.)
src/pages/ — Page-level components (Home, Product, Cart, Wishlist, Checkout, Auth)
src/context/ or src/store/ — Global state (cart, auth, theme)
public/assets/ — Images and icons
README.md, LICENSE, screenshots/ — Docs, license, and visual assets

♻️ Data & calculations
Subtotal: sum of (item price × quantity) for all cart items.
Item discount: derived from product discount percentage; show both original price (crossed out) and discounted price.
Total discount: sum of discounts applied to each item.
Final total: subtotal − total discount + any taxes/shipping (if applicable).
Stock checks: prevent adding beyond available stock; show “Out of stock” on product cards

📈 Planned improvements / roadmap
Add backend & database (Node/Express + MongoDB or Firebase) to persist users, orders, and products.
Integrate real authentication (JWT/OAuth) and secure payment gateway integration.
Add AI product recommendations (personalized suggestions on the homepage).
Improve product pages with image gallery / zoom, and reviews.
Add order history, admin panel, and search filters (price ranges, categories).
Polish UI with animations and accessibility tweaks (aria labels, keyboard nav).

📝 Notes & disclaimers
Current authentication and payments are simulated for development/demo purposes — no real user credentials or money are processed.```
localStorage is used so the app behaves like a single-user demo; migrating to a backend will be part of future work.



