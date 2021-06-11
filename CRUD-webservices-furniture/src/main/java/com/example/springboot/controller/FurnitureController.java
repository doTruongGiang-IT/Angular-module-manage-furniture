package com.example.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springboot.entity.Furniture;
import com.example.springboot.exception.ResourceNotFoundException;
import com.example.springboot.repository.FurnitureRepository;

@RestController
@RequestMapping("/api/v1/")
public class FurnitureController {
	
	@Autowired
	FurnitureRepository furnitureRepository;
	
	// Get all furniture
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("furnitures")
	public List<Furniture> getAllFurniture() {
		return this.furnitureRepository.findAll();
	}
	
	// Get furniture by id
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("furnitures/{id}")
	public ResponseEntity<Furniture> getFurnitureById(@PathVariable(value = "id") long furnitureId) {
		Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new ResourceNotFoundException("Furniture list not found"));
		return ResponseEntity.ok().body(furniture);
	};
	
	// Create new furniture
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("furnitures")
	public Furniture createFurniture(@Valid @RequestBody Furniture furniture) {
		return furnitureRepository.save(furniture);
	};
	
	// Update furniture by id
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("furnitures/{id}")
	public ResponseEntity<Furniture> updateFurniture(@PathVariable(value = "id") long furnitureId, @Valid @RequestBody Furniture updateFurniture) {
		Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new ResourceNotFoundException("Furniture not found"));
		furniture.setName(updateFurniture.getName());
		furniture.setPrice(updateFurniture.getPrice());
		furniture.setDescription(updateFurniture.getDescription());
		furniture.setImage(updateFurniture.getImage());
		furniture.setInventory(updateFurniture.getInventory());
		furniture.setStatus(updateFurniture.isStatus());
		Furniture editFurniture = furnitureRepository.save(furniture);
		return ResponseEntity.ok().body(editFurniture);
	};
	
	// Delete furniture by id
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("furnitures/{id}")
	public Map<String, Boolean> deleteFurniture(@PathVariable(value = "id") long furnitureId) {
		Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new ResourceNotFoundException("Furniture not found"));
		this.furnitureRepository.delete(furniture);
		Map<String, Boolean> respone = new HashMap<>();
		respone.put("deleted: ", Boolean.TRUE);
		return respone;
	};

}
