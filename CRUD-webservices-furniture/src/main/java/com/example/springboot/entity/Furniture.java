package com.example.springboot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "furnitures")
public class Furniture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@Size(min = 5, message = "Furniture name should have at least 5 characters")
	@Column(name = "furniture_name")
	private String name;
	
	@NotNull
	@Range(min=0, max=100000)
	@Column(name = "furniture_price")
	private double price;
	
	@NotNull
	@Size(min = 10, message = "Furniture description should have at least 10 characters")
	@Column(name = "furniture_desc")
	private String description;
	
	@NotNull
	@Column(name = "furniture_image")
	private String image;
	
	@NotNull
	@Range(min=0, max=100)
	@Column(name = "furniture_inventory")
	private int inventory;
	
	@NotNull
	@Column(name = "furniture_status")
	private boolean status;
	
	public Furniture() {};
	
	public Furniture(String name, double price, String description, String image, int inventory, boolean status) {
		super();
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.inventory = inventory;
		this.status = status;
	};

	public long getId() {
		return id;
	};

	public void setId(long id) {
		this.id = id;
	};

	public String getName() {
		return name;
	};

	public void setName(String name) {
		this.name = name;
	};

	public double getPrice() {
		return price;
	};

	public void setPrice(double price) {
		this.price = price;
	};

	public String getDescription() {
		return description;
	};

	public void setDescription(String description) {
		this.description = description;
	};

	public String getImage() {
		return image;
	};

	public void setImage(String image) {
		this.image = image;
	};

	public int getInventory() {
		return inventory;
	};

	public void setInventory(int inventory) {
		this.inventory = inventory;
	};

	public boolean isStatus() {
		return status;
	};

	public void setStatus(boolean status) {
		this.status = status;
	};

}
