# Oladiplenty Stylist Consult

A UK-based fashion brand website built with Django, featuring ready-to-wear collections, bespoke tailoring services, fashion education, and business consulting.

## Features

- **Shop Collections**: Browse and purchase ready-to-wear fashion items
- **Bespoke Orders**: Custom made-to-order garments with fabric upload functionality
- **Fashion Academy**: Women's Fashion Masterclass and Business Management Programme
- **Digital Resources**: Downloadable business and sustainability guides
- **Consulting Services**: Fashion business management and consulting
- **About Page**: Brand story, mission, values, and founder information
- **Contact Page**: Contact form with FAQ section

## Tech Stack

- **Backend**: Django 4.x
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (default)

## Project Structure

```
oladiplenty/
├── accounts/          # User authentication
├── config/            # Django project settings
├── consulting/        # Consulting services
├── core/              # Main app (views, URLs)
├── orders/            # Order management
├── products/          # Product catalog
├── static/            # Static files (CSS, JS, images)
├── templates/         # HTML templates
├── assets/            # Image assets
└── manage.py          # Django management script
```

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oladiplenty
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

8. Open your browser and navigate to `http://127.0.0.1:8000`

## Available Pages

- `/` - Home page
- `/shop-collections/` - Shop collections
- `/bespoke/` - Custom orders (made-to-order)
- `/masterclass/` - Fashion consulting & academy
- `/about/` - About us
- `/contact/` - Contact page with FAQ
- `/corporate-wear/` - Corporate wear collection
- `/all-season/` - All season collection
- `/african-prints/` - African prints collection
- `/abaya-collection/` - Abaya collection
- `/reusable-bags/` - Reusable bags collection
- `/product/<product_id>/` - Product detail page

## Static Files

- CSS files are located in `static/css/`
- JavaScript files are located in `static/js/`
- Images are located in `assets/` and `static/images/`

## Custom Apps

- **accounts**: User authentication and profile management
- **consulting**: Consulting services and digital resources
- **core**: Main views and URL routing
- **orders**: Order processing and management
- **products**: Product catalog and inventory

## Contact Information

- **Email**: oladiplentystylist@gmail.com
- **WhatsApp**: +44 7450 207203
- **Location**: UK-based studio

## License

© 2026 Oladiplenty Stylist Consult. All rights reserved.
