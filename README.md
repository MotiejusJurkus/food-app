# AI-Powered Frontend Hackathon

## The Challenge

You have **1 hour**. You have an API. You have AI tools at your disposal.

**Build something that helps people understand what they're eating.**

## Requirements

1. Use any frontend framework (or none), as long as it works
2. Use AI coding tools — that's the point
3. Work solo
4. Clone this repo, share a link for demo **(localhost does not count!)**
5. Submit a MR at the end
6. Have fun!

## API

**Base URL:** `Will be provided at the start of the session in front-end_squad slack channel`

Before proceeding, perform a quick test:
```zsh
curl {baseUrl}/api/ping
```
you should get "pong" as a response. if not, reach out!

**Nutrition analysis Endpoint:** `POST /api/nutrition/analyze/`

Example:
```zsh
curl -X POST http://localhost:8000/api/nutrition/analyze/ -F "image=@/path/to/food.png"
```

Accepts a `multipart/form-data` request with an `image` field (JPEG or PNG) and returns the following:


**Example input image:**

![Teriyaki Chicken Bowl](/media/teryaki.jpg)

**Response:**

```json
{
  "id": 1,
  "status": "completed",
  "dish_name": "Teriyaki Chicken Bowl",
  "dish_name_translated": "Teriyaki vištienos dubenėlis",
  "dish_description": "Glazed chicken pieces served over steamed white rice with steamed broccoli, garnished with sesame seeds and spring onions.",
  "dish_description_translated": "Glazūruoti vištienos gabalėliai su garintais ryžiais ir brokoliais, papuošti sezamo sėklomis ir žaliaisiais svogūnų laiškais.",
  "nutri_score": "C",
  "serving_size": 440,
  "unit": "g",
  "consumed_at": "2026-04-22T10:30:00Z",
  "created_at": "2026-04-22T10:30:01Z",
  "image_url": "/media/uploads/teriyaki_bowl.jpg",
  "image_id": 1,
  "nutritional_fields": {
    "energy_kcal": 603,
    "carbohydrate_g": 72.5,
    "protein_g": 51.8,
    "fat_total_g": 7.8,
    "fat_saturated_g": 2.1,
    "fat_polyunsaturated_g": 1.8,
    "fat_monounsaturated_g": 2.5,
    "fat_trans_g": 0,
    "fiber_total_dietary_g": 3.0,
    "sugars_total_g": 14.5,
    "sodium_mg": 848,
    "potassium_mg": 765,
    "magnesium_mg": 84,
    "vitamin_c_mg": 72,
    "vitamin_e_mg": 1.7,
    "vitamin_k_mcg": 88,
    "folate_mcg": 70
  },
  "ingredients": [
    {
      "id": 1,
      "name": "Teriyaki-glazed chicken breast",
      "name_translated": "Teriyaki glazūra padengta vištienos krūtinėlė",
      "serving_size": 180,
      "unit": "g",
      "nutritional_fields": {
        "energy_kcal": 340,
        "carbohydrate_g": 16,
        "protein_g": 45,
        "fat_total_g": 7,
        "fat_saturated_g": 2,
        "fat_polyunsaturated_g": 1.5,
        "fat_monounsaturated_g": 2.4,
        "fat_trans_g": 0,
        "fiber_total_dietary_g": 0.2,
        "sugars_total_g": 13,
        "sodium_mg": 820,
        "potassium_mg": 450,
        "magnesium_mg": 45,
        "vitamin_c_mg": 0,
        "vitamin_e_mg": 0.5,
        "vitamin_k_mcg": 3,
        "folate_mcg": 10
      }
    },
    {
      "id": 2,
      "name": "Steamed white rice",
      "name_translated": "Garinti baltieji ryžiai",
      "serving_size": 180,
      "unit": "g",
      "nutritional_fields": {
        "energy_kcal": 235,
        "carbohydrate_g": 51,
        "protein_g": 4.5,
        "fat_total_g": 0.5,
        "fat_saturated_g": 0.1,
        "fat_polyunsaturated_g": 0.2,
        "fat_monounsaturated_g": 0.1,
        "fat_trans_g": 0,
        "fiber_total_dietary_g": 0.7,
        "sugars_total_g": 0.1,
        "sodium_mg": 2,
        "potassium_mg": 65,
        "magnesium_mg": 22,
        "vitamin_c_mg": 0,
        "vitamin_e_mg": 0,
        "vitamin_k_mcg": 0,
        "folate_mcg": 5
      }
    },
    {
      "id": 3,
      "name": "Steamed broccoli",
      "name_translated": "Garinti brokoliai",
      "serving_size": 80,
      "unit": "g",
      "nutritional_fields": {
        "energy_kcal": 28,
        "carbohydrate_g": 5.5,
        "protein_g": 2.3,
        "fat_total_g": 0.3,
        "fat_saturated_g": 0,
        "fat_polyunsaturated_g": 0.1,
        "fat_monounsaturated_g": 0,
        "fat_trans_g": 0,
        "fiber_total_dietary_g": 2.1,
        "sugars_total_g": 1.4,
        "sodium_mg": 26,
        "potassium_mg": 250,
        "magnesium_mg": 17,
        "vitamin_c_mg": 72,
        "vitamin_e_mg": 1.2,
        "vitamin_k_mcg": 85,
        "folate_mcg": 55
      }
    }
  ]
}
```