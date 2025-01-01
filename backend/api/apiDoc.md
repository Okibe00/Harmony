# Proposed endpoints
### **1. Manufacturer Endpoints**
Manage data related to drug manufacturers.

| **Method** | **Endpoint**             | **Description**                          |
|------------|--------------------------|------------------------------------------|
| `GET`     | `/api/manufacturers`      | Retrieve all manufacturers               |
| `GET`     | `/api/manufacturers/:id`  | Retrieve a specific manufacturer by ID   |
| `POST`    | `/api/manufacturers`      | Add a new manufacturer                   |
| `PUT`     | `/api/manufacturers/:id`  | Update an existing manufacturer          |
| `DELETE`  | `/api/manufacturers/:id`  | Delete a manufacturer                    |

---


### **2. Brand Endpoints**
Manage drug brand records.

| **Method** | **Endpoint**             | **Description**                          |
|------------|--------------------------|------------------------------------------|
| `GET`     | `/api/brands`             | Retrieve all drug brands                 |
| `GET`     | `/api/brands/:id`         | Retrieve a specific brand by ID          |
| `POST`    | `/api/brands`             | Add a new drug brand                     |
| `PUT`     | `/api/brands/:id`         | Update an existing drug brand            |
| `DELETE`  | `/api/brands/:id`         | Delete a drug brand                      |
| `GET`     | `/api/brands/search`      | Search brands by name or manufacturer    |

---

### **3. Code Endpoints**
Manage product c odes assigned to drugs.

| **Method** | **Endpoint**             | **Description**                          |
|------------|--------------------------|------------------------------------------|
| `GET`     | `/api/codes`              | Retrieve all product codes               |
| `GET`     | `/api/codes/:id`          | Retrieve a specific product code by ID   |
| `POST`    | `/api/codes`              | Add a new product code                   |
| `PUT`     | `/api/codes/:id`          | Update an existing product code          |
| `DELETE`  | `/api/codes/:id`          | Delete a product code                    |
| `GET`     | `/api/codes/search`       | Search codes (e.g., by brand, code type) |

---

### **4. Combined/Extended Endpoints**
Endpoints that link data between **manufacturers**, **brands**, and **codes**.

| **Method** | **Endpoint**                           | **Description**                                  |
|------------|----------------------------------------|------------------------------------------------|
| `GET`     | `/api/manufacturers/:id/brands`        | Get all brands for a specific manufacturer     |
| `GET`     | `/api/brands/:id/codes`                | Get all product codes for a specific brand     |
| `GET`     | `/api/manufacturers/:id/codes`         | Get all product codes by a specific manufacturer |
| `GET`     | `/api/codes?manufacturer=:id`          | Filter product codes by manufacturer ID        |
| `GET`     | `/api/codes?brand=:id`                 | Filter product codes by brand ID               |

---

### **5. Analytics/Reports Endpoints**
Endpoints for insights or summarized data.

| **Method** | **Endpoint**                           | **Description**                                |
|------------|----------------------------------------|-----------------------------------------------|
| `GET`     | `/api/reports/manufacturers/count`     | Count of manufacturers                        |
| `GET`     | `/api/reports/brands/count`            | Count of brands                               |
| `GET`     | `/api/reports/codes/count`             | Count of product codes                        |
| `GET`     | `/api/reports/top-manufacturers`       | Manufacturers with the most brands or codes   |
| `GET`     | `/api/reports/top-brands`              | Brands with the most product codes            |

---

### **6. Search/Filter Endpoints**
Flexible query endpoints for searching.

| **Method** | **Endpoint**                           | **Description**                                |
|------------|----------------------------------------|-----------------------------------------------|
| `GET`     | `/api/search`                          | Search across manufacturers, brands, and codes |
| `GET`     | `/api/search?query=<term>`             | Search by keyword or partial string            |
| `GET`     | `/api/codes/filter?type=<type>`        | Filter codes by specific type/category         |

---

### Additional Notes:
- Use query parameters for **searching** and **filtering** (e.g., `/api/brands/search?name=aspirin`).
- Include proper **status codes** and error handling (e.g., `404` for not found, `400` for bad requests, `500` for server errors).
- **Pagination** can be added for large datasets using query params (e.g., `/api/brands?page=2&limit=20`).