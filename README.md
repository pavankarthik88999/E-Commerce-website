
# 🛒 Flask E-Commerce Storefront

A lightweight, fully responsive e-commerce web application built with a Python Flask backend and a modern HTML/CSS/JavaScript frontend. This project features a customer storefront, a real-time search engine, a dedicated shopping cart, and a secure Admin Dashboard for managing inventory and uploading product images.

## ✨ Key Features

* **Modern Storefront UI:** Clean, responsive product grid with standardized image rendering and hover effects.
* **Dynamic Search:** Backend-driven search functionality that filters products by name in real-time.
* **Shopping Cart System:** Persistent cart tracking allowing users to review their items and proceed to checkout.
* **Admin Dashboard:**
* Secure admin login portal.
* Add new products with automated local image file uploading (`multipart/form-data`).
* Remove out-of-stock or discontinued products.


* **JSON Database:** Lightweight local inventory management using `sample.json` (no heavy SQL setup required).
* **Cross-Device Testing Support:** Configured with relative API routing to seamlessly test on mobile devices over local Wi-Fi.

---

## 🛠️ Tech Stack

* **Backend:** Python, Flask, Werkzeug (for secure file handling)
* **Frontend:** HTML5, Vanilla JavaScript, CSS3
* **Database:** JSON (`sample.json`)
* **File Storage:** Local Directory (`static/uploads/`)

---

## 🚀 Setup & Installation

Follow these steps to run the project locally on your machine.

**1. Clone the repository**

```bash
git clone https://github.com/pavankarthik88999/E-Commerce-website.git
cd E-Commerce-website

```

**2. Install dependencies**
Ensure you have Python installed, then install Flask:

```bash
pip install Flask werkzeug

```

**3. Run the application**

```bash
python app.py

```

**4. View the App**

* **Desktop:** Open your browser and go to `[http://127.0.0.1:5000](http://127.0.0.1:5000)`
* **Mobile (Local Wi-Fi):** Find your IPv4 address (e.g., `192.168.x.x`) and go to `[http://192.168.](http://192.168.)x.x:5000` on your phone.

---

## 🧠 Challenges Faced & Overcome

Building this platform from scratch presented several unique engineering challenges, which were successfully resolved during development:

### 1. Handling File Uploads vs. JSON Data

* **The Challenge:** Initially, the Admin panel attempted to send uploaded image files inside a standard JSON payload via the `fetch` API. Because JSON is text-only, the binary image files were collapsing into empty objects, causing the Python backend to reject the request with `415 Unsupported Media Type` errors.
* **The Solution:** Refactored the frontend JavaScript to use the `FormData` object, allowing the browser to automatically set the `multipart/form-data` headers. On the backend, transitioned from `request.get_json()` to `request.form` and `request.files` to successfully capture and save the images locally using `secure_filename`.

### 2. UI Consistency with Unpredictable Image Sizes

* **The Challenge:** Product images uploaded by the admin (e.g., tall smartphones vs. wide laptops) were warping, stretching, or violently breaking the CSS grid layout, making the storefront look broken.
* **The Solution:** Implemented strict CSS constraints combined with `object-fit: contain` and standardized aspect ratios. This ensured that regardless of the uploaded image's original dimensions, it perfectly scaled inside the product card without cropping the item or distorting the layout.

### 3. Cross-Device Network Routing (Mobile Testing)

* **The Challenge:** The application worked perfectly on the host laptop, but when attempting to test the UI on a mobile phone, the storefront loaded as a blank screen and the Admin login failed.
* **The Solution:** Discovered that the JavaScript `fetch` requests were hardcoded to `[http://127.0.0.1:5000](http://127.0.0.1:5000)` (localhost). When the phone ran the script, it was searching for a server inside the phone itself. Refactored all API calls to use **relative URLs** (e.g., `fetch('/products')`), allowing the browser to automatically resolve the correct IP address across the Wi-Fi network.

### 4. Backend Search Logic Mismatches

* **The Challenge:** The search engine was initially checking if the user's text matched a product's internal `ID` number, making it impossible to search by the actual product name.
* **The Solution:** Restructured the Python inventory search algorithm to loop through the dictionary values, convert strings to lowercase, and use substring matching (`if search_text in product_name`). Then, updated the frontend JavaScript to loop through the resulting dictionary and dynamically render a new HTML card for every match found.

---

