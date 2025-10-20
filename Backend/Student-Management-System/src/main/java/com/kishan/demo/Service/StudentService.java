package com.kishan.demo.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.kishan.demo.Entity.Student;

public interface StudentService {
    Student createStudent(Student student);
    Student updateStudent(Long id, Student student);
    Student getStudentById(Long id);
    void deleteStudent(Long id);
    Page<Student> getAllStudents(Pageable pageable);
    Page<Student> searchStudents(String keyword, Pageable pageable);
    Page<Student> getStudentsByCourse(String course, Pageable pageable);
    Page<Student> getStudentsByCity(String city, Pageable pageable);
    Page<Student> getStudentsByMarksRange(Integer minMarks, Integer maxMarks, Pageable pageable);
}
