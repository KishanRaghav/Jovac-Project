package com.kishan.demo.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	@Column(nullable = false)
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Email should be valid")
	@Column(nullable = false, unique = true)
	private String email;

	@NotBlank(message = "Course is required")
	@Column(nullable = false)
	private String course;

	@Min(value = 0, message = "Marks cannot be negative")
	@Max(value = 100, message = "Marks cannot exceed 100")
	@Column(nullable = false)
	private Integer marks;

	@NotBlank(message = "City is required")
	@Column(nullable = false)
	private String city;

	@Pattern(regexp = "^$|^[0-9]{10}$", message = "Phone number must be 10 digits or empty")
	@Column(name = "phone_number", length = 10)
	private String phoneNumber;

	@Column(name = "created_by")
	private String createdBy;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
}
