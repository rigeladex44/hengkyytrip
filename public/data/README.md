# Data Directory

This directory contains JSON files that store the initial data for the travel website.

## Files

- **packages.json**: Contains travel package data (destinations, tours)
- **fleet.json**: Contains vehicle fleet data (cars available for rent)
- **globalConfig.json**: Contains global configuration settings (menu visibility, etc.)

## How to Update Data

The admin dashboard (`admin.html`) allows you to manage data through a user interface. All changes are stored in browser localStorage for real-time updates.

### Exporting Data from Admin Dashboard

1. Open `admin.html` in your browser
2. Make any changes to packages, fleet, or settings
3. Click the **Export Data** buttons:
   - **Download Paket Wisata JSON** - exports packages data
   - **Download Armada JSON** - exports fleet data
   - **Download Konfigurasi Global** - exports global settings
4. Save the downloaded files to this `data/` directory
5. Commit and push the changes to GitHub

### Important Notes

- **Images**: If you upload images through the admin dashboard, they are stored as base64 in localStorage. When exporting, these are replaced with placeholder paths (`assets/placeholder.png`). You should:
  1. Save actual image files to the `assets/` directory
  2. Update the `image` paths in the JSON files to point to the correct image files
  
- **Data Structure**: 
  - Each package and fleet item should have a unique `id`
  - Required fields vary by data type (see existing entries for reference)
  - The `isVisible` property is managed dynamically and removed on export
  - Fleet `bookedDates` are temporary and removed on export

### Manual Editing

You can also manually edit these JSON files directly. Just ensure:
- Valid JSON syntax
- Unique IDs for each item
- All required fields are present
- Image paths point to existing files in the `assets/` directory

## Data Format Examples

### packages.json
```json
{
    "id": 1,
    "name": "Bali Paradise Trip",
    "image": "assets/bali.png",
    "price": 3500000,
    "duration": "4 Hari 3 Malam",
    "pax": "Min 2 Pax",
    "description": "Nikmati keindahan pura dan pantai Bali..."
}
```

### fleet.json
```json
{
    "id": 1,
    "name": "Toyota Avanza",
    "image": "assets/avanza.png",
    "images": ["assets/avanza.png"],
    "price": 400000,
    "duration": "1 Hari",
    "pax": "7 Seat",
    "description": "Mobil keluarga yang nyaman..."
}
```

### globalConfig.json
```json
{
    "showDestinations": true,
    "showFleet": true
}
```
