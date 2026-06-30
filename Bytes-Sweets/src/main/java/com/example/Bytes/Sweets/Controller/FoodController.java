package com.example.Bytes.Sweets.Controller;

import com.example.Bytes.Sweets.food.FoodRepository;
import com.example.Bytes.Sweets.food.FoodResponseDTO;
import com.example.Bytes.Sweets.food.FoodRequestDTO;

import com.example.Bytes.Sweets.food.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood
    (@RequestBody FoodRequestDTO data){

        Food foodData = new Food(data);
        repository.save(foodData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll(){

        List<FoodResponseDTO> foodlist = repository.findAll()
        .stream().map(FoodResponseDTO::new).toList();
        return foodlist;
    }
}
