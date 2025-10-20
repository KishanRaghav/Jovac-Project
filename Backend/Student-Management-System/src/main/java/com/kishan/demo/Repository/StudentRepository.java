package com.kishan.demo.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.kishan.demo.Entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Search by name, course, or city
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.city) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Student> searchStudents(@Param("keyword") String keyword, Pageable pageable);
    
    // Find students by course
    Page<Student> findByCourseContainingIgnoreCase(String course, Pageable pageable);
    
    // Find students by city
    Page<Student> findByCityContainingIgnoreCase(String city, Pageable pageable);
    
    // Find students created by specific user
    Page<Student> findByCreatedBy(String createdBy, Pageable pageable);
    
    // Find students by marks range
    Page<Student> findByMarksBetween(Integer minMarks, Integer maxMarks, Pageable pageable);
    
    // Check if email exists
    boolean existsByEmail(String email);
}
