package com.example.Bytes.Sweets.food;

public record FoodResponseDTO (Long id, String title, String image, Double price) {
    
    public FoodResponseDTO(Food food){
        this(food.getId(), 
        food.getTitle(), 
        food.getImage(), 
        food.getPrice());
    }
}
